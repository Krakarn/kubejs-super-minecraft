import '../kubejs-typings/src/integrations/jei';

import { forEach, has } from "../util";
import { getTagItems, getTagsFromConfig } from "./tags";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";

export const initializeUnifyClient = (providedConfig?: UnifyConfig) => {
    const config = providedConfig || getUnifyConfig();
    const tags = getTagsFromConfig(config);

    onEvent("jei.hide.items", event => {
        if (!config.flags.HIDE_UNIFIED_ITEMS) return;

        const tagItems = getTagItems();

        try {
            forEach(tags, tag => {
                const ingr = tryTag(tag);

                if (!ingr) return;

                const stacks = ingr.getStacks();
                const tItem = tagItems.get(tag);

                forEach(stacks, s => {
                    const stackId = s.getId();

                    if (stackId === tItem || has(config.exclude, stackId)) return;

                    event.hide(stackId);
                });
            });
        } catch (err) {
            console.error("Failure to hide unified items in JEI. Press F3+T to reload client and retry.");
            console.error("Error message: " + (err as Error)?.message);
        }
    })
};