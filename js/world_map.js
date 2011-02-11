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
                   ,"  ffff WCCW ffff"
                   ,"  fff WWCCWW fff"];
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
  tilesets[1][1] = ["  fff WTttTW fff"
                   ,"  fff WTttTW fff"
                   ,"  fff WTttTW fff"
                   ,"  ffffWWttWWffff"
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
  };
  
  var getTileset = function(x, y) { return tilesets[y] ? tilesets[y][x] : null; };
  
  var getTile = function(tileset, x, y) { 
    if (!tileset) {
      return null;
    }
    var row = tileset[y];
    if (!row) {
      return null;
    }
    return row.charAt(x); 
  };
  
  var getTileClass = function(tile) {
    var mapping = getTileMapping(tile); 
    if (!mapping) {
      return "unknown";
    }
    
    return mapping.cssClass;
  };
  
  var getTileMapping = function(tile) { return tileMapping[tile]; };
  
  var getTileClasses = function(tilesetX, tilesetY, tileX, tileY) {
    var tileset = getTileset(tilesetX, tilesetY);
    var tile = getTile(tileset, tileX, tileY);
    var mapping = getTileMapping(tile);
    var surrounding = getSurroundingTiles(tilesetX, tilesetY, tileX, tileY);
    
    var cssClasses = [];
    cssClasses.push(getTileClass(tile));
    
    if (mapping) {
      if (mapping.hasCorners) {
        cssClasses.push(determineCornerClass(surrounding, mapping.borderTile));
      }
      if (mapping.hasSides) {
        cssClasses.push(determineSideClass(surrounding, mapping.borderTile));
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
  
  var countSurroundingForType = function(surrounding, tile) {
    var count = 0;
    for (var s in surrounding) {
      if (isTileOfType(surrounding[s], tile)) {
        count++;
      }
    }
    return count;
  }
  
  var getSurroundingTiles = function(tilesetX, tilesetY, tileX, tileY) {
    var tileset = getTileset(tilesetX, tilesetY);
    
    var leftTile, topTile, rightTile, bottomTile;
    
    // Left edge of current tileset, get tileset to the left 
    // and right-most tile in same row
    leftTile = (tileX > 0) 
      ? getTile(tileset, tileX - 1, tileY)
      : getTile(getTileset(tilesetX - 1, tilesetY), TILESET_SIZE - 1, tileY);
    
    // Right edge of current tileset, get tileset to the right 
    // and left-most tile in same row
    rightTile = (tileX < TILESET_SIZE - 1)
      ? getTile(tileset, tileX + 1, tileY)
      : getTile(getTileset(tilesetX + 1, tilesetY), 0, tileY);
    
    // Top edge of current tileset, get tileset above
    // and bottom-most tile in same column
    topTile = (tileY > 0)
      ? getTile(tileset, tileX, tileY - 1)
      : getTile(getTileset(tilesetX, tilesetY - 1), tileX, TILESET_SIZE - 1);
    
    bottomTile = (tileY < TILESET_SIZE - 1)
      ? getTile(tileset, tileX, tileY + 1)
      : getTile(getTileset(tilesetX, tilesetY + 1), tileX, 0);
      
    return {left:leftTile, top:topTile, right:rightTile, bottom:bottomTile};
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