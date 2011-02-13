var Debug = (function() {
  
  var $debug = null;
  
  var WorldMapHelper = (function() {
    var $tilesetX, $tilesetY;

    var currentTileset = function() {
      var tilesetX = parseInt($tilesetX.val());
      var tilesetY = parseInt($tilesetY.val());
      return WorldMap.Config.getTileset(tilesetY, tilesetX);
    };
    
    var event = function($target) {
      if ($target.is("#loadTileSet")) { load($target); }
      if ($target.is("#toggleMapGridlines")) { toggleGridlines($target); }
      if ($target.is(".tile")) { highlightTile($target); }
    };
    
    var highlightTile = function($tile) {
      var $section = $tile.closest("section");
      var $border = $("img.border", $section);
      $border.removeClass("hidden");
      var tileOffset = $tile.offset();
      var borderOffset = {top:tileOffset.top - 2, left:tileOffset.left - 2};
      $border.offset(borderOffset);
      
      var tilesetX = parseInt($tilesetX.val());
      var tilesetY = parseInt($tilesetY.val());
      var tilePos = tileLookup($tile);
      var coords = {tilesetX:tilesetX, tilesetY:tilesetY, tileX:tilePos.x, tileY:tilePos.y};
      var tile = WorldMap.Config.getTile(coords);
      var tileMapping = WorldMap.Config.getTileMapping(tile);
      var surroundingTiles = WorldMap.Config.getSurroundingTiles(coords);
      var cssClasses = WorldMap.Config.getTileClasses(coords);
      
      var $props = $(".tile.properties", $section);
      $(".tileset.index span", $props).html(tilesetX + "," + tilesetY);
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
      $tilesetX = $(opt.tilesetX);
      $tilesetY = $(opt.tilesetY);
      initDropDown($tilesetX, WorldMap.Config.maxTilesetX());
      initDropDown($tilesetY, WorldMap.Config.maxTilesetY());
    };
    
    var initDropDown = function($select, maxValue) {
      $select.empty();
      for (var i = 0; i < maxValue; i++) {
        var $option = $("<option/>").val(i).html("" + i);
        $select.append($option);
      }
    };
    
    var load = function($target) {
      var $section = $target.closest("section");
      var $map = $(".map", $section);
      var tilesetX = parseInt($tilesetX.val());
      var tilesetY = parseInt($tilesetY.val());
      var tileset = currentTileset();

      $("img.border", $section).addClass("hidden");
      
      if (!WorldMap.Config.validateTileSet(tileset, tilesetX, tilesetY)) {
        return false;
      }
      
      $map.attr("className", "");
      $map.addClass("map world");
      $map.empty();
      for (var y = 0; y < WorldMap.Config.size; y++) {
        var $row = $("<div/>").addClass("row");
        for (var x = 0; x < WorldMap.Config.size; x++) {
          var coords = {tilesetX:tilesetX, tilesetY:tilesetY, tileX:x, tileY:y};
          var tileClasses = WorldMap.Config.getTileClasses(coords);
          var $tile = $("<p/>").addClass("tile").addClass(tileClasses).html("&nbsp;");
          $row.append($tile);
        }
        $map.append($row);
      }

      toggleGridlines($("#toggleMapGridlines"));
      $map.addClass("loaded");
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