import { JavaClass } from "../interfaces/java-class";
import { ItemStack } from "./item-stack";

export interface Inventory extends JavaClass {
    set(slot: number, item: ItemStack): void;
}