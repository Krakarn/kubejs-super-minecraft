import { JavaClass } from "../interfaces/java-class";
import { AABB } from "./aabb";
import { AttachedData } from "./attached-data";
import { BlockContainer } from "./block-container";
import { BlockEntity } from "./block-entity";
import { BlockPos } from "./block-pos";
import { Entity } from "./entity";
import { EntityArrayList } from "./entity-array-list";
import { Explosion } from "./explosion";
import { Fireworks } from "./fireworks";
import { GameRules } from "./game-rules";
import { LivingEntity } from "./living-entity";
import { Player } from "./player";
import { PlayerData } from "./player-data";
import { ResourceLocation } from "./resource-location";
import { ScriptType } from "./script-type";
import { Server } from "./server";

export interface World extends JavaClass {
    getSide(): ScriptType;
    getData(): AttachedData;
    getGameRules(): GameRules;
    getServer(): Server | undefined;
    getTime(): number;
    getLocalTime(): number
    getDimension(): String;
    isOverworld(): boolean
    isDaytime(): boolean;
    isRaining(): boolean;
    isThundering(): boolean;
    setRainStrength(strength: number): void;
    getBlock(x: number, y: number, z: number): BlockContainer;
    getBlock(pos: BlockPos): BlockContainer;
    getBlock(blockEntity: BlockEntity): BlockContainer;
    getPlayerData(player: Player): PlayerData;
    getEntity(e: Entity): Entity | undefined;
    getLivingEntity(entity?: Entity): LivingEntity | undefined;
    getPlayer(entity?: Entity): Player | undefined;
    createEntityList(entities: Entity[]): EntityArrayList;
    getPlayers(): EntityArrayList;
    getEntities(): EntityArrayList;
    createExplosion(x: number, y: number, z: number): Explosion;
    createEntity(id: ResourceLocation): Entity | undefined;
    spawnLightning(x: number, y: number, z: number, effectOnly: boolean, player?: Entity): void;
    spawnLightning(x: number, y: number, z: number, effectOnly: boolean): void;
    spawnFireworks(x: number, y: number, z: number, f: Fireworks): void;
    getEntitiesWithin(aabb: AABB): EntityArrayList;
}