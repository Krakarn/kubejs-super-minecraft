import { ItemStack } from "../kubejs-typings/src/classes/item-stack";
import { filter, find, forEach, getGlobal, has, head, setGlobal } from "../util";
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

export const initializeTagItems = () => {
    const config = getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Iterate over tags (they should be loaded)
    const tagItems = new Map<string, string>();

    forEach(tags, tag => {
        const ingr = tryTag(tag);

        if (!ingr) return;

        const allStacks = ingr.getStacks();
        const stacks = filter(allStacks, x => !has(config.exclude, x.getId()));
        let foundStack: ItemStack | undefined;

        forEach(config.priorities, mod => {
            foundStack = find(stacks, stack => stack.getMod() === mod);
            if (foundStack) return true;
        });

        foundStack = foundStack || head(allStacks);

        if (!foundStack) return;

        tagItems.set(tag, foundStack.getId());
    });

    setTagItems(tagItems);
};