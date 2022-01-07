import { GenericEvent } from './generic';
import { RecipeFilter } from '../classes/recipe-filter';
import { Ingredient } from '../classes/ingredient';
import { Recipe } from '../classes/recipe';
import { RecipeType } from '../classes/recipe-type';

export interface InitEvent extends GenericEvent { }
export interface PostInitEvent extends GenericEvent { }
export interface LoadedEvent extends GenericEvent { }
export interface CommandRegistryEvent extends GenericEvent { }
export interface CommandRunEvent extends GenericEvent { }

export interface RecipeEventRecipes {
}

export interface RecipeEvent extends GenericEvent {
	recipes: RecipeEventRecipes;
	getRecipes(): Map<string, unknown>;
	addRecipe(r: Recipe, type: RecipeType, args1: unknown[]): Recipe;
	customFilter(filter: RecipeFilter): RecipeFilter;
	forEachRecipe(filter: RecipeFilter, consumer: (recipe: Recipe) => void): void;
	forEachRecipeAsync(filter: RecipeFilter, consumer: (recipe: Recipe) => void): void;
	countRecipes(filter: RecipeFilter): number;
	remove(filter: RecipeFilter): number;
	replaceInput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient, exact: boolean): number;
	replaceInput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient): number;
	replaceInput(ingredient: Ingredient, _with: Ingredient): number;
	replaceOutput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient, exact: boolean): number;
	replaceOutput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient): number;
	replaceOutput(ingredient: Ingredient, _with: Ingredient): number;
	//getRecipeFunction(id?: string): RecipeFunction;
	printTypes(): void;
	printAllTypes(): void;
	printExamples(type: string): void;
	setItemErrors(b: boolean): void;
	stage(filter: RecipeFilter, stage: string): void;
}
export interface FluidTagsEvent extends GenericEvent { }
export interface EntityTypeTagsEvent extends GenericEvent { }