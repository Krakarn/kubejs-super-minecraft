import '../events/general';

declare module '../events/general' {
    interface RecipeEventRecipes {
        createPressing(output: Iterable<string>, input: Iterable<string>): void;
    }
}