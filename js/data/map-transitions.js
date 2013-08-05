define(
/* MapTransitionData */
["maps/map", "maps/transition", "constants/map"],
function(Map, MapTransition, MapConstants) {

  var init = function() {
    // Start game
    MapTransition.from(MapConstants.WORLD_MAP, {y:-1, x:-1}).to(MapConstants.WORLD_MAP, {y:165, x:153});

    // World map -> towns
    MapTransition.from(MapConstants.WORLD_MAP, {y:160, x:151}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:161, x:151}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:162, x:151}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:160, x:154}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:161, x:154}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:162, x:154}).to(MapConstants.CONERIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:150, x:209}).to(MapConstants.PRAVOKA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:150, x:211}).to(MapConstants.PRAVOKA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:149, x:210}).to(MapConstants.PRAVOKA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:221, x:134}).to(MapConstants.ELFLAND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:222, x:134}).to(MapConstants.ELFLAND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:221, x:137}).to(MapConstants.ELFLAND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:222, x:137}).to(MapConstants.ELFLAND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:159, x:81}).to(MapConstants.MELMOND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:160, x:81}).to(MapConstants.MELMOND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:160, x:82}).to(MapConstants.MELMOND);
    MapTransition.from(MapConstants.WORLD_MAP, {y:216, x:219}).to(MapConstants.CRESCENT_LAKE);
    MapTransition.from(MapConstants.WORLD_MAP, {y:216, x:220}).to(MapConstants.CRESCENT_LAKE);
    MapTransition.from(MapConstants.WORLD_MAP, {y:217, x:218}).to(MapConstants.CRESCENT_LAKE);
    MapTransition.from(MapConstants.WORLD_MAP, {y:217, x:220}).to(MapConstants.CRESCENT_LAKE);
    MapTransition.from(MapConstants.WORLD_MAP, {y:218, x:218}).to(MapConstants.CRESCENT_LAKE);
    MapTransition.from(MapConstants.WORLD_MAP, {y:57, x:61}).to(MapConstants.ONRAC);
    MapTransition.from(MapConstants.WORLD_MAP, {y:57, x:62}).to(MapConstants.ONRAC);
    MapTransition.from(MapConstants.WORLD_MAP, {y:58, x:61}).to(MapConstants.ONRAC);
    MapTransition.from(MapConstants.WORLD_MAP, {y:58, x:62}).to(MapConstants.ONRAC);
    MapTransition.from(MapConstants.WORLD_MAP, {y:27, x:222}).to(MapConstants.GAIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:27, x:223}).to(MapConstants.GAIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:28, x:221}).to(MapConstants.GAIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:28, x:222}).to(MapConstants.GAIA);
    MapTransition.from(MapConstants.WORLD_MAP, {y:98, x:235}).to(MapConstants.LEFEIN);
    MapTransition.from(MapConstants.WORLD_MAP, {y:99, x:234}).to(MapConstants.LEFEIN);
    MapTransition.from(MapConstants.WORLD_MAP, {y:99, x:235}).to(MapConstants.LEFEIN);
    MapTransition.from(MapConstants.WORLD_MAP, {y:99, x:236}).to(MapConstants.LEFEIN);

        // Towns -> world map
    MapTransition.from(MapConstants.CONERIA).to(MapConstants.WORLD_MAP, {y:162, x:153});
    MapTransition.from(MapConstants.PRAVOKA).to(MapConstants.WORLD_MAP, {y:150, x:210});
    MapTransition.from(MapConstants.ELFLAND).to(MapConstants.WORLD_MAP, {y:222, x:136});
    MapTransition.from(MapConstants.MELMOND).to(MapConstants.WORLD_MAP, {y:159, x:82});
    MapTransition.from(MapConstants.CRESCENT_LAKE).to(MapConstants.WORLD_MAP, {y:217, x:219});
    MapTransition.from(MapConstants.ONRAC).to(MapConstants.WORLD_MAP, {y:59, x:61});
    MapTransition.from(MapConstants.GAIA).to(MapConstants.WORLD_MAP, {y:29, x:221});
    MapTransition.from(MapConstants.LEFEIN).to(MapConstants.WORLD_MAP, {y:100, x:235});

    // Castle transitions
    MapTransition.from(MapConstants.WORLD_MAP, {y:159, x:152}).to(MapConstants.CONERIA_CASTLE, {y:30, x:14});
    MapTransition.from(MapConstants.WORLD_MAP, {y:159, x:153}).to(MapConstants.CONERIA_CASTLE, {y:30, x:14});
    MapTransition.from(MapConstants.CONERIA_CASTLE, {y:13, x:14}).to(MapConstants.CONERIA_CASTLE_2F, {y:16, x:12}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:221, x:135}).to(MapConstants.ELF_CASTLE, {y:32, x:16});
    MapTransition.from(MapConstants.WORLD_MAP, {y:221, x:136}).to(MapConstants.ELF_CASTLE, {y:32, x:16});
    MapTransition.from(MapConstants.WORLD_MAP, {y:186, x:102}).to(MapConstants.ASTOS_CASTLE, {y:24, x:21});
    MapTransition.from(MapConstants.WORLD_MAP, {y:186, x:103}).to(MapConstants.ASTOS_CASTLE, {y:24, x:21});
    MapTransition.from(MapConstants.WORLD_MAP, {y:45, x:129}).to(MapConstants.CASTLE_ORDEALS_1F, {y:24, x:12});
    MapTransition.from(MapConstants.WORLD_MAP, {y:45, x:130}).to(MapConstants.CASTLE_ORDEALS_1F, {y:24, x:12});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_1F, {y:2, x:2}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:12});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:15, x:16}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:14});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:8, x:6}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:14});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:13, x:20}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:14});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:9, x:15}).to(MapConstants.CASTLE_ORDEALS_2F, {y:9, x:12});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:1, x:1}).to(MapConstants.CASTLE_ORDEALS_2F, {y:9, x:12});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:8, x:8}).to(MapConstants.CASTLE_ORDEALS_2F, {y:16, x:12});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:10, x:8}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:10});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:20, x:4}).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:10});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:15, x:9}).to(MapConstants.CASTLE_ORDEALS_2F, {y:20, x:1});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:11, x:20}).to(MapConstants.CASTLE_ORDEALS_2F, {y:20, x:1});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:22, x:4}).to(MapConstants.CASTLE_ORDEALS_2F, {y:4, x:6});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:18, x:4}).to(MapConstants.CASTLE_ORDEALS_2F, {y:4, x:4});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:2, x:3}).to(MapConstants.CASTLE_ORDEALS_2F, {y:4, x:8});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:16, x:18}).to(MapConstants.CASTLE_ORDEALS_2F, {y:22, x:23});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_2F, {y:20, x:20}).to(MapConstants.CASTLE_ORDEALS_3F, {y:22, x:22});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_3F, {y:17, x:16}).to(MapConstants.CASTLE_ORDEALS_1F, {y:2, x:2});
    MapTransition.from(MapConstants.CASTLE_ORDEALS_1F).to(MapConstants.CASTLE_ORDEALS_2F, {y:12, x:12});

    // Cave transitions
    MapTransition.from(MapConstants.WORLD_MAP, {y:117, x:168}).to(MapConstants.MATOYAS_CAVE, {y:11, x:15}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:155, x:100}).to(MapConstants.DWARF_CAVE, {y:11, x:22}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:190, x:30}).to(MapConstants.SARDAS_CAVE, {y:13, x:18}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:174, x:42}).to(MapConstants.TITANS_TUNNEL, {y:14, x:11}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:175, x:30}).to(MapConstants.TITANS_TUNNEL, {y:3, x:5}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:29, x:54}).to(MapConstants.WATERFALL_CAVE, {y:56, x:57}).bidirectional();

    // Temple of Fiends
    MapTransition.from(MapConstants.WORLD_MAP, {y:123, x:129}).to(MapConstants.TEMPLE_OF_FIENDS, {y:30, x:20});
    MapTransition.from(MapConstants.WORLD_MAP, {y:123, x:130}).to(MapConstants.TEMPLE_OF_FIENDS, {y:30, x:20}).bidirectional();

    // Cardia Islands
    MapTransition.from(MapConstants.WORLD_MAP, {y:49, x:79}).to(MapConstants.CARDIA_ISLANDS_MAIN, {y:10, x:7}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:48, x:92}).to(MapConstants.CARDIA_ISLANDS_MAIN, {y:13, x:25}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:58, x:93}).to(MapConstants.CARDIA_ISLANDS_MAIN, {y:31, x:14}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:59, x:105}).to(MapConstants.CARDIA_ISLANDS_MAIN, {y:24, x:38}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:66, x:116}).to(MapConstants.CARDIA_ISLANDS_MAIN, {y:50, x:53}).bidirectional();
    MapTransition.from(MapConstants.WORLD_MAP, {y:51, x:96}).to(MapConstants.CARDIA_ISLANDS_BAHAMUT, {y:3, x:2}).bidirectional();
    MapTransition.from(MapConstants.CARDIA_ISLANDS_BAHAMUT, {y:53, x:2}).to(MapConstants.CARDIA_ISLANDS_BAHAMUT_2F, {y:55, x:7}).bidirectional();

    // Marsh Cave
    MapTransition.from(MapConstants.WORLD_MAP, {y:236, x:102}).to(MapConstants.MARSH_CAVE_B1, {y:26, x:21}).bidirectional();
    MapTransition.from(MapConstants.MARSH_CAVE_B1, {y:6, x:1}).to(MapConstants.MARSH_CAVE_B2A, {y:14, x:18}).bidirectional();
    MapTransition.from(MapConstants.MARSH_CAVE_B1, {y:51, x:32}).to(MapConstants.MARSH_CAVE_B2B, {y:8, x:27}).bidirectional();
    MapTransition.from(MapConstants.MARSH_CAVE_B2B, {y:29, x:51}).to(MapConstants.MARSH_CAVE_B3, {y:4, x:4}).bidirectional();

    // Earth Cave
    MapTransition.from(MapConstants.WORLD_MAP, {y:186, x:65}).to(MapConstants.EARTH_CAVE_B1, {y:14, x:19}).bidirectional();
    MapTransition.from(MapConstants.EARTH_CAVE_B1, {y:26, x:42}).to(MapConstants.EARTH_CAVE_B2, {y:1, x:2}).bidirectional();
    MapTransition.from(MapConstants.EARTH_CAVE_B2, {y:27, x:33}).to(MapConstants.EARTH_CAVE_B3, {y:37, x:19}).bidirectional();
    MapTransition.from(MapConstants.EARTH_CAVE_B3, {y:19, x:18}).to(MapConstants.EARTH_CAVE_B4, {y:25, x:53}).bidirectional();
    MapTransition.from(MapConstants.EARTH_CAVE_B4, {y:1, x:1}).to(MapConstants.EARTH_CAVE_B5, {y:31, x:17}).bidirectional();

    // Gurgu Volcano
    MapTransition.from(MapConstants.WORLD_MAP, {y:203, x:188}).to(MapConstants.GURGU_VOLCANO_B1, {y:14, x:27});
    MapTransition.from(MapConstants.WORLD_MAP, {y:203, x:189}).to(MapConstants.GURGU_VOLCANO_B1, {y:14, x:27});
    MapTransition.from(MapConstants.WORLD_MAP, {y:204, x:188}).to(MapConstants.GURGU_VOLCANO_B1, {y:14, x:27});
    MapTransition.from(MapConstants.WORLD_MAP, {y:204, x:189}).to(MapConstants.GURGU_VOLCANO_B1, {y:14, x:27}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B1, {y:7, x:12}).to(MapConstants.GURGU_VOLCANO_B2, {y:30, x:30}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B2, {y:30, x:1}).to(MapConstants.GURGU_VOLCANO_B3A, {y:2, x:18}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B3A, {y:7, x:49}).to(MapConstants.GURGU_VOLCANO_B4A, {y:3, x:3}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B4A, {y:26, x:23}).to(MapConstants.GURGU_VOLCANO_B3B, {y:6, x:46}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B3B, {y:27, x:5}).to(MapConstants.GURGU_VOLCANO_B4B, {y:6, x:35}).bidirectional();
    MapTransition.from(MapConstants.GURGU_VOLCANO_B4B, {y:46, x:40}).to(MapConstants.GURGU_VOLCANO_B5, {y:27, x:28}).bidirectional();

    // Ice Cave
    MapTransition.from(MapConstants.WORLD_MAP, {y:183, x:197}).to(MapConstants.ICE_CAVE_B1, {y:1, x:7}).bidirectional();
    MapTransition.from(MapConstants.ICE_CAVE_B1, {y:11, x:30}).to(MapConstants.ICE_CAVE_B2A, {y:2, x:30}).bidirectional();
    MapTransition.from(MapConstants.ICE_CAVE_B1, {y:22, x:21}).to(MapConstants.ICE_CAVE_B2B, {y:11, x:11}); // hole to floater/eye
    MapTransition.from(MapConstants.ICE_CAVE_B1, {y:18, x:25}).to(MapConstants.WORLD_MAP, {y:183, x:197});
    MapTransition.from(MapConstants.ICE_CAVE_B2A, {y:30, x:1}).to(MapConstants.ICE_CAVE_B3A, {y:4, x:5}).bidirectional();
    MapTransition.from(MapConstants.ICE_CAVE_B3A, {y:2, x:3}).to(MapConstants.ICE_CAVE_B2B, {y:5, x:15}).bidirectional();
    // holes on B2
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:7, x:11}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:7, x:12}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:8, x:8}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:8, x:10}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:8, x:13}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:9, x:9}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:9, x:11}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:10, x:8}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:10, x:12}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:10, x:13}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:10, x:14}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:11, x:9}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:11, x:10}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:11, x:12}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B2B, {y:12, x:11}).to(MapConstants.ICE_CAVE_B3B, {y:3, x:11});
    MapTransition.from(MapConstants.ICE_CAVE_B3B, {y:30, x:31}).to(MapConstants.ICE_CAVE_B1, {y:20, x:6}).bidirectional();

    // Sea Shrine
    MapTransition.from(MapConstants.ONRAC, {y:30, x:46}).to(MapConstants.SEA_SHRINE_B3, {y:42, x:21}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B3, {y:7, x:31}).to(MapConstants.SEA_SHRINE_B2, {y:11, x:43}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B2, {y:51, x:41}).to(MapConstants.SEA_SHRINE_B1, {y:27, x:28}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B3, {y:2, x:2}).to(MapConstants.SEA_SHRINE_B4B, {y:44, x:42}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B4B, {y:1, x:44}).to(MapConstants.SEA_SHRINE_B3A, {y:3, x:2}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B3A, {y:1, x:4}).to(MapConstants.SEA_SHRINE_B2A, {y:2, x:3}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B2A, {y:10, x:10}).to(MapConstants.SEA_SHRINE_B3B, {y:8, x:2}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B3B, {y:27, x:1}).to(MapConstants.SEA_SHRINE_B4A, {y:19, x:42}).bidirectional();
    MapTransition.from(MapConstants.SEA_SHRINE_B4A, {y:2, x:15}).to(MapConstants.SEA_SHRINE_B5, {y:45, x:49}).bidirectional();

    // Mirage Tower
    MapTransition.from(MapConstants.WORLD_MAP, {y:58, x:194}).to(MapConstants.MIRAGE_TOWER_1F, {y:31, x:17}).bidirectional();
    MapTransition.from(MapConstants.MIRAGE_TOWER_1F, {y:31, x:14}).to(MapConstants.MIRAGE_TOWER_2F, {y:31, x:16}).bidirectional();
    MapTransition.from(MapConstants.MIRAGE_TOWER_2F, {y:3, x:16}).to(MapConstants.MIRAGE_TOWER_3F, {y:1, x:8}).bidirectional();
    MapTransition.from(MapConstants.MIRAGE_TOWER_3F, {y:8, x:8}).to(MapConstants.FLOATING_CASTLE_1F, {y:21, x:19}).bidirectional();

    // Floating Castle
    MapTransition.from(MapConstants.FLOATING_CASTLE_1F, {y:4, x:19}).to(MapConstants.FLOATING_CASTLE_2F, {y:4, x:19}).bidirectional();
    MapTransition.from(MapConstants.FLOATING_CASTLE_2F, {y:38, x:19}).to(MapConstants.FLOATING_CASTLE_3F, {y:22, x:23}).bidirectional();
    MapTransition.from(MapConstants.FLOATING_CASTLE_3F, {y:27, x:8}).to(MapConstants.FLOATING_CASTLE_4F, {y:55, x:7}).bidirectional();
    MapTransition.from(MapConstants.FLOATING_CASTLE_4F, {y:23, x:40}).to(MapConstants.FLOATING_CASTLE_5F, {y:54, x:7}).bidirectional();

    // Temple of Fiends 2
  };

  return {
    init : init
  };
});