import { ItemStack } from "../kubejs-typings/src/classes/item-stack";
import { filter, find, forEach, getGlobal, has, head, setGlobal } from "../util";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";

export const getTagsFromConfig = (config: UnifyConfig): Iterable<string> => {
    console.log('getTagsFromConfig');
    const tags = new Set<string>();

    console.log('forEach config.includeTags');
    forEach(config.includeTags, tag => {
        tags.add(tag);
    });

    console.log('forEach config.tagGen');
    forEach(config.tagGen, (types, material) => {
        console.log('forEach types');
        forEach(types, type => {
            tags.add(`forge:${type}/${material}`)
        });
    });

    return Array.from(tags);
};

const GLOBAL_UNIFY_TAGITEMS = 'unify:tagitems';

export const setTagItems = (tagItems: Map<string, string>) => {
    setGlobal(GLOBAL_UNIFY_TAGITEMS, tagItems);
};

export const getTagItems = (): Map<string, string> => getGlobal(GLOBAL_UNIFY_TAGITEMS);

export const initializeTagItems = () => {
    console.log('initializeTagItems');
    const config = getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Iterate over tags (they should be loaded)
    const tagItems = new Map<string, string>();


    console.log('forEach tags');
    forEach(tags, tag => {
        const ingr = tryTag(tag);

        if (ingr) {
            const allStacks = ingr.getStacks();
            const stacks = filter(allStacks, x => !has(config.exclude, x.getId()));
            let foundStack: ItemStack | undefined;

            console.log('forEach config.priorities');
            forEach(config.priorities, mod => {
                foundStack = find(stacks, stack => stack.getMod() === mod);
                if (foundStack) return true;
            });

            foundStack = foundStack || head(allStacks);

            if (foundStack) {
                tagItems.set(tag, foundStack.getId());
            }
        }
    });

    setTagItems(tagItems);
};