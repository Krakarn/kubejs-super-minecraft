import { Ingredient } from '../kubejs-typings/src/classes/ingredient';

export const tryTag = (tag: string): Ingredient | undefined => {
    try {
        return Ingredient.of("#"+tag)
    } catch (err) {
        return undefined;
    }
};