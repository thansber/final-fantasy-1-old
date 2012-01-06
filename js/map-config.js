define( 
/* MapConfig */
["jquery", "map-coords-absolute", "map-coords-converter"], 
function($, MapCoordsAbsolute, MapCoordsConverter) {
  
  var allMaps = {};
  
  var Config = function(opt) {
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

  Config.prototype.addTileset = function(row, tileset, allTileType) {
    if ($.isArray(row)) {
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
    return this;
  };
  
  Config.prototype.countSurroundingForType = function(surrounding, tile) {
    var count = 0;
    for (var s in surrounding) {
      if (this.isTileOfType(surrounding[s], tile)) {
        count++;
      }
    }
    return count;
  };
  
  Config.prototype.determineBlockClass = function(coords, tile, mapping) {
    var absoluteCoords = MapCoordsConverter.tileToAbsolute(coords, this);
    absoluteCoords.y -= (mapping.block.height - 1);
    absoluteCoords.x -= (mapping.block.width - 1);
    
    var topBlock = this.maxHeight + 1;
    var leftBlock = this.maxWidth + 1;
    
    var minY = absoluteCoords.y, maxY = absoluteCoords.y + (mapping.block.height * 2);
    var minX = absoluteCoords.x, maxX = absoluteCoords.x + (mapping.block.width * 2);
    
    for (var y = minY; y < maxY; y++) {
      for (var x = minX; x < maxX; x++) {
        var currentTile = this.getTileAbsolute(MapCoordsAbsolute.create(y, x));
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
  
  Config.prototype.determineStackClass = function(surrounding, mapping) {
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
  
  Config.prototype.getCoordsAbove = function(coords) { return MapCoordsConverter.absoluteToTile(MapCoordsConverter.tileToAbsolute(coords, this).adjust(-1, 0, this), this); };
  Config.prototype.getCoordsBelow = function(coords) { return MapCoordsConverter.absoluteToTile(MapCoordsConverter.tileToAbsolute(coords, this).adjust(1, 0, this), this); };
  Config.prototype.getCoordsToLeft = function(coords) { return MapCoordsConverter.absoluteToTile(MapCoordsConverter.tileToAbsolute(coords, this).adjust(0, -1, this), this); };
  Config.prototype.getCoordsToRight = function(coords) { return MapCoordsConverter.absoluteToTile(MapCoordsConverter.tileToAbsolute(coords, this).adjust(0, 1, this), this); };
  
  Config.prototype.getParentTileMapping = function(tile) {
    var mapping = this.getTileMapping(tile);
    while (mapping && mapping.inheritsFrom) {
      mapping = this.getParentTileMapping(mapping.inheritsFrom);
    }
    return mapping;
  };
  
  Config.prototype.getSurroundingTiles = function(coords) {
    return {
      top: this.getTile(this.getCoordsAbove(coords))
     ,left: this.getTile(this.getCoordsToLeft(coords))
     ,right: this.getTile(this.getCoordsToRight(coords))
     ,bottom: this.getTile(this.getCoordsBelow(coords))
    };
  };
  
  Config.prototype.getTile = function(coords) {
    var tileset = this.getTileset(coords.tilesetY, coords.tilesetX);
    if (!tileset) {
      return null;
    }
    var row = tileset[coords.tileY];
    if (!row) {
      return null;
    }
    return row.charAt(coords.tileX); 
  };
  
  Config.prototype.getTileAbsolute = function(absolute) { return this.getTile(MapCoordsConverter.absoluteToTile(absolute, this)); };
  
  Config.prototype.getTileClass = function(tile) {
    var mapping = this.getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClasses;
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
      if (mapping.stack) {
        cssClasses.push(this.determineStackClass(surrounding, mapping));
      }
    }
    
    return cssClasses.join(" ");
  };
  
  Config.prototype.getTileMapping = function(tile) { return this.mapping[tile]; };
  Config.prototype.getTileset = function(y, x) { return this.tilesets[y] ? this.tilesets[y][x] : null; };
  Config.prototype.is = function(id) { return this.id == id; };
  Config.prototype.isOutsideTownMap = function(coords) {
    if (!this.exitOnOutOfBounds) {
      return false;
    }
    if (coords.x < 0 || coords.y < 0) {
      return true;
    }
    return coords.x >= this.width || coords.y >= this.height;
  };
  Config.prototype.isTileOfType = function(tile, type) { return !tile || type.indexOf(tile) > -1; };  
  Config.prototype.maxTilesetX = function() { return this.tilesets[0].length; };
  Config.prototype.maxTilesetY = function() { return this.tilesets.length; };
  Config.prototype.setMapping = function(mapping) { this.mapping = $.extend(true, {}, mapping); return this; };
  
  Config.prototype.validateTileSet = function(y, x) {
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
  
  return {
    create : function(opt) { return new Config(opt); }
   ,lookup : function(id) { return allMaps[id]; }
  };
  
});