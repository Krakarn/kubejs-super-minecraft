import { ItemEntity } from "../kubejs-typings/src/classes/item-entity";
import { Player } from "../kubejs-typings/src/classes/player";
import { filter, forEach, has } from "../util";
import { getTagItems, getTagsFromConfig, initializeTagItems } from "./tags";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";

export const initializeUnifyServer = (providedConfig?: UnifyConfig) => {
    const config = providedConfig || getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Replace input and output of recipes (and iterate over tags!)
    onEvent("recipes", event => {
        // Update tags
        initializeTagItems();

        if (!config.flags.RECIPE_UNIFY) return;

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
        const player = event.getEntity() as Player;
        if (player.getInventory().getClass().getName() === "net.minecraft.inventory.container.PlayerContainer")
            return;

        if (!config.flags.INVENTORY_UNIFY) return;

        // Get held item
        const heldItem = event.getItem();
        const itemId = heldItem.getId();
        // Check if item is excluded
        if (has(config.exclude, itemId)) return;

        const tagItems = getTagItems();

        // Check for every tag in the list
        forEach(tags, tag => {
            const ingr = tryTag(tag);

            if (!ingr || !ingr.test(heldItem)) return;

            // If item is in tag, determine if it needs to be changed
            const tItem = tagItems.get(tag);

            if (!tItem || tItem === itemId) return;

            // Fix slot number
            let slot = event.getSlot();
            if (slot <= 5) slot += 36;
            else if (slot == 45) slot = 40;
            else if (slot >= 36) slot -= 36;

            const newItem = Ingredient.of(tItem).getFirst().withCount(heldItem.getCount());

            // Update item
            event.getEntity().getInventory().set(slot, newItem);

            return true;
        });
    });

    // Items on ground
    onEvent("entity.spawned", event => {
        console.log('onEvent entity.spawned');
        
        if (!config.flags.ITEM_UNIFY) return;

        const entity = event.getEntity();

        if (entity.getType() !== "minecraft:item") return;

        const itemEntity = entity as ItemEntity;
        const gItem = itemEntity.getItem();
        const itemId = gItem.getId();

        // Check if item is excluded
        if (has(config.exclude, itemId)) return;

        const tagItems = getTagItems();

        // Check for every tag in the list
        forEach(tags, tag => {
            const ingr = tryTag(tag);

            if (!ingr || !ingr.test(gItem)) return;

            // If item is in tag, determine if it needs to be changed
            const tItem = tagItems.get(tag);
            
            if (!tItem || tItem === itemId) return;

            const newItem = Ingredient.of(tItem).getFirst().withCount(gItem.getCount());
            itemEntity.setItem(newItem);

            return true;
        });
    });
};