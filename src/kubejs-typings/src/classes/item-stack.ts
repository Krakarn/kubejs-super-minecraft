import { Ingredient } from "./ingredient";
import { Item } from "./item";
import { ResourceLocation } from "./resource-location";

export interface ItemStack extends Ingredient {
        getId(): string;
        getTags(): ResourceLocation[];
        hasTag(tag: ResourceLocation): boolean;
        getItem(): Item;
        getMod(): string;
        withCount(c: number): ItemStack;
}