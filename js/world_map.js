var WorldMap = (function() {
  
  var TILESET_SIZE = 16;
  var rows = 2, cols = 2;
  var tilesets = [];
  
  for (var i = 0; i < cols; i++) {
    tilesets[i] = [];
  }
  
  tilesets[0][0] = ["wwwx  ffffffffff"
                   ,"wwwwx ffffffffff"
                   ,"wwwwwx ffffffff "
                   ,"wwwwww   ffff   "
                   ,"wwwwwwx         "
                   ,"wwwwwwwx        "
                   ,"wwwwwwwwx       "
                   ,"wwwwwwwwwx      "
                   ,"wwwwwwwwwwwx    "
                   ,"wwwwwwwwwwwwwwx "
                   ,"wwwwwwwwwwwwwwwx"
                   ,"wwwwwwwwwwwwwwwx"
                   ,"wwwwwwwwwwwwwwx "
                   ,"wwwwwwwwwwwwwx  "
                   ,"wwwwwwwwwwwwx   "
                   ,"wwwwwwwwwwww    "];
  
  tilesets[0][1] = ["xwwwwwwwwwwwww  "
                   ," wwwwwwwwwwwww m"
                   ,"xwwwwwwwwwwwwx m"
                   ,"wwwwwwwwwwwwx   "
                   ,"wwwwwwwwwwx     "
                   ,"wwwwwwwwwx      "
                   ,"xwwwwwwx    xwww"
                   ,"  xwwwx    xwwww"
                   ,"   xwwwwwwwwwwww"
                   ,"    xx    xwwwww"
                   ,"     ffffffffxww"
                   ,"    ffffffffffxw"
                   ,"   ffffffffffffx"
                   ,"  fffff CC fffff"
                   ,"  ffff <CC> ffff"
                   ,"  fff (<CC>) fff"];
  
  tilesets[1][0] = ["wwwwwwwwwwwwx   "
                   ,"wwwwwwwwwwwwwx  "
                   ,"wwwwwwwwwwwwwwwx"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"];
  
  tilesets[1][1] = ["  fff (TttT) fff"
                   ,"  fff (TttT) fff"
                   ,"  fff (TttT) fff"
                   ,"  ffff(-tt-)ffff"
                   ,"x fffff    fffff"
                   ,"w  ffff    ffff "
                   ,"wx  fff    fff  "
                   ,"ww            xw"
                   ,"wwx    DDD  xwww"
                   ,"www    DwD xwwww"
                   ,"wwwx   Dwxwwwwww"
                   ,"wwww    wwwwwwww"
                   ,"wwww   xwwwwwwww"
                   ,"wwww  xwwwwwwwww"
                   ,"wwwwxxwwwwwwwwww"
                   ,"wwwwwwwwwwwwwwww"];
  
  var tileMapping = {
    " " : {cssClass:"none"}
   ,"f" : {cssClass:"forest", hasCorners:true, hasSides:true, borderTile:"f"}
   ,"m" : {cssClass:"mountain", hasCorners:true, hasSides:true, borderTile:"m"}
   ,"w" : {cssClass:"water", hasSides:true, borderTile:"wx"}
   ,"x" : {cssClass:"coastline", hasCorners:true, borderTile:"wx"}
   
   ,"t" : {cssClass:"town empty"}
   ,"T" : {cssClass:"town"}
   ,"(" : {cssClass:"wall left", block:{width:1,height:5}}
   ,")" : {cssClass:"wall right", block:{width:1,height:5}}
   ,"<" : {cssClass:"wall top left", block:{width:1, height:2}}
   ,">" : {cssClass:"wall top right", block:{width:1, height:2}}
  };
  
  var getTileset = function(x, y) { return tilesets[y] ? tilesets[y][x] : null; };
  
  var getTile = function(coords) {
    var tileset = getTileset(coords.tilesetX, coords.tilesetY);
    if (!tileset) {
      return null;
    }
    var row = tileset[coords.tileY];
    if (!row) {
      return null;
    }
    return row.charAt(coords.tileX); 
  };
  
  var getTileClass = function(tile) {
    var mapping = getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClass;
  };
  
  var getTileMapping = function(tile) { return tileMapping[tile]; };
  
  var getTileClasses = function(coords) {
    var tile = getTile(coords);
    var mapping = getTileMapping(tile);
    var surrounding = getSurroundingTiles(coords);
    
    var cssClasses = [];
    cssClasses.push(getTileClass(tile));
    
    if (mapping) {
      if (mapping.hasCorners) {
        cssClasses.push(determineCornerClass(surrounding, mapping.borderTile));
      }
      if (mapping.hasSides) {
        cssClasses.push(determineSideClass(surrounding, mapping.borderTile));
      }
      if (mapping.block) {
        cssClasses.push(determineBlockClass(coords, tile, mapping));
      }
    }
    
    return cssClasses.join(" ");
  };
  
  var determineCornerClass = function(surrounding, borderTiles) {
    var count = 0;
    var tilesToCheck = "";
    for (var i = 0; i < borderTiles.length; i++) {
      count += countSurroundingForType(surrounding, borderTiles[i]);
      tilesToCheck += borderTiles[i];
      if (count == 2) {
        var leftMatch = isTileOfType(surrounding.left, tilesToCheck);
        var topMatch = isTileOfType(surrounding.top, tilesToCheck);
        var bottomMatch = isTileOfType(surrounding.bottom, tilesToCheck);
        var rightMatch = isTileOfType(surrounding.right, tilesToCheck);

        if (leftMatch && topMatch) { return "br"; }
        else if (leftMatch && bottomMatch) { return "tr"; }
        else if (rightMatch && topMatch) { return "bl"; }
        else if (rightMatch & bottomMatch) { return "tl"; }
      }
    }
    return "";
  };
  
  var determineSideClass = function(surrounding, borderTiles) {
    var count = countSurroundingForType(surrounding, borderTiles);
    if (count == 3) {
      var leftMatch = isTileOfType(surrounding.left, borderTiles);
      var topMatch = isTileOfType(surrounding.top, borderTiles);
      var bottomMatch = isTileOfType(surrounding.bottom, borderTiles);
      var rightMatch = isTileOfType(surrounding.right, borderTiles);
      
      if (!leftMatch) { return "left"; }
      else if (!topMatch) { return "top"; }
      else if (!bottomMatch) { return "bottom"; }
      else if (!rightMatch) { return "right"; }
    }
    return "";
  };
  
  var determineBlockClass = function(coords, tile, mapping) {
    var x = 0;
    if (mapping.block.width > 1) {
      
    }
    
    var y = 0;
    if (mapping.block.height > 1) {
      var tileAbove = getTile(getCoordsAbove(coords));
      var tileBelow = getTile(getCoordsBelow(coords));
      if (tileAbove != tile) {
        y = 0;
      } else if (tileBelow != tile) {
        y = mapping.block.height - 1;
      } else {
        // figure out how many of the same tile are above the current one
        var numTiles = 0;
        var newCoords = getCoordsAbove(coords);
        var currentTile = getTile(newCoords);
        while (currentTile == tile) {
          newCoords = getCoordsAbove(newCoords);
          numTiles++;
          currentTile = getTile(newCoords);
        }
        y = numTiles;
      }
    }
    
    var x = String.fromCharCode("A".charCodeAt(0) + x);
    var y = String.fromCharCode("A".charCodeAt(0) + y);
    return x + y;
  };
  
  var countSurroundingForType = function(surrounding, tile) {
    var count = 0;
    for (var s in surrounding) {
      if (isTileOfType(surrounding[s], tile)) {
        count++;
      }
    }
    return count;
  }
  
  var getSurroundingTiles = function(coords) {
    return {
      top: getTile(getCoordsAbove(coords))
     ,left: getTile(getCoordsToLeft(coords))
     ,right: getTile(getCoordsToRight(coords))
     ,bottom: getTile(getCoordsBelow(coords))
    };
  };
  
  // If at left edge of current tileset, get tileset to the left 
  // and right-most tile in same row
  var getCoordsToLeft = function(coords) {
    return (coords.tileX > 0) 
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY 
        ,tileX: coords.tileX - 1, tileY: coords.tileY}
      : {tilesetX: coords.tilesetX - 1, tilesetY: coords.tilesetY
        ,tileX: TILESET_SIZE - 1, tileY: coords.tileY};
  };

  // If at right edge of current tileset, get tileset to the right 
  // and left-most tile in same row
  var getCoordsToRight = function(coords) {
    return (coords.tileX < TILESET_SIZE - 1)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX + 1, tileY: coords.tileY}
      : {tilesetX: coords.tilesetX + 1, tilesetY: coords.tilesetY
        ,tileX: 0, tileY: coords.tileY};
  };
  
  // If at top edge of current tileset, get tileset above
  // and bottom-most tile in same column
  var getCoordsAbove = function(coords) {
    return (coords.tileY > 0)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX, tileY: coords.tileY - 1}
      : {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY - 1
        ,tileX: coords.tileX, tileY: TILESET_SIZE - 1};
  };
  
  // If at bottom edge of current tileset, get tileset below
  // and top-most tile in same column
  var getCoordsBelow = function(coords) {
    return (coords.tileY < TILESET_SIZE - 1)
      ? {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY
        ,tileX: coords.tileX, tileY: coords.tileY + 1}
      : {tilesetX: coords.tilesetX, tilesetY: coords.tilesetY + 1
        ,tileX: coords.tileX, tileY: 0};
  };
  
  var isTileOfType = function(tile, type) { 
    return !tile || type.indexOf(tile) > -1; 
  };  
  var maxTilesetX = function() { 
    return tilesets[0].length; 
  };
  var maxTilesetY = function() { 
    return tilesets.length; 
  };
  
  var validateTileSet = function(tileset, x, y) {
    if (tileset.length != TILESET_SIZE) {
      alert("Tileset[" + x + "][" + y + "] has " + tileset.length + " rows, it should have " + TILESET_SIZE);
      return false;
    }
    
    for (var i = 0; i < TILESET_SIZE; i++) {
      if (tileset[i].length != TILESET_SIZE) {
        alert("Tileset[" + x + "][" + y + "], row " + i + " has " + tileset[i].length + " cols, it should have " + TILESET_SIZE);
        return false;
      }
    }
    
    return true;
  }
  
  return {
    getSurroundingTiles: getSurroundingTiles
   ,getTileClass: getTileClass
   ,getTileClasses: getTileClasses
   ,getTileMapping: getTileMapping
   ,getTileset: getTileset
   ,getTile: getTile
   ,maxTilesetX: maxTilesetX
   ,maxTilesetY: maxTilesetY
   ,validateTileSet: validateTileSet
   
   ,TILESET_SIZE: TILESET_SIZE
  };
  
})();