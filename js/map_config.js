var Map = (function() {
  
  var ALL_SAME = "ALL";
  
  Config = function(opt) {
    this.size = opt.size;
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
    var x = 0;
    if (mapping.block.width > 1) {
      var coordsLeft = this.getCoordsToLeft(coords);
      var tileLeft = this.getTile(coordsLeft);
      var tileRight = this.getTile(this.getCoordsToRight(coords));
      if (tileLeft != tile) {
        x = 0;
      } else if (tileRight != tile) {
        x = mapping.block.width - 1;
      } else {
        var numTiles = 0;
        var newCoords = coordsLeft;
        var currentTile = this.getTile(newCoords);
        while (currentTile == tile) {
          newCoords = this.getCoordsToLeft(newCoords);
          numTiles++;
          currentTile = this.getTile(newCoords);
        }
        x = numTiles;
      }
    }
    
    var y = 0;
    if (mapping.block.height > 1) {
      var tileAbove = this.getTile(this.getCoordsAbove(coords));
      var tileBelow = this.getTile(this.getCoordsBelow(coords));
      if (tileAbove != tile) {
        y = 0;
      } else if (tileBelow != tile) {
        y = mapping.block.height - 1;
      } else {
        // figure out how many of the same tile are above the current one
        var numTiles = 0;
        var newCoords = this.getCoordsAbove(coords);
        var currentTile = this.getTile(newCoords);
        while (currentTile == tile) {
          newCoords = this.getCoordsAbove(newCoords);
          numTiles++;
          currentTile = this.getTile(newCoords);
        }
        y = numTiles;
      }
    }
    
    var x = String.fromCharCode("A".charCodeAt(0) + x);
    var y = String.fromCharCode("A".charCodeAt(0) + y);
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
    return (coords.tileX > 0) 
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY 
        ,tileX: coords.tileX - 1, tileY: coords.tileY}
      : {tilesetX: coords.tilesetX - 1, tilesetY: coords.tilesetY
        ,tileX: this.size - 1, tileY: coords.tileY};
  };

  // If at right edge of current tileset, get tileset to the right 
  // and left-most tile in same row
  Config.prototype.getCoordsToRight = function(coords) {
    return (coords.tileX < this.size - 1)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX + 1, tileY: coords.tileY}
      : {tilesetX: coords.tilesetX + 1, tilesetY: coords.tilesetY
        ,tileX: 0, tileY: coords.tileY};
  };
  
  // If at top edge of current tileset, get tileset above
  // and bottom-most tile in same column
  Config.prototype.getCoordsAbove = function(coords) {
    return (coords.tileY > 0)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX, tileY: coords.tileY - 1}
      : {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY - 1
        ,tileX: coords.tileX, tileY: this.size - 1};
  };
  
  // If at bottom edge of current tileset, get tileset below
  // and top-most tile in same column
  Config.prototype.getCoordsBelow = function(coords) {
    return (coords.tileY < this.size - 1)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX, tileY: coords.tileY + 1}
      : {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY + 1
        ,tileX: coords.tileX, tileY: 0};
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
  
  return {
    Config : Config
   ,ALL_SAME: ALL_SAME
  };
  
})();