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
        priorities: [
            "minecraft",
            "alltheores",
            "mekanism",
            "thermal",
            "silents_mechanisms",
            "silentgems",
            "chemlib"
        ],
        exclude: [],
        includeTags: [
            "forge:plates/iron",
            "forge:gears/iron",
            "forge:silicon"
        ],
        tagGen: new Map([
            ['gold', ["gears","plates"]],
            ['diamond', ["gears","plates"]],
            ['copper', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['tin', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['aluminum', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['lead', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['silver', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['nickel', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['bronze', ["storage_blocks","ingots","nuggets","dusts","ores","gears","plates"]],
            ['steel', ["storage_blocks","ingots","nuggets","dusts"]],
            ['platinum', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['uranium', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['iridium', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['zinc', ["storage_blocks","ingots","nuggets","dusts","ores"]],
            ['osmium', ["ingots","ores"]],
            ['sulfur', ["dusts","ores"]],
            ['silicon', ["gems"]],
        ]),
    },
};

export const initializeConfig = () => {
    setUnifyConfig(config.unify);
};
