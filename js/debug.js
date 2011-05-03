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
      MapBuilder.build(WorldMap.Config, $tilesets, showCoords);
    };
    
    var load = function($target) {
      var $section = $target.closest("section");
      var $map = $(".map", $section);
      
      $(".tileset", $tilesets).removeClass("selected");
      $target.addClass("selected");
      
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
    };
  })();
  
  var MovementHelper = (function() {
    
    var event = function($target) {
      if ($target.is("a")) { move($target); }
      else if ($target.is(".start.listening")) { Movement.startListening(); }
      else if ($target.is(".stop.listening")) { Movement.stopListening(); }
    };
    
    var move = function($target) {
      if ($target.hasClass("left")) { Movement.left(); }
      else if ($target.hasClass("right")) { Movement.right(); }
      else if ($target.hasClass("down")) { Movement.down(); }
      else if ($target.hasClass("up")) { Movement.up(); }
    };
    
    return {
      event: event
     ,move: move
    };
  })();
  
  var CoordsHelper = (function() {
    
    var event = function($target) {
      if ($target.is(".go")) { moveParty($target); }
      else if ($target.is(".absolute")) { showAbsolute($target); }
    };
    
    var moveParty = function($target) {
      var coords = toCoords($target);
      Party.jumpTo(coords.toAbsolute());
    };
    
    var showAbsolute = function($target) {
      var $absoluteContainer = $target.closest(".container").find(".absolute.container");
      var coords = toCoords($target);
      var absolute = coords.toAbsolute();
      $(".absolute.y", $absoluteContainer).html(absolute.y);
      $(".absolute.x", $absoluteContainer).html(absolute.x);
      $absoluteContainer.removeClass("hidden");
    };
    
    var toCoords = function($target) {
      var $container = $target.closest("div");
      var tilesetY = parseInt($("input.tileset.y", $container).val()); 
      var tilesetX = parseInt($("input.tileset.x", $container).val());
      var tileY = parseInt($("input.tile.y", $container).val());
      var tileX = parseInt($("input.tile.x", $container).val());
      var coords = new Map.Coords(tilesetY, tilesetX, tileY, tileX);
      return coords;
    };
    
    return {
      event: event
    };
  })();
  
  var MessageHelper = (function() {
    var init = function() {
      var $container = $("section.messages .container", $debug);
      $container.append(Message.create("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
      $container.append(Message.create("ZYXWVUTSRQPONMLKJIHGFEDCBA"));
      $container.append(Message.create("abcdefghijklmnopqrstuvwxyz"));
      $container.append(Message.create("zyxwvutsrqponmlkjihgfedcba"));
      $container.append(Message.create("0123456789  9876543210"));
      $container.append(Message.create(".,'?!:-   -:!?',."));
      $container.append(Message.create("^$#%*&+@=|~   ~|=@+&*%#$^"));

      $container.append(Message.create("This LUTE has been passed down from Queen to Princess for 2000 years. Please accept it as my gift, it just might come in handy."));
      $container.append(Message.create("And so, their journey begins::"));
      $container.append(Message.create("No one touches my\nPrincess!!\n" 
                                     + "LIGHT WARRIORS??\n" 
                                     + "You impertinent fools.\n" 
                                     + "I, Garland, will knock\n" 
                                     + "you all down!!"));
      $container.append(Message.create("Wooden#  Wooden|  Small ^\n"
                                     + "                         \n"
                                     + "     50        5        5"));
      $container.append(Message.create("Iron  ~\n      \n    100"));
    };
    
    return {
      init: init
    };
  })();
  
  /* ==================== */
  /* DEBUG - main section */
  /* ==================== */
  var init = function(opt) {
    $debug = $(opt.debug);
    WorldMapHelper.init(opt.worldMap);
    MessageHelper.init();
  };
  
  var menuChange = function($menuOption) {
    $menuOption.parent().siblings().removeClass("selected");
    $menuOption.parent().addClass("selected");
    
    $("section", $debug).hide();
    var section = ($menuOption.attr("className").split(" ")[0]);
    $("section." + section, $debug).show();
  };
  
  return {
    init: init
   ,menuChange: menuChange
   
   ,WorldMapHelper: WorldMapHelper
   ,MovementHelper: MovementHelper
   ,CoordsHelper: CoordsHelper
  };
  
})();