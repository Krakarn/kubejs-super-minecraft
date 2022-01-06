import { ItemStack } from "./item-stack";

export interface Inventory {
    set(slot: number, item: ItemStack): void;
}