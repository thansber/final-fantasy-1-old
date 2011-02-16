var Map = (function() {
  
  var ALL_SAME = "ALL";
  
  Config = function(opt) {
    this.size = opt.size;
    this.maxIndex = this.size * this.size;
    this.tilesets = [];
    this.mapping = $.extend(true, {}, opt.mapping);
  };
  
  Config.prototype.setMapping = function(mapping) {
    this.mapping = $.extend(true, {}, mapping); 
  };
  
  Config.prototype.addTileset = function(row, tileset, allTileType) {
    if (!this.tilesets[row]) {
      this.tilesets[row] = [];
    }
    
    if (tileset == ALL_SAME) {
      tileset = [];
      for (var i = 0; i < this.size; i++) {
        var tileRow = "";
        for (var j = 0; j < this.size; j++) {
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
  
  Config.prototype.getTileAbsolute = function(absoluteCoords) {
    return this.getTile(absoluteToCoords(absoluteCoords));
  };
  
  Config.prototype.getTileClass = function(tile) {
    var mapping = this.getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClass;
  };
  
  Config.prototype.getTileMapping = function(tile) { return this.mapping[tile]; };
  
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
    
    var topBlock = this.maxIndex + 1;
    var leftBlock = this.maxIndex + 1;
    
    var minY = absoluteCoords.y, maxY = absoluteCoords.y + (mapping.block.height * 2);
    var minX = absoluteCoords.x, maxX = absoluteCoords.x + (mapping.block.width * 2);
    
    for (var y = minY; y < maxY; y++) {
      for (var x = minX; x < maxX; x++) {
        var currentTile = this.getTileAbsolute({y:y, x:x});
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
  
  // If at left edge of current tileset, get tileset to the left 
  // and right-most tile in same row
  Config.prototype.getCoordsToLeft = function(coords) {
    var absolute = coords.toAbsolute();
    absolute.x--;
    var left = absoluteToCoords(absolute);
    if (left.x < 0) {
      return null;
    }
    return left;
  };

  Config.prototype.getCoordsToRight = function(coords) {
    var absolute = coords.toAbsolute();
    absolute.x++;
    var right = absoluteToCoords(absolute);
    if (right.x > this.maxIndex) {
      return null;
    }
    return right;
  };
  
  Config.prototype.getCoordsAbove = function(coords) {
    var absolute = coords.toAbsolute();
    absolute.y--;
    var above = absoluteToCoords(absolute);
    if (above.y < 0) {
      return null;
    }
    return above;
  };
  
  Config.prototype.getCoordsBelow = function(coords) {
    var absolute = coords.toAbsolute();
    absolute.y++;
    var below = absoluteToCoords(absolute);
    if (below.y > this.maxIndex) {
      return null;
    }
    return below;
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
    if (tileset.length != this.size) {
      alert("Tileset[" + y + "][" + x + "] has " + tileset.length + " rows, it should have " + this.size);
      return false;
    }
    
    for (var i = 0; i < this.size; i++) {
      if (tileset[i].length != this.size) {
        alert("Tileset[" + x + "][" + y + "], row " + i + " has " + tileset[i].length + " cols, it should have " + this.size);
        return false;
      }
    }
    
    return true;
  }
  
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
    // TODO: should the 16 be hard-coded?
    return {
      y : this.tilesetY() * 16 + this.tileY()
     ,x: this.tilesetX() * 16 + this.tileX()
    };
  };
  
  Coords.prototype.toString = function() {
    return "tileset[" + this.tilesetY() + "," + this.tilesetX() + "], tile[" + this.tileY() + "," + this.tileX() + "]";
  };

  var absoluteToCoords = function(absolute) {
    return new Coords(Math.floor(absolute.y / 16), Math.floor(absolute.x / 16), absolute.y % 16, absolute.x % 16);
  };

  
  return {
    Config: Config
   ,Coords: Coords
   ,ALL_SAME: ALL_SAME
   ,absoluteToCoords: absoluteToCoords
  };
  
})();