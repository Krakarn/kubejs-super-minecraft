import { GenericEvent } from "../events/generic";

declare global {
	interface EventMap {
		"jei.subtypes": JEISubtypesEvent;
		"jei.hide.items": JEIHideItemsEvent;
		"jei.add.items": JEIAddItemsEvent;
		"jei.information": JEIInformationEvent;
	}
}

export interface JEISubtypesEvent extends GenericEvent { }
export interface JEIHideItemsEvent extends GenericEvent {
	hide(tag: string): void;
}
export interface JEIAddItemsEvent extends GenericEvent { }
export interface JEIInformationEvent extends GenericEvent { }
