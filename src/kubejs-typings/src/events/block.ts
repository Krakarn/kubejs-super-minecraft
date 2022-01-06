import { GenericEvent } from "./generic";

export interface BlockRegistryEvent extends GenericEvent { }
export interface BlockMissingMappingsEvent extends GenericEvent { }
export interface BlockTagsEvent extends GenericEvent { }
export interface BlockRightClickEvent extends GenericEvent { }
export interface BlockLeftClickEvent extends GenericEvent { }
export interface BlockPlaceEvent extends GenericEvent { }
export interface BlockBreakEvent extends GenericEvent { }
export interface BlockDropsEvent extends GenericEvent { }