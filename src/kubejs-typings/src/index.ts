import { IngredientStatic } from "./classes/ingredient";
import { CommandRegistryEvent, CommandRunEvent, EntityTypeTagsEvent, FluidTagsEvent, InitEvent, LoadedEvent, PostInitEvent, RecipesEvent } from "./events/general";
import { BlockBreakEvent, BlockDropsEvent, BlockLeftClickEvent, BlockMissingMappingsEvent, BlockPlaceEvent, BlockRegistryEvent, BlockRightClickEvent, BlockTagsEvent } from './events/block';
import { ClientDebugInfoLeftEvent, ClientDebugInfoRightEvent, ClientInitEvent, ClientItemTooltipEvent, ClientLoggedInEvent, ClientLoggedOutEvent, ClientTickEvent } from './events/client';
import { EntityAttackEvent, EntityCheckSpawnEvent, EntityDeathEvent, EntityDropsEvent, EntitySpawnedEvent } from './events/entity';
import { ItemCraftedEvent, ItemEntityInteractEvent, ItemLeftClickEvent, ItemMissingMappingsEvent, ItemPickupEvent, ItemRegistryEvent, ItemRightClickEmptyEvent, ItemRightClickEvent, ItemSmeltedEvent, ItemTagsEvent, ItemTossEvent } from './events/item';
import { PlayerAdvancementEvent, PlayerChatEvent, PlayerChestClosedEvent, PlayerChestOpenedEvent, PlayerDataFromClientEvent, PlayerDataFromServerEvent, PlayerInventoryChangedEvent, PlayerInventoryClosedEvent, PlayerInventoryOpenedEvent, PlayerLoggedInEvent, PlayerLoggedOutEvent, PlayerTickEvent } from './events/player';
import { ServerDatapackFirstEvent, ServerDatapackLastEvent, ServerLoadEvent, ServerTickEvent, ServerUnloadEvent } from './events/server';
import { WorldExplosionPostEvent, WorldExplosionPreEvent, WorldLoadEvent, WorldTickEvent, WorldUnloadEvent } from './events/world';

export interface KubeJSSettings {
	logAddedRecipes: boolean;
	logRemovedRecipes: boolean;
	logSkippedRecipes: boolean;
	logErroringRecipes: boolean;
}

export interface Global {
	[index:string]: unknown;
}

declare global {
	interface EventMap {
		"init": InitEvent;
		"postinit": PostInitEvent;
		"loaded": LoadedEvent;
		"command.registry": CommandRegistryEvent;
		"command.run": CommandRunEvent;
		"client.init": ClientInitEvent;
		"client.debug_info.left": ClientDebugInfoLeftEvent;
		"client.debug_info.right": ClientDebugInfoRightEvent;
		"client.logged_in": ClientLoggedInEvent;
		"client.logged_out": ClientLoggedOutEvent;
		"client.tick": ClientTickEvent;
		"client.item_tooltip": ClientItemTooltipEvent;
		"server.load": ServerLoadEvent;
		"server.unload": ServerUnloadEvent;
		"server.tick": ServerTickEvent;
		"server.datapack.first": ServerDatapackFirstEvent;
		"server.datapack.last": ServerDatapackLastEvent;
		"recipes": RecipesEvent;
		"world.load": WorldLoadEvent;
		"world.unload": WorldUnloadEvent;
		"world.tick": WorldTickEvent;
		"world.explosion.pre": WorldExplosionPreEvent;
		"world.explosion.post": WorldExplosionPostEvent;
		"player.logged_in": PlayerLoggedInEvent;
		"player.logged_out": PlayerLoggedOutEvent;
		"player.tick": PlayerTickEvent;
		"player.data_from_server": PlayerDataFromServerEvent;
		"player.data_from_client": PlayerDataFromClientEvent;
		"player.chat": PlayerChatEvent;
		"player.advancement": PlayerAdvancementEvent;
		"player.inventory.opened": PlayerInventoryOpenedEvent;
		"player.inventory.closed": PlayerInventoryClosedEvent;
		"player.inventory.changed": PlayerInventoryChangedEvent;
		"player.chest.opened": PlayerChestOpenedEvent;
		"player.chest.closed": PlayerChestClosedEvent;
		"entity.death": EntityDeathEvent;
		"entity.attack": EntityAttackEvent;
		"entity.drops": EntityDropsEvent;
		"entity.check_spawn": EntityCheckSpawnEvent;
		"entity.spawned": EntitySpawnedEvent;
		"block.registry": BlockRegistryEvent;
		"block.missing_mappings": BlockMissingMappingsEvent;
		"block.tags": BlockTagsEvent;
		"block.right_click": BlockRightClickEvent;
		"block.left_click": BlockLeftClickEvent;
		"block.place": BlockPlaceEvent;
		"block.break": BlockBreakEvent;
		"block.drops": BlockDropsEvent;
		"item.registry": ItemRegistryEvent;
		"item.missing_mappings": ItemMissingMappingsEvent;
		"item.tags": ItemTagsEvent;
		"item.right_click": ItemRightClickEvent;
		"item.right_click_empty": ItemRightClickEmptyEvent;
		"item.left_click": ItemLeftClickEvent;
		"item.entity_interact": ItemEntityInteractEvent;
		"item.pickup": ItemPickupEvent;
		"item.toss": ItemTossEvent;
		"item.crafted": ItemCraftedEvent;
		"item.smelted": ItemSmeltedEvent;
		"fluid.tags": FluidTagsEvent;
		"entity_type.tags": EntityTypeTagsEvent;
	}

	function onEvent<K extends keyof EventMap>(
		eventName: K,
		listener: (e: EventMap[K]) => void,
	): void;

	const global: Global;
	const settings: KubeJSSettings;

	const Ingredient: IngredientStatic;
}
