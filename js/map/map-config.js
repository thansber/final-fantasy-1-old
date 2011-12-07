var Map = (function() {
  
  var self = this;
  
  /* ======== */
  /* MAP BASE */
  /* ======== */

  self.WORLD_MAP = "world-map";
  self.OCEAN = "ocean";
  self.CONERIA = "coneria";
  self.PRAVOKA = "pravoka";
  self.ELFLAND = "elfland";
  self.MELMOND = "melmond";
  self.CRESCENT_LAKE = "crescent lake";
  self.ONRAC = "onrac";
  self.GAIA = "gaia";
  self.LEFEIN = "lefein";
  
  self.TILE_SIZE = 16;
  
  /* ================== */
  /* BATTLE BACKGROUNDS */
  /* ================== */
  self.BattleBackgrounds = {
    Castle:{cssClass:"castle"}
   ,Desert:{cssClass:"desert"}
   ,EarthCave:{cssClass:"earth cave"}
   ,Forest:{cssClass:"forest"}
   ,GurguVolcano:{cssClass:"gurgu"}
   ,IceCave:{cssClass:"ice cave"}
   ,MarshCave:{cssClass:"marsh cave"}
   ,Plains:{cssClass:"plains"}
   ,River:{cssClass:"river"}
   ,Sea:{cssClass:"sea"}
   ,SeaShrine:{cssClass:"sea shrine"}
   ,SkyCastle:{cssClass:"sky castle"}
   ,Swamp:{cssClass:"swamp"}
   ,TempleofFiends:{cssClass:"tof"}
   ,TitansTunnel:{cssClass:"titan"}
   ,Waterfall:{cssClass:"waterfall"}
  };
  
  var allMaps = {};
  
  self.init = function(opt) {};
  self.getMap = function(id) { return allMaps[id]; };
  
  /* ========== */
  /* MAP CONFIG */
  /* ========== */
  self.Config = function(opt) {
    opt = $.extend({hasBattles:true, exitOnOutOfBounds:false, wrapsX:false, wrapsY:false}, opt);
    this.id = opt.id;
    this.hasBattles = opt.hasBattles;
    this.tilesets = [];
    this.height = opt.height;
    this.width = opt.width;
    this.numTilesets = opt.numTilesets;
    this.wrapsY = opt.wrapsY;
    this.wrapsX = opt.wrapsX;
    this.exitOnOutOfBounds = opt.exitOnOutOfBounds;
    this.start = opt.start;
    this.worldMapExit = opt.worldMapExit;
    this.maxWidth = this.width * this.numTilesets - 1;
    this.maxHeight = this.height * this.numTilesets - 1;
    this.mapping = $.extend(true, {}, opt.mapping);
    this.rowIndex = 0;
    allMaps[this.id] = this;
  };

  self.Config.prototype.is = function(id) { return this.id == id; };
  
  self.Config.prototype.setMapping = function(mapping) {
    this.mapping = $.extend(true, {}, mapping); 
  };
  
  self.Config.prototype.addTileset = function(row, tileset, allTileType) {
    if (jQuery.isArray(row)) {
      tileset = row;
      if (this.tilesets[this.rowIndex] && this.tilesets[this.rowIndex].length == this.numTilesets) {
        this.rowIndex++;
      }
      if (!this.tilesets[this.rowIndex]) {
        this.tilesets[this.rowIndex] = [];
      }
    } else {
      this.rowIndex = row;
      if (!this.tilesets[this.rowIndex]) {
        this.tilesets[this.rowIndex] = [];
      }
    }
    
    this.tilesets[this.rowIndex].push(tileset);
  }
  
  self.Config.prototype.getTileset = function(y, x) { return this.tilesets[y] ? this.tilesets[y][x] : null; };
  
  self.Config.prototype.getTile = function(coords) {
    var tileset = this.getTileset(coords.tilesetY(), coords.tilesetX());
    if (!tileset) {
      return null;
    }
    var row = tileset[coords.tileY()];
    if (!row) {
      return null;
    }
    return row.charAt(coords.tileX()); 
  };
  
  self.Config.prototype.getTileAbsolute = function(absolute) {
    return this.getTile(absolute.toCoords(this));
  };
  
  self.Config.prototype.getTileClass = function(tile) {
    var mapping = this.getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClasses;
  };
  
  self.Config.prototype.getTileMapping = function(tile) { return this.mapping[tile]; };
  self.Config.prototype.getParentTileMapping = function(tile) {
    var mapping = this.getTileMapping(tile);
    while (mapping && mapping.inheritsFrom) {
      mapping = this.getParentTileMapping(mapping.inheritsFrom);
    }
    return mapping;
  };
  
  self.Config.prototype.getTileClasses = function(coords) {
    var tile = this.getTile(coords);
    var mapping = this.getTileMapping(tile);
    var surrounding = this.getSurroundingTiles(coords);
    
    var cssClasses = [];
    cssClasses.push(this.getTileClass(tile));
    
    if (mapping) {
      if (mapping.hasCorners) {
        cssClasses.push(this.determineCornerClass(surrounding, mapping.borderTile));
      }
      if (mapping.hasSides) {
        cssClasses.push(this.determineSideClass(surrounding, mapping.borderTile));
      }
      if (mapping.block) {
        cssClasses.push(this.determineBlockClass(coords, tile, mapping));
      }
      if (mapping.stack) {
        cssClasses.push(this.determineStackClass(surrounding, mapping));
      }
    }
    
    return cssClasses.join(" ");
  };
  
  self.Config.prototype.determineCornerClass = function(surrounding, borderTiles) {
    var count = 0;
    var tilesToCheck = "";
    for (var i = 0; i < borderTiles.length; i++) {
      count += this.countSurroundingForType(surrounding, borderTiles.charAt(i));
      tilesToCheck += borderTiles.charAt(i);
      if (count == 2) {
        var leftMatch = this.isTileOfType(surrounding.left, tilesToCheck);
        var topMatch = this.isTileOfType(surrounding.top, tilesToCheck);
        var bottomMatch = this.isTileOfType(surrounding.bottom, tilesToCheck);
        var rightMatch = this.isTileOfType(surrounding.right, tilesToCheck);

        if (leftMatch && topMatch) { return "br"; }
        else if (leftMatch && bottomMatch) { return "tr"; }
        else if (rightMatch && topMatch) { return "bl"; }
        else if (rightMatch & bottomMatch) { return "tl"; }
      }
    }
    return "";
  };
  
  self.Config.prototype.determineSideClass = function(surrounding, borderTiles) {
    var count = this.countSurroundingForType(surrounding, borderTiles);
    if (count == 3) {
      var leftMatch = this.isTileOfType(surrounding.left, borderTiles);
      var topMatch = this.isTileOfType(surrounding.top, borderTiles);
      var bottomMatch = this.isTileOfType(surrounding.bottom, borderTiles);
      var rightMatch = this.isTileOfType(surrounding.right, borderTiles);
      
      if (!leftMatch) { return "left"; }
      else if (!topMatch) { return "top"; }
      else if (!bottomMatch) { return "bottom"; }
      else if (!rightMatch) { return "right"; }
    }
    return "";
  };
  
  self.Config.prototype.determineBlockClass = function(coords, tile, mapping) {
    var absoluteCoords = coords.toAbsolute(this);
    absoluteCoords.y -= (mapping.block.height - 1);
    absoluteCoords.x -= (mapping.block.width - 1);
    
    var topBlock = this.maxHeight + 1;
    var leftBlock = this.maxWidth + 1;
    
    var minY = absoluteCoords.y, maxY = absoluteCoords.y + (mapping.block.height * 2);
    var minX = absoluteCoords.x, maxX = absoluteCoords.x + (mapping.block.width * 2);
    
    for (var y = minY; y < maxY; y++) {
      for (var x = minX; x < maxX; x++) {
        var currentTile = this.getTileAbsolute(new self.AbsoluteCoords(y, x));
        if (tile == currentTile) {
          topBlock = Math.min(topBlock, y);
          leftBlock = Math.min(leftBlock, x);
        }
      }
    }
    
    var abs = coords.toAbsolute(this);
    var y = String.fromCharCode("A".charCodeAt(0) + (abs.y - topBlock));
    var x = String.fromCharCode("A".charCodeAt(0) + (abs.x - leftBlock));
    
    return y + x;
  };
  
  self.Config.prototype.determineStackClass = function(surrounding, mapping) {
    var count = this.countSurroundingForType(surrounding, mapping.borderTile);
    if (count > 0) {
      var stackMatches = mapping.stack.match.split(" ");
      for (var i = 0; i < stackMatches.length; i++) {
        if (this.isTileOfType(surrounding[stackMatches[i]], mapping.borderTile)) {
          return mapping.stack.cssClasses;
        }
      }
    }
    return "";
  };
  
  self.Config.prototype.countSurroundingForType = function(surrounding, tile) {
    var count = 0;
    for (var s in surrounding) {
      if (this.isTileOfType(surrounding[s], tile)) {
        count++;
      }
    }
    return count;
  }
  
  self.Config.prototype.getSurroundingTiles = function(coords) {
    return {
      top: this.getTile(this.getCoordsAbove(coords))
     ,left: this.getTile(this.getCoordsToLeft(coords))
     ,right: this.getTile(this.getCoordsToRight(coords))
     ,bottom: this.getTile(this.getCoordsBelow(coords))
    };
  };
  
  self.Config.prototype.getCoordsToLeft = function(coords) {
    return coords.toAbsolute(this).adjust(0, -1, this).toCoords(this);
  };

  self.Config.prototype.getCoordsToRight = function(coords) {
    return coords.toAbsolute(this).adjust(0, 1, this).toCoords(this);
  };
  
  self.Config.prototype.getCoordsAbove = function(coords) {
    return coords.toAbsolute(this).adjust(-1, 0, this).toCoords(this);
  };
  
  self.Config.prototype.getCoordsBelow = function(coords) {
    return coords.toAbsolute(this).adjust(1, 0, this).toCoords(this);
  };
  
  self.Config.prototype.isTileOfType = function(tile, type) { 
    return !tile || type.indexOf(tile) > -1; 
  };  
  
  self.Config.prototype.maxTilesetX = function() { 
    return this.tilesets[0].length; 
  };
  
  self.Config.prototype.maxTilesetY = function() { 
    return this.tilesets.length; 
  };
  
  self.Config.prototype.validateTileSet = function(y, x) {
    var tileset = this.getTileset(y, x);
    if (!tileset) {
      alert("No tileset exists at [" + y + "][" + x + "]");
      return false;
    }
    if (tileset.length != this.height) {
      alert("Tileset[" + y + "][" + x + "] has " + tileset.length + " rows, it should have " + this.height);
      return false;
    }
    
    for (var i = 0; i < this.height; i++) {
      if (tileset[i].length != this.width) {
        alert("Tileset[" + x + "][" + y + "], row " + i + " has " + tileset[i].length + " cols, it should have " + this.width);
        return false;
      }
    }
    
    return true;
  };
  
  self.Config.prototype.isOutsideTownMap = function(coords) {
    if (!this.exitOnOutOfBounds) {
      return false;
    }
    if (coords.x < 0 || coords.y < 0) {
      return true;
    }
    return coords.x >= this.width || coords.y >= this.height;
  };
  
  /* =========== */
  /* TILE object */
  /* =========== */
  self.Tile = function(opt) {
    opt = jQuery.extend(true, {
      cssClasses: ""
     ,hasCorners: false
     ,hasSides: false
     ,block: null
     ,stack: null
     ,passableUsing: []
     ,borderTile: null
     ,inheritsFrom: null
     ,background: null
     ,decrementBattleSteps: true
    }, opt);
    this.cssClasses = opt.cssClasses;
    this.hasCorners = opt.hasCorners;
    this.hasSides = opt.hasSides;
    this.block = opt.block;
    this.stack = opt.stack;
    this.passableUsing = opt.passableUsing;
    this.borderTile = opt.borderTile;
    this.inheritsFrom = opt.inheritsFrom;
    this.background = opt.background;
    this.decrementBattleSteps = opt.decrementBattleSteps;
  };
  
  self.Tile.prototype.isPassableUsing = function(transportation) {
    for (var t in this.passableUsing) {
      if (this.passableUsing[t] == transportation) {
        return true;
      }
    }
    return false;
  };
  
  /* =============== */
  /* MAP COORDINATES */
  /* =============== */
  // Parameters can either be an object or the 4 coordinates
  // TilesetY, TilesetX, TileY, TileX
  self.Coords = function() {
    if (arguments.length > 1) {
      this.coords = {
        tilesetY: arguments[0]
       ,tilesetX: arguments[1]
       ,tileY: arguments[2]
       ,tileX: arguments[3]
      };
    } else {
      this.coords = $.extend({}, arguments[0]);
    }
  };
  
  self.Coords.prototype.tilesetY = function() { return this.coords.tilesetY; };
  self.Coords.prototype.tilesetX = function() { return this.coords.tilesetX; };
  self.Coords.prototype.tileY = function() { return this.coords.tileY; };
  self.Coords.prototype.tileX = function() { return this.coords.tileX; };

  self.Coords.prototype.toAbsolute = function(config) {
    return new self.AbsoluteCoords({
      y : this.tilesetY() * config.height + this.tileY()
     ,x: this.tilesetX() * config.width + this.tileX()
    });
  };
  
  self.Coords.prototype.toString = function() {
    return "tileset[" + this.tilesetY() + "," + this.tilesetX() + "], tile[" + this.tileY() + "," + this.tileX() + "]";
  };

  /* ======================== */
  /* MAP ABSOLUTE COORDINATES */
  /* ======================== */
  
  /**
   * Args can be 2 params - y, x
   * or a object containing y and x
   */
  self.AbsoluteCoords = function() {
    if (arguments.length == 2) {
      this.y = arguments[0];
      this.x = arguments[1];
    } else {
      var opt = arguments[0] || {x:0, y:0};
      this.y = opt.y;
      this.x = opt.x;
    }
  };
  self.AbsoluteCoords.prototype.adjust = function(yChange, xChange, config) {
    this.y += yChange;
    this.x += xChange;
    if (config.wrapsY && this.y < 0) { this.y = config.maxHeight; }
    if (config.wrapsX && this.x < 0) { this.x = config.maxWidth; }
    if (config.wrapsY && this.y > config.maxHeight) { this.y = 0; }
    if (config.wrapsX && this.x > config.maxWidth) { this.x = 0; }
    return this;
  };
  self.AbsoluteCoords.prototype.equals = function(other) {
    return this.y == other.y && this.x == other.x;
  };
  self.AbsoluteCoords.prototype.toCoords = function(config) {
    return new self.Coords(Math.floor(this.y / config.height), 
                           Math.floor(this.x / config.width), 
                           this.y % config.height, 
                           this.x % config.width);
  };
  self.AbsoluteCoords.prototype.toString = function() {
    return "[" + this.y + "," + this.x + "]";
  };
  
  /* ===================================== */
  /* ------------ TRANSITIONS ------------ */
  /* ===================================== */
  var ALL_TRANSITIONS = {};
  
  self.Transition = function(from, to, fromCoords, toCoords) {
    this.from = from;
    this.to = to;
    if (!fromCoords) {
        this.toCoords = self.getMap(from).worldMapExit;
    } else {
        this.fromCoords = new self.AbsoluteCoords(fromCoords);
        this.toCoords = toCoords ? new self.AbsoluteCoords(toCoords) : self.getMap(to).start;
    }
    
    var transitionsForFrom = ALL_TRANSITIONS[this.from];
    if (!transitionsForFrom) {
      transitionsForFrom = [];
      ALL_TRANSITIONS[this.from] = transitionsForFrom;
    }
    transitionsForFrom.push(this);
  };
  
  self.findTransition = function(map, coords) {
    var transitions = ALL_TRANSITIONS[map];
    if (!transitions || transitions.length == 0) {
      Logger.error("No map transitions were found for map [" + map + "], you sure you have any setup?");
      return null;
    }

    var mapConfig = Map.getMap(map);
    if (mapConfig.exitOnOutOfBounds) {
      if (mapConfig.isOutsideTownMap(coords)) {
        return transitions[0];
      }
    } else {
      for (var t = 0; t < transitions.length; t++) {
        if (coords.equals(transitions[t].fromCoords)) {
          return transitions[t];
        }
      }
    }
    return null;
  };
  
  self.showAllTransitions = function() {
    for (var from in ALL_TRANSITIONS) {
      var transitions = ALL_TRANSITIONS[from];
      for (var t = 0; t < transitions.length; t++) {
        var transition = transitions[t];
        Logger.debug("transition from " + from + " at " + transition.fromCoords.toString() + " to " + transition.to + " at " + transition.toCoords.toString());
      }
    }
  };

  return this;
}).call({});