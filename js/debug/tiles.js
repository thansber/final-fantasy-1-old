define( 
/* DebugTiles */
["jquery", "./util", "maps/map", "maps/artist"], 
function($, DebugHelper, Map, MapArtist) {

  var $debug = null;
  var inside = false;
  
  var drawTiles = function(map) {
    var i = 0;
    var ctx = MapArtist.context(); 
    for (var m in map.mapping) {
      var tile = map.mapping[m];
      var x = (inside && tile.inside ? tile.inside.x : tile.x);
      var y = (inside && tile.inside ? tile.inside.y : tile.y);
      ctx.fillText(tile.desc + " (" + m + ")", 40, (i * 24) + 24);
      ctx.drawImage(map.resource.image, 16 * x, 16 * y, 16, 16, 4, (i * 24) + 12, 16, 16);
      i++;
    }
  };
  
  var jumpToLocation = function() {
    var mapId = $debug.find(".selector").val();
    var map = Map.lookup(mapId);
    var mappingSize = 0;
    for (var m in map.mapping) {
      mappingSize++;
    }
    
    MapArtist.resize(17, mappingSize + 3, 24);
    var ctx = MapArtist.context(); 
    ctx.fillStyle = "white";
    ctx.font = "14pt Arial";
    drawTiles(map);
  };
    
  return {
    init : function() {
      $debug = $("#debug section.tiles");
      DebugHelper.initLocationSelector($debug.find(".row"));
    },
    
    event : function($target) {
      inside = $debug.find(".inside").is(":checked");
      jumpToLocation(); 
    }
  };
});