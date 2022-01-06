import { Component } from "../interfaces/component";
import { CompoundTag } from "../interfaces/compound-tag";
import { IScheduledEventCallback } from "../interfaces/scheduled-event-callback";
import { UUID } from "../interfaces/uuid";
import { Text } from "../interfaces/text";
import { Advancement } from "./advancement";
import { AttachedData } from "./attached-data";
import { EntityArrayList } from "./entity-array-list";
import { Level } from "./level";
import { MinecraftServer } from "./minecraft-server";
import { Player } from "./player";
import { ResourceLocation } from "./resource-location";
import { ScheduledEvent } from "./scheduled-event";
import { ServerPlayer } from "./server-player";
import { ServerWorld } from "./server-world";
import { World } from "./world";
import { JavaClass } from "../interfaces/java-class";

export interface Server extends JavaClass {
    release(): void;
    updateWorldList(): void;
    getData(): AttachedData;
    getWorlds(): ServerWorld[];
    getOverworld(): ServerWorld;
    getMinecraftServer(): MinecraftServer;
    isRunning(): boolean;
    getHardcore(): boolean;
    isSinglePlayer(): boolean;
    isDedicated(): boolean;
    getMotd(): String;
    setMotd(text: Component): void;
    stop(): void;
    getName(): Text;
    getDisplayName(): Text;
    tell(message: Component): void;
    setStatusMessage(message: Component): void;
    runCommand(command: String): number;
    runCommandSilent(command: String): number;
    getLevel(dimension: String): World;
    getLevel(minecraftLevel: Level): World;
    getPlayer(uuid: UUID): ServerPlayer | undefined;
    getPlayer(name: String): ServerPlayer | undefined;
    getPlayer(minecraftPlayer: Player): ServerPlayer | undefined;
    getPlayers(): EntityArrayList;
    getEntities(): EntityArrayList;
    getEntities(filter: String): EntityArrayList;
    schedule(timer: number, data: Object | undefined, event: IScheduledEventCallback): ScheduledEvent;
    schedule(timer: number, event: IScheduledEventCallback): ScheduledEvent;
    scheduleInTicks(ticks: number, data: Object | undefined, event: IScheduledEventCallback): ScheduledEvent;
    scheduleInTicks(ticks: number, event: IScheduledEventCallback): ScheduledEvent;
    getAdvancement(id: ResourceLocation): Advancement | undefined;
    sendDataToAll(channel: String, data?: CompoundTag): void;
}