import { getGlobal, setGlobal } from "../util";

export type UnifyConfig = {
    flags: {
        // Whether or not to unify items in inventory
        INVENTORY_UNIFY: boolean;
        // Whether or not to unify items in world
        ITEM_UNIFY: boolean;
        // Whether or not to unify recipes
        RECIPE_UNIFY: boolean;
        // Whether or not to hide not-first materials in jei (requires secondary script)
        HIDE_UNIFIED_ITEMS: boolean;
    };
    priorities: Iterable<string>;
    exclude: Iterable<string>;
    includeTags: Iterable<string>;
    tagGen: Map<string, Iterable<string>>;
};

const GLOBAL_UNIFY_CONFIG = 'unify:config';

export const setUnifyConfig = (config: UnifyConfig) => {
    setGlobal(GLOBAL_UNIFY_CONFIG, config);
};

export const getUnifyConfig = (): UnifyConfig => getGlobal(GLOBAL_UNIFY_CONFIG);