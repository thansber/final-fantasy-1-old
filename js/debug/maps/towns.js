define(
["jquery", "../../map-builder", "../../constants/map", "../../data/town-maps"], 
function($, MapBuilder, MapConstants, TownMapData) {
  
  $(document).ready(function() {
    MapBuilder.init();
    TownMapData.init();
    
    var $towns = $("#selector");
    var townMaps = [MapConstants.CONERIA, MapConstants.PRAVOKA, MapConstants.ELFLAND, MapConstants.MELMOND, 
                    MapConstants.CRESCENT_LAKE, MapConstants.ONRAC, MapConstants.GAIA, MapConstants.LEFEIN];
    for (var t in townMaps) {
      $("<option/>").val(townMaps[t]).html(townMaps[t]).appendTo($towns);
    }
    
    $towns.val("Lefein").change();
  });
});