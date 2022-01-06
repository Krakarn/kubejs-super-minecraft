import { initializeConfig } from "../config"
import { initializeUnifyServer } from "../unify/server-init"

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

initializeConfig();
initializeUnifyServer();