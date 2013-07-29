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

    MapTransition.from(MapConstants.WORLD_MAP, {y:123, x:129}).to(MapConstants.TEMPLE_OF_FIENDS, {y:30, x:20});
    MapTransition.from(MapConstants.WORLD_MAP, {y:123, x:130}).to(MapConstants.TEMPLE_OF_FIENDS, {y:30, x:20});
    MapTransition.from(MapConstants.TEMPLE_OF_FIENDS, {y:30, x:20}).to(MapConstants.WORLD_MAP, {y:123, x:130});

    MapTransition.from(MapConstants.WORLD_MAP, {y:159, x:152}).to(MapConstants.CONERIA_CASTLE, {y:30, x:14});
    MapTransition.from(MapConstants.WORLD_MAP, {y:159, x:153}).to(MapConstants.CONERIA_CASTLE, {y:30, x:14});
    MapTransition.from(MapConstants.CONERIA_CASTLE, {y:13, x:14}).to(MapConstants.CONERIA_CASTLE_2F, {y:16, x:12}).bidirectional();


    // Towns -> world map
    MapTransition.from(MapConstants.CONERIA).to(MapConstants.WORLD_MAP, {y:162, x:153});
    MapTransition.from(MapConstants.PRAVOKA).to(MapConstants.WORLD_MAP, {y:150, x:210});
    MapTransition.from(MapConstants.ELFLAND).to(MapConstants.WORLD_MAP, {y:222, x:136});
    MapTransition.from(MapConstants.MELMOND).to(MapConstants.WORLD_MAP, {y:159, x:82});
    MapTransition.from(MapConstants.CRESCENT_LAKE).to(MapConstants.WORLD_MAP, {y:217, x:219});
    MapTransition.from(MapConstants.ONRAC).to(MapConstants.WORLD_MAP, {y:59, x:61});
    MapTransition.from(MapConstants.GAIA).to(MapConstants.WORLD_MAP, {y:29, x:221});
    MapTransition.from(MapConstants.LEFEIN).to(MapConstants.WORLD_MAP, {y:100, x:235});

  };

  return {
    init : init
  };
});