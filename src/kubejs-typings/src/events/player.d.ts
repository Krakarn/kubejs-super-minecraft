import { ItemStack } from "../classes/item-stack";
import { Player } from "../classes/player";
import { GenericEvent } from "./generic";

export interface PlayerLoggedInEvent extends GenericEvent { }
export interface PlayerLoggedOutEvent extends GenericEvent { }
export interface PlayerTickEvent extends GenericEvent { }
export interface PlayerDataFromServerEvent extends GenericEvent { }
export interface PlayerDataFromClientEvent extends GenericEvent { }
export interface PlayerChatEvent extends GenericEvent { }
export interface PlayerAdvancementEvent extends GenericEvent { }
export interface PlayerInventoryOpenedEvent extends GenericEvent { }
export interface PlayerInventoryClosedEvent extends GenericEvent { }
export interface PlayerInventoryChangedEvent extends GenericEvent {
	getEntity(): Player;
	getItem(): ItemStack;
	getSlot(): number;
}
export interface PlayerChestOpenedEvent extends GenericEvent { }
export interface PlayerChestClosedEvent extends GenericEvent { }