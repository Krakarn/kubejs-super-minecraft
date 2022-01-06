import { GenericEvent } from "./generic";

export interface ServerLoadEvent extends GenericEvent { }
export interface ServerUnloadEvent extends GenericEvent { }
export interface ServerTickEvent extends GenericEvent { }
export interface ServerDatapackFirstEvent extends GenericEvent { }
export interface ServerDatapackLastEvent extends GenericEvent { }