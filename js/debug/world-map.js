require(
["jquery", "maps/map", "maps/artist", "constants/map", "resources", "data/maps/world"], 
function($, Map, MapArtist, MapConstants, Resources, WorldMap) {

  Resources.init();
  MapArtist.init();
  WorldMap.init();
  
  var map = Map.lookup(MapConstants.WORLD_MAP);
  
  MapArtist.resize(map.cols, map.rows, MapConstants.TILE_SIZE);
  var img = map.resource.image;
  var mapping = map.mapping;
  
  for (var y = 0; y < map.rows; y++) {
    for (var x = 0; x < map.cols; x++) {
      var tile = map.getTile(y, x);
      if (tile) {
        MapArtist.drawTile(img, {x:tile.x, y:tile.y}, {x:x, y:y});
      }
    }
  }
  
});