var MapBuilder = (function() {
  
  var build = function(config, $container, htmlCallback) {
    // Start at 7 temporarily while debugging lower half to avoid loading the entire map
    for (var y = 0; y < WorldMap.Config.maxTilesetY(); y++) {
      var $tilesetRow = $("<div/>").addClass("tileset row");
      for (var x = 0; x < WorldMap.Config.maxTilesetX(); x++) {
        var $tileset = $("<div/>").addClass("tileset");
        if (htmlCallback) {
          $tileset.append(htmlCallback.apply(this, [$tileset, y, x]));
        }
        $tilesetRow.append($tileset);
      }
      $container.append($tilesetRow);
    }
  };
  
  var buildTileset = function($container, tilesetY, tilesetX) {
    for (var y = 0; y < Map.SIZE; y++) {
      var $row = $("<div/>").addClass("row");
      for (var x = 0; x < Map.SIZE; x++) {
        var coords = new Map.Coords(tilesetY, tilesetX, y, x);
        var tileClasses = WorldMap.Config.getTileClasses(coords);
        var $tile = $("<p/>").addClass("tile").addClass(tileClasses).html("&nbsp;");
        $row.append($tile);
      }
      $container.append($row);
    }
  };
  
  return {
    build: build
   ,buildTileset: buildTileset
  };
  
})();