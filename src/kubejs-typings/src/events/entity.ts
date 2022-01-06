import { Entity } from "../classes/entity";
import { GenericEvent } from "./generic";

export interface EntityDeathEvent extends GenericEvent { }
export interface EntityAttackEvent extends GenericEvent { }
export interface EntityDropsEvent extends GenericEvent { }
export interface EntityCheckSpawnEvent extends GenericEvent { }
export interface EntitySpawnedEvent extends GenericEvent {
	getEntity(): Entity;
}