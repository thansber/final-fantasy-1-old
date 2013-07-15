define(/* Map */
["map-coords-absolute", "resources"],
function(MapCoordsAbsolute, Resource) {

  var allMaps = {};
  var greedySpaceRegex = / +/;

  var Map = function(id, opt) {
    opt = $.extend({
      exitOnOutOfBounds: false,
      wrapsX: false,
      wrapsY: false,
      start:{y:0, x:0},
      fillerTile: null
    }, opt);

    this.id = id;
    this.resource = Resource.lookup(this.id);

    this.exitOnOutOfBounds = opt.exitOnOutOfBounds;
    this.wrapsX = opt.wrapsX;
    this.wrapsY = opt.wrapsY;
    this.start = MapCoordsAbsolute.create(opt.start);
    this.filler = opt.fillerTile;

    this.tiles = [];
    this.cols = 0;
    this.rows = 0;

    allMaps[this.id] = this;
  };

  Map.prototype.getTile = function(y, x) { return this.mapping[this.getTileId(y, x) ? this.getTileId(y, x) : this.filler]; };
  Map.prototype.getTileId = function(y, x) { return this.tiles[y] ? this.tiles[y][x] : null; };
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
  Map.prototype.isPassable = function(y, x, transportation) { return this.getTile(y, x).passable & transportation.flag; };
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
  Map.prototype.tileCanHaveBattle = function(coords) { return this.getTile(coords.y, coords.x).hasBattles; };
  Map.prototype.tileMapping = function(mapping) {
    this.mapping = mapping;
    return this;
  };

  var Tile = function(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.desc = opt.desc;
    this.passable = 0;
    this.canHaveBattle = false;
  };
  Tile.prototype.passableBy = function(transportation) {
    var tile = this;
    if (!($.isArray(transportation))) {
      tile.passable += transportation.flag;
    } else {
      $.each(transportation, function(i, val) { tile.passable += transportation.flag; });
    }
    return this;
  };

  return {
    create: function(id, opt) { return new Map(id, opt); },
    lookup: function(id) { return allMaps[id]; },
    newTile: function(opt) { return new Tile(opt); }
  };
});