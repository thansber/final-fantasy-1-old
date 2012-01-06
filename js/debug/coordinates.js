define( 
/* DebugCoords */
["jquery", "events", "map-config", "map-coords-absolute", "map-coords-converter", "map-coords-tile", "../constants/map"], 
function($, Event, MapConfig, MapCoordsAbsolute, MapCoordsConverter, MapCoordsTile, MapConstants) {
  
  return (function() {

    var event = function($target) {
      if ($target.is(".go")) { moveParty($target); }
      else if ($target.is(".absolute")) { showAbsolute($target); }
    };
    
    var moveParty = function($target, coords) {
      Event.transmit(Event.Types.JumpTo, MapConstants.WORLD_MAP, parseTileCoords($target));
    };
    
    var parseTileCoords = function($target) {
      var $container = $target.closest("div");
      var tileCoords = MapCoordsTile.create({
        tilesetY : parseInt($("input.tileset.y", $container).val()) 
       ,tilesetX : parseInt($("input.tileset.x", $container).val())
       ,tileY : parseInt($("input.tile.y", $container).val())
       ,tileX : parseInt($("input.tile.x", $container).val())
      });
      return MapCoordsConverter.tileToAbsolute(tileCoords, MapConfig.lookup(MapConstants.WORLD_MAP));
    };
   
    var showAbsolute = function($target) {
      var $absoluteContainer = $target.closest(".container").find(".absolute.container");
      var coords = parseTileCoords($target);
      $(".absolute.y", $absoluteContainer).html(coords.y);
      $(".absolute.x", $absoluteContainer).html(coords.x);
      $absoluteContainer.removeClass("hidden");
    };
    
    return {
      event: event
    };
  })();
});