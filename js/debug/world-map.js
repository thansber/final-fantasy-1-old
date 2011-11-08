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
    $tile.closest(".map").find(".tile.selected").removeClass("selected");
    $tile.addClass("selected");
    
    var tilePos = tileLookup($tile);
    var coords = new Map.Coords(selectedTilesetY, selectedTilesetX, tilePos.y, tilePos.x);
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
    
    var markup = [], m = -1;
    for (var y = 0; y < WorldMap.Config.maxTilesetY(); y++) {
      markup[++m] = "<div class=\"row\">";
      for (var x = 0; x < WorldMap.Config.maxTilesetX(); x++) {
        markup[++m] = "<div class=\"tileset\"><span>" + y + "," + x + "</span></div>";
      }
      markup[++m] = "</div>";
    }
    
    $tilesets.append($(markup.join("")));
  };
  
  var load = function($target) {
    var $section = $target.closest("section");
    
    $(".tileset", $tilesets).removeClass("selected");
    $target.addClass("selected");
    
    var coords = $("span", $target).html().split(",");
    selectedTilesetY = parseInt(coords[0]);
    selectedTilesetX = parseInt(coords[1]);
    var tileset = currentTileset();
    
    if (!WorldMap.Config.validateTileSet(selectedTilesetY, selectedTilesetX)) {
      return false;
    }
    
    $("#view").addClass("zoom two");
    Party.jumpTo(new Map.Coords(selectedTilesetY, selectedTilesetX, 16, 16).toAbsolute());
    
    toggleGridlines($("#toggleMapGridlines"));
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
  };
})();