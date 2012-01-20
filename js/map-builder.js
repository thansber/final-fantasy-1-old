define(["jquery", "map-config", "map-coords-tile"], function($, MapConfig, MapCoordsTile) {
  
  var build = function(config, $container) {
    var markup = [];
    var m = 0;
    for (var y = 0; y < config.maxTilesetY(); y++) {
      markup[m++] = "<div class=\"tileset row\">";
      for (var x = 0; x < config.maxTilesetX(); x++) {
        markup[m++] = "<div class=\"tileset\">";
        for (var j = 0; j < config.height; j++) {
          markup[m++] = "<div class=\"row\">";
          for (var i = 0; i < config.width; i++) {
            var tileClasses = config.getTileClasses(MapCoordsTile.create({tilesetY:y, tilesetX:x, tileY:j, tileX:i}));
            markup[m++] = "<p class=\"tile " + tileClasses + "\">&nbsp;</p>";
          }
          markup[m++] = "</div>";
        }
        markup[m++] = "</div>";
      }
      markup[m++] = "</div>";
    }
    
    $container
      .closest("#map").removeClass().addClass(config.id).end()
      .append($(markup.join("")));
  };
  
  return {
    build: build,
    
    init : function() {
      $("#selector").change(function() {
        var selectedValue = $(this).val();
        var $container = $("#map .map");
        $container.empty();
        
        if (selectedValue.length == 0) {
          return;
        }
        
        build(MapConfig.lookup(selectedValue), $container);
      });
      
      $("#indoor").change(function() {
        $("#map").toggleClass("indoor", this.checked);
      });
    }
  };
});