define( 
/* MapTransitionData */
["map-transition", "constants/map"], 
function(MapTransition, MapConstants) {
  
  var init = function() {
    // Start game
    MapTransition.create("start", MapConstants.WORLD_MAP, {y:0, x:0}, {y:165, x:153});
    
    // World map -> towns
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:160, x:151});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:161, x:151});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:162, x:151});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:160, x:154});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:161, x:154});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CONERIA, {y:162, x:154});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.PRAVOKA, {y:150, x:209});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.PRAVOKA, {y:150, x:211});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.PRAVOKA, {y:149, x:210});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ELFLAND, {y:221, x:134});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ELFLAND, {y:222, x:134});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ELFLAND, {y:221, x:137});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ELFLAND, {y:222, x:137});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.MELMOND, {y:159, x:81});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.MELMOND, {y:160, x:81}); 
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.MELMOND, {y:160, x:82}); 
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CRESCENT_LAKE, {y:216, x:219});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CRESCENT_LAKE, {y:216, x:220});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CRESCENT_LAKE, {y:217, x:218});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CRESCENT_LAKE, {y:217, x:220});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.CRESCENT_LAKE, {y:218, x:218});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ONRAC, {y:57, x:61});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ONRAC, {y:57, x:62});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ONRAC, {y:58, x:61});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.ONRAC, {y:58, x:62});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.GAIA, {y:28, x:221});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.GAIA, {y:28, x:222});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.LEFEIN, {y:98, x:235});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.LEFEIN, {y:99, x:234});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.LEFEIN, {y:99, x:235});
    MapTransition.create(MapConstants.WORLD_MAP, MapConstants.LEFEIN, {y:99, x:236});
    
    // Towns -> world map
    MapTransition.create(MapConstants.CONERIA, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.PRAVOKA, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.ELFLAND, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.MELMOND, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.CRESCENT_LAKE, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.ONRAC, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.GAIA, MapConstants.WORLD_MAP);
    MapTransition.create(MapConstants.LEFEIN, MapConstants.WORLD_MAP);
  };
  
  return {
    init : init
  };
});