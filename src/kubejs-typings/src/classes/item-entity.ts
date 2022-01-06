import { Entity } from "./entity";

export interface ItemEntity extends Entity {
    setItem(item: unknown): void;
}