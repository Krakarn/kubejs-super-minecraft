// tags: https://minecraft.gamepedia.com/Tag#Items
export type ItemOrTag = { item: string } | { tag: string };

export interface GenericJSON {
	group?: string;
}

// https://github.com/skylinerw/guides/blob/master/java/recipes.md#shaped-crafting
export interface CraftingShapedJSON extends GenericJSON {
	pattern: [
		row1: string,
		row2: string,
		row3: string
	];
	key: {
		[k: string]: string;
	};
	result: {
		item: string;
		count?: number;
	} | string;
}

// https://github.com/skylinerw/guides/blob/master/java/recipes.md#shapeless-crafting
export interface CraftingShapelessJSON extends GenericJSON {
	group?: string;
	ingredients: (ItemOrTag | ItemOrTag[])[];
	result: {
		item: string;
		count?: number;
	} | string;
}

// https://github.com/skylinerw/guides/blob/master/java/recipes.md#smelting
export interface SmeltingJSON extends GenericJSON {
	group?: string;
	ingredient: (ItemOrTag | ItemOrTag[])[];
	result: string;
	experience: number;
	cookingtime?: number;
}

// https://minecraft.gamepedia.com/Recipe#blasting
export interface BlastingJSON extends SmeltingJSON {
}

// https://minecraft.gamepedia.com/Recipe#campfire_cooking
export interface CampfireCookingJSON extends SmeltingJSON {
}

// https://minecraft.gamepedia.com/Recipe#smoking
export interface SmokingJSON extends SmeltingJSON {
}

// https://minecraft.gamepedia.com/Recipe#smithing
export interface SmithingJSON extends GenericJSON {
	base: ItemOrTag;
	addition: ItemOrTag;
	result: string;
}

// https://minecraft.gamepedia.com/Recipe#stonecutting
export interface StonecuttingJSON extends GenericJSON {
	ingredient: ItemOrTag | ItemOrTag[];
	result: string;
	count: number;
}