import { ItemEntity } from "../kubejs-typings/src/classes/item-entity";
import { filter, forEach, has } from "../util";
import { convertToUnifiedItem, getTagItems, getTagsFromConfig, initializeTagItems } from "./tags";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";
import '../kubejs-typings/src/integrations/create';

export const initializeUnifyServer = (providedConfig?: UnifyConfig) => {
    const config = providedConfig || getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Replace input and output of recipes (and iterate over tags!)
    onEvent("recipes", event => {
        // Update tags
        initializeTagItems();

        if (!config.flags.RECIPE_UNIFY) return;

        event.recipes.createPressing(['immersiveengineering:plate_steel'], ['#forge:ingots/steel']);

        // Unify the rest
        const tagItems = getTagItems();

        forEach(tags, tag => {
            const ingr = tryTag(tag);

            if (!ingr) return;

            const stacks = filter(ingr.getStacks(), stack => has(config.exclude, stack.getId()));
            const oItem = tagItems.get(tag);

            forEach(stacks, iItem => {
                const stackIngr = Ingredient.of(iItem.getId());

                event.replaceInput({}, stackIngr, Ingredient.of("#"+tag));

                if (!oItem) return;

                event.replaceOutput({}, stackIngr, Ingredient.of(oItem));
            });
        });
    });

    // Handle inventory change (to check for unificaiton)
    // Unfortunately it gets called twice due to setting the inventory.
    onEvent("player.inventory.changed", event => {
        if (!config.flags.INVENTORY_UNIFY) return;

        // Get held item
        const heldItem = event.getItem();
        const itemId = heldItem.getId();

        // Check if item is excluded
        if (has(config.exclude, itemId)) return;

        const unifiedItem = convertToUnifiedItem(heldItem, tags);

        if (!unifiedItem) return;

        const inventory = event.getEntity().getInventory();
        const slot = event.getSlot();

        console.log('unifiedItem ' + unifiedItem.getId() + ' ' + unifiedItem.getMod());

        inventory.set(slot, unifiedItem);
        inventory.markDirty();
    });

    // Items on ground
    onEvent("entity.spawned", event => {
        if (!config.flags.ITEM_UNIFY) return;

        const entity = event.getEntity();

        if (entity.getType() !== "minecraft:item") return;

        const itemEntity = entity as ItemEntity;
        const gItem = itemEntity.getItem();
        const itemId = gItem.getId();

        // Check if item is excluded
        if (has(config.exclude, itemId)) return;

        const unifiedItem = convertToUnifiedItem(gItem, tags);

        if (!unifiedItem) return;

        itemEntity.setItem(unifiedItem);
    });
};