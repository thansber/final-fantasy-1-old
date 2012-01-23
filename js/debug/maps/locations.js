define(
["jquery", "../../map-builder", "../../constants/map", 
 "../../data/castle-maps", "../../data/cave-maps", "../../data/temple-of-fiends-maps",
 "../../data/marsh-cave-maps", "../../data/earth-cave-maps"], 
function($, MapBuilder, MapConstants, 
         CastleMapData, CaveMapData, TempleOfFiendsMapData, 
         MarshCaveMapData, EarthCaveMapData) {
  
  $(document).ready(function() {
    MapBuilder.init();
    CastleMapData.init();
    CaveMapData.init();
    TempleOfFiendsMapData.init();
    MarshCaveMapData.init();
    EarthCaveMapData.init();
    
    var $selector = $("#selector");
    var maps = [MapConstants.CONERIA_CASTLE, MapConstants.CONERIA_CASTLE_2F, MapConstants.ELF_CASTLE, MapConstants.ASTOS_CASTLE,   
                MapConstants.MATOYAS_CAVE, MapConstants.DWARF_CAVE, MapConstants.TITANS_TUNNEL, MapConstants.SARDAS_CAVE,
                MapConstants.TEMPLE_OF_FIENDS, 
                MapConstants.MARSH_CAVE_B1, MapConstants.MARSH_CAVE_B2A, MapConstants.MARSH_CAVE_B2B, MapConstants.MARSH_CAVE_B3,
                MapConstants.EARTH_CAVE_B1, MapConstants.EARTH_CAVE_B2, MapConstants.EARTH_CAVE_B3, MapConstants.EARTH_CAVE_B4, MapConstants.EARTH_CAVE_B5];
    for (var m in maps) {
      $("<option/>").val(maps[m]).html(maps[m]).appendTo($selector);
    }
    
    $selector.val(MapConstants.EARTH_CAVE_B1).change();
  });
});