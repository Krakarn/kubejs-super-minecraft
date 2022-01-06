import { GenericEvent } from "../events/generic";

declare global {
	interface EventMap {
		"rei.hide.items": REIHideItemsEvent;
		"rei.add.items": REIAddItemsEvent;
		"rei.information": REIInformationEvent;
	}
}

export interface REIHideItemsEvent extends GenericEvent { }
export interface REIAddItemsEvent extends GenericEvent { }
export interface REIInformationEvent extends GenericEvent { }
