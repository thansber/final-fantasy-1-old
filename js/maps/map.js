define(/* Map */
["map-coords-absolute", "resources"],
function(MapCoordsAbsolute, Resource) {
  
  var allMaps = {};
  var greedySpaceRegex = / +/;
  
  var Map = function(id, opt) {
    opt = $.extend({
      hasBattles: true, 
      exitOnOutOfBounds: false, 
      wrapsX: false, 
      wrapsY: false,
      start:{y:0, x:0}
    }, opt);

    this.id = id;
    this.resource = Resource.lookup(this.id);

    this.hasBattles = opt.hasBattles;
    this.exitOnOutOfBounds = opt.exitOnOutOfBounds;
    this.wrapsX = opt.wrapsX;
    this.wrapsY = opt.wrapsY;
    this.start = MapCoordsAbsolute.create(opt.start);
    
    this.tiles = [];
    this.cols = 0;
    this.rows = 0;
    
    allMaps[this.id] = this;
  };
  
  Map.prototype.getTile = function(y, x) { return this.mapping[this.getTileId(y, x)]; };
  Map.prototype.getTileId = function(y, x) { return this.tiles[y][x]; };
  Map.prototype.is = function(id) { return this.id == id; };
  Map.prototype.isOutsideTownMap = function(coords) {
    if (!this.exitOnOutOfBounds) {
      return false;
    }
    if (coords.x < 0 || coords.y < 0) {
      return true;
    }
    return coords.x >= this.cols || coords.y >= this.rows;
  };
  Map.prototype.repeatSprites = function(row, num) {
    for (var i = 0; i < num; i++) {
      this.sprites(row);
    }
    return this;
  }
  Map.prototype.sprites = function(row) {
    var rowTiles = row.split(greedySpaceRegex);
    if (this.cols === 0) {
      this.cols = rowTiles.length;
    }
    this.rows++;
    this.tiles.push(rowTiles);
    return this;
  };
  
  Map.prototype.tileMapping = function(mapping) {
    this.mapping = mapping;
    return this;
  };
  
  return {
    create: function(id, opt) { return new Map(id, opt); },
    lookup: function(id) { return allMaps[id]; }
  };
});