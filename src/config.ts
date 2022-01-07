import { setUnifyConfig, UnifyConfig } from "./unify/unify-config";

export type Config = {
    unify: UnifyConfig;
}

export const config: Config = {
    unify: {
        flags: {
            INVENTORY_UNIFY: true,
            ITEM_UNIFY: true,
            RECIPE_UNIFY: true,
            HIDE_UNIFIED_ITEMS: true,
        },
        modPriorities: [
            "cavesandcliffs",
            "minecraft",
            "alltheores",
            "create",
            "immersiveengineering",
            "mekanism",
            "thermal",
            "silents_mechanisms",
            "silentgems",
            "chemlib"
        ],
        exclude: [],
        includeTags: [
            "forge:silicon",
        ],
        tagGen: new Map([
            ['gold', ["gears","plates"]],
            ['diamond', ["gears","plates"]],
            ['iron', ['storage_blocks','ingots','nuggets','dusts','ores','gears','plates']],
            ['copper', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['tin', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['aluminum', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['lead', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['silver', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['nickel', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['bronze', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['steel', ["storage_blocks","ingots", "nuggets","dusts","plates"]],
            ['platinum', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['uranium', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['iridium', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['zinc', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['osmium', ["ingots","ores"]],
            ['sulfur', ["dusts","ores"]],
            ['silicon', ["gems"]],
        ]),
        preferredItems: new Map([
            ['ores', 'raw_%m'],
        ]),
    },
};

export const initializeConfig = () => {
    setUnifyConfig(config.unify);
};
