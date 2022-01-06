import { ItemEntity } from "../kubejs-typings/src/classes/item-entity";
import { filter, forEach, has, setGlobal } from "../util";
import { getTagItems, getTagsFromConfig, initializeTagItems } from "./tags";
import { getUnifyConfig, UnifyConfig } from "./unify-config";
import { tryTag } from "./util";

const RUNNING_PLAYER_INVENTORY_CHANGED = 'running:player.inventory.changed';

export const initializeUnifyServer = (providedConfig?: UnifyConfig) => {
    const config = providedConfig || getUnifyConfig();
    const tags = getTagsFromConfig(config);

    // Replace input and output of recipes (and iterate over tags!)
    onEvent("recipes", event => {
        console.log('onEvent recipes');
        console.log('Unifying recipes for tags:');
        console.log(tags);
        // Update tags
        initializeTagItems();

        // Unify the rest
        if (config.flags.RECIPE_UNIFY) {
            const tagItems = getTagItems();

            console.log('forEach tags');
            forEach(tags, tag => {
                const ingr = tryTag(tag);

                if (ingr) {
                    const stacks = filter(ingr.getStacks(), stack => has(config.exclude, stack.getId()));
                    const oItem = tagItems.get(tag);

                    console.log('forEach stacks');
                    forEach(stacks, iItem => {
                        const stackIngr = Ingredient.of(iItem.getId());

                        event.replaceInput({}, stackIngr, Ingredient.of("#"+tag));

                        if (oItem) {
                            event.replaceOutput({}, stackIngr, Ingredient.of(oItem));
                        }
                    });
                }
            });
        }
    });

    // Handle inventory change (to check for unificaiton)
    // Unfortunately it gets called twice due to setting the inventory.
    onEvent("player.inventory.changed", event => {
        console.log('onEvent player.inventory.changed');
        setGlobal(RUNNING_PLAYER_INVENTORY_CHANGED)
        if (config.flags.INVENTORY_UNIFY) {
            // Get held item
            const heldItem = event.getItem();
            const itemId = heldItem.getId();
            // Check if item is excluded
            if (has(config.exclude, itemId)) return;

            const tagItems = getTagItems();

            // Check for every tag in the list
            console.log('forEach tags');
            forEach(tags, tag => {
                const ingr = tryTag(tag);

                if (ingr && ingr.test(heldItem)) {
                    // If item is in tag, determine if it needs to be changed
                    const tItem = tagItems.get(tag);

                    if (tItem && tItem != itemId) {
                        // Fix slot number
                        let slot = event.getSlot();
                        if (slot <= 5) slot += 36;
                        else if (slot == 45) slot = 40;
                        else if (slot >= 36) slot -= 36;

                        const newItem = Ingredient.of(tItem).getFirst().withCount(heldItem.getCount());

                        // Update item
                        event.getEntity().getInventory().set(slot, newItem);
                    }
                    return true;
                }
            });
        }
    });

    // Items on ground
    onEvent("entity.spawned", event => {
        console.log('onEvent entity.spawned');
        if (config.flags.ITEM_UNIFY) {
            const entity = event.getEntity();

            if (entity.getType() == "minecraft:item") {
                const itemEntity = entity as ItemEntity;
                const gItem = itemEntity.getItem();
                const itemId = gItem.getId();

                // Check if item is excluded
                if (has(config.exclude, itemId)) return;

                const tagItems = getTagItems();

                // Check for every tag in the list
                console.log('forEach tags');
                forEach(tags, tag => {
                    const ingr = tryTag(tag);

                    if (ingr && ingr.test(gItem)) {
                        // If item is in tag, determine if it needs to be changed
                        const tItem = tagItems.get(tag);

                        if (tItem && tItem != itemId) {
                            const newItem = Ingredient.of(tItem).getFirst().withCount(gItem.getCount());
                            itemEntity.setItem(newItem);
                        }

                        return true;
                    }
                });
            }
        }
    });
};