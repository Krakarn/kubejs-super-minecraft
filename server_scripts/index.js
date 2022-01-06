const makeDefineAndRequire = (debug) => {
    debug = debug || false;
    const mods = {};
    const log = () => debug && console.log.apply(console, arguments);

    const define = (m, redeps, f) => {
        const deps = redeps.slice(2);
        mods[m] = [deps, f];
    };

    const maxDepth = 100;
    function resolveDeps(deps, cachedDeps, depth, prevDeps) {
        if (depth > maxDepth) {
            throw new Error(`Exceeded max depth (${maxDepth})`);
        }

        if (deps.length === 0) return [];

        const dep = deps[0];
        depth = depth || 1;
        prevDeps = prevDeps || [];

        const continueResolveDeps = (currentDep) =>
            [currentDep].concat(resolveDeps(deps.slice(1), cachedDeps, depth, prevDeps))
        ;

        const allDeps = prevDeps.concat([dep]);
        log(`resolveDep ${allDeps.join(' -> ')} ${depth}`);
        const mod = mods[dep];
        const cachedDep = cachedDeps[dep] || (mod[2] && (() => mod[2]));

        if (cachedDep) {
            log(`found cached dep: ${dep}`);
            return continueResolveDeps(cachedDep);
        }

        log(`building dep: ${dep}`);
        const modDeps = mod[0];
        const f = mod[1];
        const resolvedSubDeps = resolveDeps(modDeps, cachedDeps, depth + 1, allDeps);

        const resolvedDep = () => {
            log(`resolveModule: ${dep}`);
            const m = mod[2];
            if (m) { log(`found cached module: ${dep}`); return m; }
            mod[2] = {};
            log(`resolving module: ${dep}`);
            f.apply(null, [null, mod[2]].concat(resolvedSubDeps.map(g => g())));
            return mod[2];
        };

        cachedDeps[dep] = resolvedDep;
        log(`finished building dep: ${dep}`);

        return continueResolveDeps(resolvedDep);
    }

    function req() {
        const deps = [].slice.call(arguments);
        const cachedDeps = {};
        const resolvedDeps = resolveDeps(deps, cachedDeps);
        if (resolvedDeps.length > 1)
            return resolvedDeps;
        else
            return resolvedDeps[0];
    }

    return { define: define, req: req };
};

const runModule = () => {
    const defineAndRequire = makeDefineAndRequire();
    const define = defineAndRequire.define;
    const req = defineAndRequire.req;

        define("src/kubejs-typings/src/interfaces/copyable", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/fluid-stack", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/ingredient-stack", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/item", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/resource-location", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/item-stack", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/json-element", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/pattern", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/predicate", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/wrapper", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/ingredient", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/events/generic", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/recipe-filter", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/events/general", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/events/block", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/events/client", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/interfaces/component", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/interfaces/compound-tag", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/interfaces/uuid", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/block-container", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/block-pos", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/direction", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/entity-array-list", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/game-profile", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/ray-trace-result", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/interfaces/scheduled-event-callback", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/interfaces/text", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/advancement", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/attached-data", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/level", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/minecraft-server", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/inventory", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/living-entity", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/player", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/scheduled-event", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/server-player", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/server-world", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/aabb", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/block-entity", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/explosion", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/fireworks", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/game-rules", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/player-data", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/script-type", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/world", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/server", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/sound-event", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/classes/entity", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/events/entity", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/kubejs-typings/src/index", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/util", ["require", "exports", "src/kubejs-typings/src/index"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.head = exports.has = exports.find = exports.size = exports.map = exports.filter = exports.fold = exports.forEach = exports.getGlobal = exports.setGlobal = void 0;
        var setGlobal = function (key, value) {
            global[key] = value;
        };
        exports.setGlobal = setGlobal;
        var getGlobal = function (key) {
            var value = global[key];
            if (value === undefined)
                throw new Error("global[".concat(key, "] is undefined"));
            return value;
        };
        exports.getGlobal = getGlobal;
        var forEach = function (iterable, f) {
            var keyedIterable = iterable;
            if (typeof keyedIterable.forEach === 'function') {
                keyedIterable.forEach(function (x, i) { return f(x, i); });
                return;
            }
            else {
                var aux_1 = function (it) {
                    var next = it.next();
                    if (next.done) {
                        return;
                    }
                    var v = next.value;
                    if (f(v[1], v[0]) === true) {
                        return;
                    }
                    aux_1(it);
                };
                var it = iterable.entries();
                aux_1(it);
            }
        };
        exports.forEach = forEach;
        var fold = function (iterable, f, d) {
            var i = 0;
            var done = false;
            var abortedResult = d;
            var abort = function (result) {
                done = true;
                abortedResult = result;
            };
            (0, exports.forEach)(iterable, function (t) {
                d = f(d, t, i++, abort);
                if (done) {
                    d = abortedResult;
                    return true;
                }
            });
            return d;
        };
        exports.fold = fold;
        var filter = function (iterable, predicate) { return (0, exports.fold)(iterable, function (xs, x) {
            if (predicate(x)) {
                return xs.concat([x]);
            }
            return xs;
        }, []); };
        exports.filter = filter;
        var map = function (iterable, mapper) { return (0, exports.fold)(iterable, function (xs, x) { return xs.concat([mapper(x)]); }, []); };
        exports.map = map;
        var size = function (iterable) { return (0, exports.fold)(iterable, function (s, _) { return s + 1; }, 0); };
        exports.size = size;
        var find = function (iterable, predicate) { return (0, exports.fold)(iterable, function (r, x, __, abort) {
            if (predicate(x)) {
                abort(x);
            }
            return r;
        }, undefined); };
        exports.find = find;
        var has = function (iterable, item) { return (0, exports.find)(iterable, function (t) { return t === item; }) !== undefined; };
        exports.has = has;
        var head = function (iterable) { return (0, exports.find)(iterable, function () { return true; }); };
        exports.head = head;
    });
    define("src/unify/unify-config", ["require", "exports", "src/util"], function (require, exports, util_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getUnifyConfig = exports.setUnifyConfig = void 0;
        var GLOBAL_UNIFY_CONFIG = 'unify:config';
        var setUnifyConfig = function (config) {
            (0, util_1.setGlobal)(GLOBAL_UNIFY_CONFIG, config);
        };
        exports.setUnifyConfig = setUnifyConfig;
        var getUnifyConfig = function () { return (0, util_1.getGlobal)(GLOBAL_UNIFY_CONFIG); };
        exports.getUnifyConfig = getUnifyConfig;
    });
    define("src/config", ["require", "exports", "src/unify/unify-config"], function (require, exports, unify_config_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.initializeConfig = exports.config = void 0;
        exports.config = {
            unify: {
                flags: {
                    INVENTORY_UNIFY: true,
                    ITEM_UNIFY: true,
                    RECIPE_UNIFY: true,
                    HIDE_UNIFIED_ITEMS: true,
                },
                priorities: [
                    "minecraft",
                    "alltheores",
                    "mekanism",
                    "thermal",
                    "silents_mechanisms",
                    "silentgems",
                    "chemlib"
                ],
                exclude: [],
                includeTags: [
                    "forge:plates/iron",
                    "forge:gears/iron",
                    "forge:silicon"
                ],
                tagGen: new Map([
                    ['gold', ["gears", "plates"]],
                    ['diamond', ["gears", "plates"]],
                    ['copper', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['tin', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['aluminum', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['lead', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['silver', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['nickel', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['bronze', ["storage_blocks", "ingots", "nuggets", "dusts", "ores", "gears", "plates"]],
                    ['steel', ["storage_blocks", "ingots", "nuggets", "dusts"]],
                    ['platinum', ["storage_blocks", "ingots", "nuggets", "dusts", "ores"]],
                    ['uranium', ["storage_blocks", "ingots", "nuggets", "dusts", "ores"]],
                    ['iridium', ["storage_blocks", "ingots", "nuggets", "dusts", "ores"]],
                    ['zinc', ["storage_blocks", "ingots", "nuggets", "dusts", "ores"]],
                    ['osmium', ["ingots", "ores"]],
                    ['sulfur', ["dusts", "ores"]],
                    ['silicon', ["gems"]],
                ]),
            },
        };
        var initializeConfig = function () {
            (0, unify_config_1.setUnifyConfig)(exports.config.unify);
        };
        exports.initializeConfig = initializeConfig;
    });
    define("src/kubejs-typings/src/classes/item-entity", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("src/unify/util", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.tryTag = void 0;
        var tryTag = function (tag) {
            try {
                return Ingredient.of("#" + tag);
            }
            catch (err) {
                return undefined;
            }
        };
        exports.tryTag = tryTag;
    });
    define("src/unify/tags", ["require", "exports", "src/util", "src/unify/unify-config", "src/unify/util"], function (require, exports, util_2, unify_config_2, util_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.initializeTagItems = exports.getTagItems = exports.setTagItems = exports.getTagsFromConfig = void 0;
        var getTagsFromConfig = function (config) {
            console.log('getTagsFromConfig');
            var tags = new Set();
            console.log('forEach config.includeTags');
            (0, util_2.forEach)(config.includeTags, function (tag) {
                tags.add(tag);
            });
            console.log('forEach config.tagGen');
            (0, util_2.forEach)(config.tagGen, function (types, material) {
                console.log('forEach types');
                (0, util_2.forEach)(types, function (type) {
                    tags.add("forge:".concat(type, "/").concat(material));
                });
            });
            return Array.from(tags);
        };
        exports.getTagsFromConfig = getTagsFromConfig;
        var GLOBAL_UNIFY_TAGITEMS = 'unify:tagitems';
        var setTagItems = function (tagItems) {
            (0, util_2.setGlobal)(GLOBAL_UNIFY_TAGITEMS, tagItems);
        };
        exports.setTagItems = setTagItems;
        var getTagItems = function () { return (0, util_2.getGlobal)(GLOBAL_UNIFY_TAGITEMS); };
        exports.getTagItems = getTagItems;
        var initializeTagItems = function () {
            console.log('initializeTagItems');
            var config = (0, unify_config_2.getUnifyConfig)();
            var tags = (0, exports.getTagsFromConfig)(config);
            // Iterate over tags (they should be loaded)
            var tagItems = new Map();
            console.log('forEach tags');
            (0, util_2.forEach)(tags, function (tag) {
                var ingr = (0, util_3.tryTag)(tag);
                if (ingr) {
                    var allStacks = ingr.getStacks();
                    var stacks_1 = (0, util_2.filter)(allStacks, function (x) { return !(0, util_2.has)(config.exclude, x.getId()); });
                    var foundStack_1;
                    console.log('forEach config.priorities');
                    (0, util_2.forEach)(config.priorities, function (mod) {
                        foundStack_1 = (0, util_2.find)(stacks_1, function (stack) { return stack.getMod() === mod; });
                        if (foundStack_1)
                            return true;
                    });
                    foundStack_1 = foundStack_1 || (0, util_2.head)(allStacks);
                    if (foundStack_1) {
                        tagItems.set(tag, foundStack_1.getId());
                    }
                }
            });
            (0, exports.setTagItems)(tagItems);
        };
        exports.initializeTagItems = initializeTagItems;
    });
    define("src/unify/server-init", ["require", "exports", "src/util", "src/unify/tags", "src/unify/unify-config", "src/unify/util"], function (require, exports, util_4, tags_1, unify_config_3, util_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.initializeUnifyServer = void 0;
        var initializeUnifyServer = function (providedConfig) {
            var config = providedConfig || (0, unify_config_3.getUnifyConfig)();
            var tags = (0, tags_1.getTagsFromConfig)(config);
            // Replace input and output of recipes (and iterate over tags!)
            onEvent("recipes", function (event) {
                console.log('onEvent recipes');
                console.log('Unifying recipes for tags:');
                console.log(tags);
                // Update tags
                (0, tags_1.initializeTagItems)();
                // Unify the rest
                if (config.flags.RECIPE_UNIFY) {
                    var tagItems_1 = (0, tags_1.getTagItems)();
                    console.log('forEach tags');
                    (0, util_4.forEach)(tags, function (tag) {
                        var ingr = (0, util_5.tryTag)(tag);
                        if (ingr) {
                            var stacks = (0, util_4.filter)(ingr.getStacks(), function (stack) { return (0, util_4.has)(config.exclude, stack.getId()); });
                            var oItem_1 = tagItems_1.get(tag);
                            console.log('forEach stacks');
                            (0, util_4.forEach)(stacks, function (iItem) {
                                var stackIngr = Ingredient.of(iItem.getId());
                                event.replaceInput({}, stackIngr, Ingredient.of("#" + tag));
                                if (oItem_1) {
                                    event.replaceOutput({}, stackIngr, Ingredient.of(oItem_1));
                                }
                            });
                        }
                    });
                }
            });
            // Handle inventory change (to check for unificaiton)
            // Unfortunately it gets called twice due to setting the inventory.
            onEvent("player.inventory.changed", function (event) {
                console.log('onEvent player.inventory.changed');
                if (config.flags.INVENTORY_UNIFY) {
                    // Get held item
                    var heldItem_1 = event.getItem();
                    var itemId_1 = heldItem_1.getId();
                    // Check if item is excluded
                    if ((0, util_4.has)(config.exclude, itemId_1))
                        return;
                    var tagItems_2 = (0, tags_1.getTagItems)();
                    // Check for every tag in the list
                    console.log('forEach tags');
                    (0, util_4.forEach)(tags, function (tag) {
                        var ingr = (0, util_5.tryTag)(tag);
                        if (ingr && ingr.test(heldItem_1)) {
                            // If item is in tag, determine if it needs to be changed
                            var tItem = tagItems_2.get(tag);
                            if (tItem && tItem != itemId_1) {
                                // Fix slot number
                                var slot = event.getSlot();
                                if (slot <= 5)
                                    slot += 36;
                                else if (slot == 45)
                                    slot = 40;
                                else if (slot >= 36)
                                    slot -= 36;
                                var newItem = Ingredient.of(tItem).getFirst().withCount(heldItem_1.getCount());
                                // Update item
                                event.getEntity().getInventory().set(slot, newItem);
                            }
                            return true;
                        }
                    });
                }
            });
            // Items on ground
            onEvent("entity.spawned", function (event) {
                console.log('onEvent entity.spawned');
                if (config.flags.ITEM_UNIFY) {
                    var entity = event.getEntity();
                    if (entity.getType() == "minecraft:item") {
                        var itemEntity_1 = entity;
                        var gItem_1 = itemEntity_1.getItem();
                        var itemId_2 = gItem_1.getId();
                        // Check if item is excluded
                        if ((0, util_4.has)(config.exclude, itemId_2))
                            return;
                        var tagItems_3 = (0, tags_1.getTagItems)();
                        // Check for every tag in the list
                        console.log('forEach tags');
                        (0, util_4.forEach)(tags, function (tag) {
                            var ingr = (0, util_5.tryTag)(tag);
                            if (ingr && ingr.test(gItem_1)) {
                                // If item is in tag, determine if it needs to be changed
                                var tItem = tagItems_3.get(tag);
                                if (tItem && tItem != itemId_2) {
                                    var newItem = Ingredient.of(tItem).getFirst().withCount(gItem_1.getCount());
                                    itemEntity_1.setItem(newItem);
                                }
                                return true;
                            }
                        });
                    }
                }
            });
        };
        exports.initializeUnifyServer = initializeUnifyServer;
    });
    define("src/server_scripts/index", ["require", "exports", "src/config", "src/unify/server-init"], function (require, exports, config_1, server_init_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        settings.logAddedRecipes = true;
        settings.logRemovedRecipes = true;
        settings.logSkippedRecipes = false;
        settings.logErroringRecipes = true;
        (0, config_1.initializeConfig)();
        (0, server_init_1.initializeUnifyServer)();
    });


    const resolver = req('src/server_scripts/index');
    resolver();
};

runModule();
