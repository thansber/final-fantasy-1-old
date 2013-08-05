define(/* DebugMaps */
["jquery", "./util", "maps/map", "maps/artist", "../constants/map"],
function($, DebugUtil, Map, MapArtist, MapConstants) {

  var $debug = null;
  var inside = false;

  var jumpToLocation = function() {
    var mapId = $debug.find(".selector").val();
    var map = Map.lookup(mapId);

    MapArtist.resize(map.cols, map.rows, MapConstants.TILE_SIZE);
    var ctx = MapArtist.context();
    var img = map.resource.image;
    var mapping = map.mapping;

    for (var y = 0; y < map.rows; y++) {
      for (var x = 0; x < map.cols; x++) {
        var tile = map.getTile(y, x);
        if (tile) {
          var sourceX = inside && tile.insideCoords ? tile.insideCoords.x : tile.x;
          var sourceY = inside && tile.insideCoords ? tile.insideCoords.y : tile.y;
          MapArtist.drawTile(img, {x:sourceX, y:sourceY}, {x:x, y:y});
        }
      }
    }
  };

  return {
    init: function() {
      $debug = $("#debug section.full-maps");
      DebugUtil.initLocationSelector($debug.find(".row"));
    },

    event: function($target) {
      inside = $debug.find(".inside").is(":checked");
      $("#map").css({overflow:"visible"});
      jumpToLocation();
    }
  };
});