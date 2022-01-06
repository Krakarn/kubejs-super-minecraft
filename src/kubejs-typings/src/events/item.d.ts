import { GenericEvent } from "./generic";

export interface ItemRegistryEvent extends GenericEvent { }
export interface ItemMissingMappingsEvent extends GenericEvent { }
export interface ItemTagsEvent extends GenericEvent { }
export interface ItemRightClickEvent extends GenericEvent { }
export interface ItemRightClickEmptyEvent extends GenericEvent { }
export interface ItemLeftClickEvent extends GenericEvent { }
export interface ItemEntityInteractEvent extends GenericEvent { }
export interface ItemPickupEvent extends GenericEvent { }
export interface ItemTossEvent extends GenericEvent { }
export interface ItemCraftedEvent extends GenericEvent { }
export interface ItemSmeltedEvent extends GenericEvent { }