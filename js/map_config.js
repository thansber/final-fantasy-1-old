var Map = (function() {
  
  /* ======== */
  /* MAP BASE */
  /* ======== */
  var ALL_SAME = "ALL";
  var SIZE = 16;
  var MAX_INDEX = SIZE * SIZE - 1;
  
  var allMaps = {};
  
  var init = function(opt) {};
  var getMap = function(id) { return allMaps[id]; };
  
  /* ========== */
  /* MAP CONFIG */
  /* ========== */
  Config = function(opt) {
    opt = opt || {};
    this.id = opt.id;
    this.tilesets = [];
    this.mapping = $.extend(true, {}, opt.mapping);
    allMaps[this.id] = this;
  };

  Config.prototype.is = function(id) { return this.id == id; };
  
  Config.prototype.setMapping = function(mapping) {
    this.mapping = $.extend(true, {}, mapping); 
  };
  
  Config.prototype.addTileset = function(row, tileset, allTileType) {
    if (!this.tilesets[row]) {
      this.tilesets[row] = [];
    }
    
    if (tileset == ALL_SAME) {
      tileset = [];
      for (var i = 0; i < SIZE; i++) {
        var tileRow = "";
        for (var j = 0; j < SIZE; j++) {
          tileRow += allTileType;
        }
        tileset.push(tileRow);
      }
    }
    
    this.tilesets[row].push(tileset);
  }
  
  Config.prototype.getTileset = function(y, x) { return this.tilesets[y] ? this.tilesets[y][x] : null; };
  
  Config.prototype.getTile = function(coords) {
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
  
  Config.prototype.getTileAbsolute = function(absolute) {
    return this.getTile(absolute.toCoords());
  };
  
  Config.prototype.getTileClass = function(tile) {
    var mapping = this.getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClasses;
  };
  
  Config.prototype.getTileMapping = function(tile) { return this.mapping[tile]; };
  Config.prototype.getParentTileMapping = function(tile) {
    var mapping = this.getTileMapping(tile);
    while (mapping.inheritsFrom) {
      mapping = this.getParentTileMapping(mapping.inheritsFrom);
    }
    return mapping;
  };
  
  Config.prototype.getTileClasses = function(coords) {
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
    }
    
    return cssClasses.join(" ");
  };
  
  Config.prototype.determineCornerClass = function(surrounding, borderTiles) {
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
  
  Config.prototype.determineSideClass = function(surrounding, borderTiles) {
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
  
  Config.prototype.determineBlockClass = function(coords, tile, mapping) {
    var absoluteCoords = coords.toAbsolute();
    absoluteCoords.y -= (mapping.block.height - 1);
    absoluteCoords.x -= (mapping.block.width - 1);
    
    var topBlock = MAX_INDEX + 1;
    var leftBlock = MAX_INDEX + 1;
    
    var minY = absoluteCoords.y, maxY = absoluteCoords.y + (mapping.block.height * 2);
    var minX = absoluteCoords.x, maxX = absoluteCoords.x + (mapping.block.width * 2);
    
    for (var y = minY; y < maxY; y++) {
      for (var x = minX; x < maxX; x++) {
        var currentTile = this.getTileAbsolute(new AbsoluteCoords(y, x));
        if (tile == currentTile) {
          topBlock = Math.min(topBlock, y);
          leftBlock = Math.min(leftBlock, x);
        }
      }
    }
    
    var abs = coords.toAbsolute();
    var y = String.fromCharCode("A".charCodeAt(0) + (abs.y - topBlock));
    var x = String.fromCharCode("A".charCodeAt(0) + (abs.x - leftBlock));
    
    return y + x;
  };
  
  Config.prototype.countSurroundingForType = function(surrounding, tile) {
    var count = 0;
    for (var s in surrounding) {
      if (this.isTileOfType(surrounding[s], tile)) {
        count++;
      }
    }
    return count;
  }
  
  Config.prototype.getSurroundingTiles = function(coords) {
    return {
      top: this.getTile(this.getCoordsAbove(coords))
     ,left: this.getTile(this.getCoordsToLeft(coords))
     ,right: this.getTile(this.getCoordsToRight(coords))
     ,bottom: this.getTile(this.getCoordsBelow(coords))
    };
  };
  
  Config.prototype.getCoordsToLeft = function(coords) {
    return coords.toAbsolute().adjust(0, -1).toCoords();
  };

  Config.prototype.getCoordsToRight = function(coords) {
    return coords.toAbsolute().adjust(0, 1).toCoords();
  };
  
  Config.prototype.getCoordsAbove = function(coords) {
    return coords.toAbsolute().adjust(-1, 0).toCoords();
  };
  
  Config.prototype.getCoordsBelow = function(coords) {
    return coords.toAbsolute().adjust(1, 0).toCoords();
  };
  
  Config.prototype.isTileOfType = function(tile, type) { 
    return !tile || type.indexOf(tile) > -1; 
  };  
  
  Config.prototype.maxTilesetX = function() { 
    return this.tilesets[0].length; 
  };
  
  Config.prototype.maxTilesetY = function() { 
    return this.tilesets.length; 
  };
  
  Config.prototype.validateTileSet = function(y, x) {
    var tileset = this.getTileset(y, x);
    if (!tileset) {
      alert("No tileset exists at [" + y + "][" + x + "]");
      return false;
    }
    if (tileset.length != SIZE) {
      alert("Tileset[" + y + "][" + x + "] has " + tileset.length + " rows, it should have " + SIZE);
      return false;
    }
    
    for (var i = 0; i < SIZE; i++) {
      if (tileset[i].length != SIZE) {
        alert("Tileset[" + x + "][" + y + "], row " + i + " has " + tileset[i].length + " cols, it should have " + SIZE);
        return false;
      }
    }
    
    return true;
  }
  
  Tile = function(opt) {
    opt = opt || {
      cssClasses: ""
     ,hasCorners: false
     ,hasSides: false
     ,block: {}
     ,passableUsing: []
     ,borderTile: null
     ,inheritsFrom: null
    };
    this.cssClasses = opt.cssClasses;
    this.hasCorners = opt.hasCorners;
    this.hasSides = opt.hasSides;
    this.block = opt.block;
    this.passableUsing = opt.passableUsing;
    this.borderTile = opt.borderTile;
    this.inheritsFrom = opt.inheritsFrom; 
  };
  
  Tile.prototype.isPassableUsing = function(transportation) {
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
  Coords = function() {
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
  
  Coords.prototype.tilesetY = function() { return this.coords.tilesetY; };
  Coords.prototype.tilesetX = function() { return this.coords.tilesetX; };
  Coords.prototype.tileY = function() { return this.coords.tileY; };
  Coords.prototype.tileX = function() { return this.coords.tileX; };

  Coords.prototype.toAbsolute = function() {
    return new AbsoluteCoords({
      y : this.tilesetY() * Map.SIZE + this.tileY()
     ,x: this.tilesetX() * Map.SIZE + this.tileX()
    });
  };
  
  Coords.prototype.toString = function() {
    return "tileset[" + this.tilesetY() + "," + this.tilesetX() + "], tile[" + this.tileY() + "," + this.tileX() + "]";
  };

  /* ======================== */
  /* MAP ABSOLUTE COORDINATES */
  /* ======================== */
  
  /**
   * Args can be 2 params - y, x
   * or a object containing y and x
   */
  AbsoluteCoords = function() {
    if (arguments.length == 2) {
      this.y = arguments[0];
      this.x = arguments[1];
    } else {
      var opt = arguments[0] || {x:0, y:0};
      this.y = opt.y;
      this.x = opt.x;
    }
  };
  AbsoluteCoords.prototype.adjust = function(yChange, xChange) {
    this.y += yChange;
    this.x += xChange;
    if (this.y < 0) { this.y = MAX_INDEX; }
    if (this.x < 0) { this.x = MAX_INDEX; }
    if (this.y > MAX_INDEX) { this.y = 0; }
    if (this.x > MAX_INDEX) { this.x = 0; }
    return this;
  };
  AbsoluteCoords.prototype.toCoords = function() {
    return new Coords(Math.floor(this.y / Map.SIZE), 
                      Math.floor(this.x / Map.SIZE), 
                      this.y % Map.SIZE, 
                      this.x % Map.SIZE);
  };
  AbsoluteCoords.prototype.toString = function() {
    return "[" + this.y + "," + this.x + "]";
  };

  
  return {
    init: init
   ,getMap: getMap
    
   ,Config: Config
   ,Tile: Tile
   ,Coords: Coords
   ,AbsoluteCoords: AbsoluteCoords
   
   ,WORLD_MAP: "world-map"
   
   ,ALL_SAME: ALL_SAME
   ,SIZE: SIZE
  };
  
})();