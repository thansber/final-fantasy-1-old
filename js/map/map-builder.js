var MapBuilder = (function() {
  
  this.build = function(config, $container, htmlCallback) {
    var markup = [];
    var m = 0;
    for (var y = 0; y < config.maxTilesetY(); y++) {
      markup[m++] = "<div class=\"tileset row\">";
      for (var x = 0; x < config.maxTilesetX(); x++) {
        markup[m++] = "<div class=\"tileset\">";
        for (var j = 0; j < Map.TILES_PER_AREA; j++) {
          markup[m++] = "<div class=\"row\">";
          for (var i = 0; i < Map.TILES_PER_AREA; i++) {
            var tileClasses = config.getTileClasses(new Map.Coords(y, x, j, i));
            markup[m++] = "<p class=\"tile " + tileClasses + "\">&nbsp;</p>";
          }
          markup[m++] = "</div>";
        }
        markup[m++] = "</div>";
      }
      markup[m++] = "</div>";
    }
    
    $container.append($(markup.join("")));
  };
  
  return this;
  
}).call({});