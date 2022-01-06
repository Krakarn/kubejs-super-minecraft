import { initializeConfig } from "../config"
import { initializeUnifyServer } from "../unify/server-init"

settings.logAddedRecipes = true;
settings.logRemovedRecipes = true;
settings.logSkippedRecipes = false;
settings.logErroringRecipes = true;

const p = () => {
    console.log('[].entries()');
    [].entries();
    console.log('new Set().entries()');
    new Set().entries();
    console.log('Array.from(new Set()).entries()');
    Array.from(new Set()).entries();
};

p();

initializeConfig();
initializeUnifyServer();