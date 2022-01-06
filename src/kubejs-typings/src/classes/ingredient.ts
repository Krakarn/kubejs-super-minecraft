import { Copyable } from "../interfaces/copyable";
import { JavaClass } from "../interfaces/java-class";
import { FluidStack } from "./fluid-stack";
import { IngredientStack } from "./ingredient-stack";
import { Item } from "./item";
import { ItemStack } from "./item-stack";
import { JsonElement } from "./json-element";
import { Pattern } from "./pattern";
import { Predicate } from "./predicate";
import { Wrapper } from "./wrapper";

export interface IngredientStatic {
	of(o: Ingredient): Ingredient;
	of(o: Wrapper<Ingredient>): Ingredient;
	of(o: Pattern): Ingredient;
	of(o: RegExp): Ingredient;
	of(o: FluidStack): Ingredient;
	of(o: JsonElement): Ingredient;
	of(o: string): Ingredient;
	ingredientFromRecipeJson(json: JsonElement): Ingredient;
}

export interface Ingredient extends Copyable<Ingredient>, JavaClass {
	test(stack: ItemStack): boolean;
	testVanilla(stack: ItemStack): boolean;
	testVanillaItem(item: Item): boolean;
	getVanillaPredicate(): Predicate<ItemStack>;
	isEmpty(): boolean;
	isInvalidRecipeIngredient(): boolean;
	getStacks(): Set<ItemStack>;
	getVanillaItems(): Set<Item>;
	getItemIds(): Set<string>;
	filter(filter: Ingredient): Ingredient;
	not(): Ingredient;
	getFirst(): ItemStack;
	withCount(count: number): Ingredient;
	x(c: number): Ingredient;
	getCount(): number;
	toJson(): JsonElement;
	anyStackMatches(ingredient: Ingredient): boolean;
	asIngredientStack(): IngredientStack;
	unwrapStackIngredient(): Ingredient[];
}