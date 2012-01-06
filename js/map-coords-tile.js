define( 
/* MapCoordsTile */
function() {

// Parameters can either be an object or the 4 coordinates
  // TilesetY, TilesetX, TileY, TileX
  var Coords = function(opt) {
    opt = opt || {tilesetY:0, tilesetX:0, tileY:0, tileX:0};
    this.tilesetY = opt.tilesetY;
    this.tilesetX = opt.tilesetX;
    this.tileY = opt.tileY;
    this.tileX = opt.tileX;
  };
  Coords.prototype.toString = function() {
    return "tileset[" + this.tilesetY + "," + this.tilesetX + "], tile[" + this.tileY + "," + this.tileX + "]";
  };
  
  return {
    create : function(opt) { return new Coords(opt); }
  };
});