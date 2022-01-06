import { GenericEvent } from "./generic";

export interface WorldLoadEvent extends GenericEvent { }
export interface WorldUnloadEvent extends GenericEvent { }
export interface WorldTickEvent extends GenericEvent { }
export interface WorldExplosionPreEvent extends GenericEvent { }
export interface WorldExplosionPostEvent extends GenericEvent { }