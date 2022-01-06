import { GenericEvent } from './generic';
import { RecipeFilter } from '../classes/recipe-filter';
import { Ingredient } from '../classes/ingredient';

export interface InitEvent extends GenericEvent { }
export interface PostInitEvent extends GenericEvent { }
export interface LoadedEvent extends GenericEvent { }
export interface CommandRegistryEvent extends GenericEvent { }
export interface CommandRunEvent extends GenericEvent { }
export interface RecipesEvent extends GenericEvent {
	replaceInput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient, exact: boolean): number;
	replaceInput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient): number;
	replaceInput(ingredient: Ingredient, _with: Ingredient): number;
	replaceOutput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient, exact: boolean): number;
	replaceOutput(filter: RecipeFilter, ingredient: Ingredient, _with: Ingredient): number;
	replaceOutput(ingredient: Ingredient, _with: Ingredient): number;
}
export interface FluidTagsEvent extends GenericEvent { }
export interface EntityTypeTagsEvent extends GenericEvent { }