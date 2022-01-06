import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { ItemStack } from "../kubejs-typings/src/classes/item-stack";
import { filter, find, forEach, getGlobal, has, head, map, setGlobal, size } from "../util";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";

const GLOBAL_UNIFY_TAGITEMS = 'unify:tagitems';

export const getTagsFromConfig = (config: UnifyConfig): Iterable<string> => {
    const tags = new Set<string>();

    forEach(config.includeTags, tag => {
        tags.add(tag);
    });

    forEach(config.tagGen, (types, material) => {
        forEach(types, type => {
            tags.add(`forge:${type}/${material}`)
        });
    });

    return Array.from(tags);
};

export const setTagItems = (tagItems: Map<string, string>) => {
    setGlobal(GLOBAL_UNIFY_TAGITEMS, tagItems);
};

export const getTagItems = (): Map<string, string> => getGlobal(GLOBAL_UNIFY_TAGITEMS);

const getTagType = (tag: string) =>
    tag.match(/:(\w+)/)?.[1]
;

const getTagMaterial = (tag: string) =>
    tag.match(/:\w+\/(\w+)/)?.[1]
;

type PreferredItemOptions = {
    material?: string;
};

const getPreferredItemString = (preferredItem: string, options: PreferredItemOptions) =>
    preferredItem
    .replace(/\%m/g, options.material ?? 'undefined')
;

const matchPreferredItem = (preferredItem: string, itemId: string, options: PreferredItemOptions) =>
    itemId.match(/:(\w+)/)![1] === getPreferredItemString(preferredItem, options)
;

export const initializeTagItems = () => {
    const config = getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Iterate over tags (they should be loaded)
    const tagItems = new Map<string, string>();

    console.log('building tag items');
    forEach(tags, tag => {
        console.log('processing tag ' + tag);

        const ingr = tryTag(tag);

        if (!ingr) return;

        const tagType = getTagType(tag) ?? '';
        const tagMaterial = getTagMaterial(tag);
        const allStacks = ingr.getStacks();
        const stacks = filter(allStacks, x => !has(config.exclude, x.getId()));
        let foundStack: ItemStack | undefined;

        console.log('[' + tagType + '/' + tagMaterial + ']: items ' + Array.from(map(stacks, x => x.getId())).join(', '));
        forEach(config.modPriorities, mod => {
            const matchingStacks = filter(stacks, stack => stack.getMod() === mod);
            if (size(matchingStacks) === 0) return;
            const preferredItem = config.preferredItems.get(tagType);
            if (preferredItem) foundStack = find(matchingStacks, stack => matchPreferredItem(preferredItem, stack.getId(), { material: tagMaterial }));
            else foundStack = head(matchingStacks);
            if (foundStack) return true;
        });

        foundStack = foundStack || head(allStacks);

        if (!foundStack) return;

        console.log('set to item ' + foundStack.getId());

        tagItems.set(tag, foundStack.getId());
    });

    console.log('tagItems');
    console.log(Array.from(tagItems).join(', '));

    setTagItems(tagItems);
};

export const convertToUnifiedItem = (item: ItemStack, tags: Iterable<string>): ItemStack | undefined => {
    const tagItems = getTagItems();
    const itemId = item.getId();
    let convertedItem: ItemStack | undefined;

    forEach(tags, tag => {
        const ingr = tryTag(tag);

        if (!ingr || !ingr.test(item)) return;

        // If item is in tag, determine if it needs to be changed
        const tItem = tagItems.get(tag);

        if (!tItem || tItem === itemId) return;

        convertedItem = Ingredient.of(tItem).getFirst().withCount(item.getCount());

        return true;
    });

    return convertedItem;
};