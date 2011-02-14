var Debug = (function() {
  
  var $debug = null;
  
  var WorldMapHelper = (function() {
    var selectedTilesetX = -1, selectedTilesetY = -1;
    var $tilesets = null;
    
    var currentTileset = function() {
      return WorldMap.Config.getTileset(selectedTilesetY, selectedTilesetX);
    };
    
    var event = function($target) {
      if ($target.is("#toggleMapGridlines")) { toggleGridlines($target); }
      if ($target.is(".tile")) { highlightTile($target); }
      if ($target.closest(".tilesets").length > 0) {
        load($target.is(".tileset") ? $target : $target.closest(".tileset")); 
      };
    };
    
    var highlightTile = function($tile) {
      var $section = $tile.closest("section");
      var $border = $("img.border", $section);
      $border.removeClass("hidden");
      var tileOffset = $tile.offset();
      var borderOffset = {top:tileOffset.top - 2, left:tileOffset.left - 2};
      $border.offset(borderOffset);
      
      var tilePos = tileLookup($tile);
      var coords = {tilesetX:selectedTilesetX, tilesetY:selectedTilesetY, tileX:tilePos.x, tileY:tilePos.y};
      var tile = WorldMap.Config.getTile(coords);
      var tileMapping = WorldMap.Config.getTileMapping(tile);
      var surroundingTiles = WorldMap.Config.getSurroundingTiles(coords);
      var cssClasses = WorldMap.Config.getTileClasses(coords);
      
      var $props = $(".tile.properties", $section);
      $(".tileset.index span", $props).html(selectedTilesetY + "," + selectedTilesetX);
      $(".tile.index span", $props).html(tilePos.x + "," + tilePos.y);
      $(".data span", $props).html(tile);
      $(".cssClasses span", $props).html(cssClasses);
      $(".corners span", $props).html(tileMapping ? (tileMapping.hasCorners ? "true" : "false") : "undefined");
      $(".sides span", $props).html(tileMapping ? (tileMapping.hasSides ? "true" : "false") : "undefined");
      
      var $surrounding = $(".surrounding", $props);
      $(".top", $surrounding).html(surroundingToChar(surroundingTiles.top));
      $(".left", $surrounding).html(surroundingToChar(surroundingTiles.left));
      $(".right", $surrounding).html(surroundingToChar(surroundingTiles.right));
      $(".bottom", $surrounding).html(surroundingToChar(surroundingTiles.bottom));
      $props.removeClass("hidden");
    };
    
    var init = function(opt) {
      $tilesets = $(opt.tilesets);
      var showCoords = function($tileset, y, x) { 
        return $("<span/>").html(y + "," + x); 
      };
      MapBuilder.build(WorldMap.Config, $tilesets, showCoords);
    };
    
    var load = function($target) {
      var $section = $target.closest("section");
      var $map = $(".map", $section);
      
      $(".tileset", $tilesets).removeClass("selected");
      $target.addClass("selected");
      $("img.border", $section).addClass("hidden");
      
      var coords = $("span", $target).html().split(",");
      selectedTilesetY = parseInt(coords[0]);
      selectedTilesetX = parseInt(coords[1]);
      var tileset = currentTileset();
      
      if (!WorldMap.Config.validateTileSet(selectedTilesetY, selectedTilesetX)) {
        return false;
      }
      
      $map.attr("className", "");
      $map.addClass("map world");
      $map.empty();
      
      MapBuilder.buildTileset($map, selectedTilesetY, selectedTilesetX);

      toggleGridlines($("#toggleMapGridlines"));
      $map.addClass("loaded");
    };
    
    var loadByCoords = function(y, x) {
      var $row = $(".row", $tilesets).eq(y);
      var $tileset = $(".tileset", $row).eq(x);
      load($tileset);
    };
    
    var loadLastTileset = function() {
      var $lastRow = $(".row:last", $tilesets);
      var $lastTileset;
      $(".tileset", $lastRow).each(function(i) {
        var coords = $("span", $(this)).html().split(",");
        var tileset = WorldMap.Config.getTileset(coords[0], coords[1]);
        if (!tileset) {
          return false;
        } else {
          $lastTileset = $(this);
        }
      });
      load($lastTileset);
    };
    
    var surroundingToChar = function(surroundingTile) {
      return surroundingTile ? (surroundingTile == " " ? "&nbsp" : surroundingTile) : "?";
    };
    
    var tileLookup = function($tile) { return {x:$tile.index(), y:$tile.parent().index()}; };
    
    var toggleGridlines = function($target) {
      var $section = $target.closest("section");
      var $map = $(".map", $section);
      $("img.border", $section).addClass("hidden");
      $map.toggleClass("no-border", !$target.is(":checked"));
    };
    
    return {
      event: event
     ,init: init
     ,loadByCoords: loadByCoords
     ,loadLastTileset: loadLastTileset
    } 
  })();
  
  /* ==================== */
  /* DEBUG - main section */
  /* ==================== */
  var init = function(opt) {
    $debug = $(opt.debug);
    WorldMapHelper.init(opt.worldMap);
  };
  
  var menuChange = function($menuOption) {
    $menuOption.parent().siblings().removeClass("selected");
    $menuOption.parent().addClass("selected");
    
    $("section", $debug).hide();
    var section = ($menuOption.attr("className").split(" ")[0]);
    $("section." + section, $debug).show();
  };
  
  var move = function($target) {
    if ($target.hasClass("left")) { Movement.left(); }
    else if ($target.hasClass("right")) { Movement.right(); }
    else if ($target.hasClass("down")) { Movement.down(); }
    else if ($target.hasClass("up")) { Movement.up(); }
  };
  
  
  return {
    init: init
   ,menuChange: menuChange
   ,move: move
   ,WorldMapHelper: WorldMapHelper
  };
  
})();