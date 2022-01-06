import { Ingredient } from '../kubejs-typings/src/classes/ingredient';
import { Inventory } from '../kubejs-typings/src/classes/inventory';
import { ItemStack } from '../kubejs-typings/src/classes/item-stack';
import { find, range } from '../util';

export const tryTag = (tag: string): Ingredient | undefined => {
    try {
        return Ingredient.of("#"+tag)
    } catch (err) {
        return undefined;
    }
};

export const inventoryToSlotsIterable = (inventory: Inventory): Iterable<number> =>
    range(inventory.getSize())
;

export const findValidInventorySlotForItem = (inventory: Inventory, item: ItemStack): number | undefined =>
    find(inventoryToSlotsIterable(inventory), (slot) => inventory.isItemValid(slot, item))
;