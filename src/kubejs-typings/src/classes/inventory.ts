import { JavaClass } from "../interfaces/java-class";
import { ItemStack } from "./item-stack";

export interface Inventory extends JavaClass {
    getSize(): number;
    get(slot: number): ItemStack;
    set(slot: number, item: ItemStack): void;
    insert(slot: number, item: ItemStack, simulate: boolean): ItemStack;
    extract(slot: number, amount: number, simulate: boolean): ItemStack;
    isItemValid(slot: number, item: ItemStack): boolean;
    isEmpty(): boolean;
    markDirty(): void;
}