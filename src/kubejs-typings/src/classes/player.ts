import { Inventory } from "./inventory";
import { LivingEntity } from "./living-entity";

export interface Player extends LivingEntity {
    getInventory(): Inventory;
}