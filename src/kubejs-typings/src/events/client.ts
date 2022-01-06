import { GenericEvent } from "./generic";

export interface ClientInitEvent extends GenericEvent { }
export interface ClientDebugInfoLeftEvent extends GenericEvent { }
export interface ClientDebugInfoRightEvent extends GenericEvent { }
export interface ClientLoggedInEvent extends GenericEvent { }
export interface ClientLoggedOutEvent extends GenericEvent { }
export interface ClientTickEvent extends GenericEvent { }
export interface ClientItemTooltipEvent extends GenericEvent { }