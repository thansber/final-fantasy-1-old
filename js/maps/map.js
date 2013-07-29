define(/* Map */
["resources"],
function(Resource) {

  var allMaps = {};
  var greedySpaceRegex = / +/;

  var Map = function(id, opt) {
    opt = $.extend({
      exitOnOutOfBounds: false,
      wrapsX: false,
      wrapsY: false,
      start:{y:0, x:0},
      inside: false
    }, opt);

    this.id = id;
    this.resource = Resource.lookup(this.id);

    this.exitOnOutOfBounds = opt.exitOnOutOfBounds;
    this.wrapsX = opt.wrapsX;
    this.wrapsY = opt.wrapsY;
    this.start = new Coords(opt.start);
    this.inside = opt.inside;
    // filler set from tile mapping

    this.tiles = [];
    this.cols = 0;
    this.rows = 0;

    allMaps[this.id] = this;
  };

  Map.prototype.getTile = function(y, x) { return this.mapping[this.getTileId(y, x) ? this.getTileId(y, x) : this.filler]; };
  Map.prototype.getTileId = function(y, x) { return this.tiles[y] ? this.tiles[y][x] : null; };
  Map.prototype.is = function(id) { return this.id == id; };
  Map.prototype.isOutOfBounds = function(coords) {
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
    for (var m in mapping) {
      if (mapping[m].filler) {
        this.filler = m;
      }
    }
    this.mapping = mapping;
    return this;
  };

  /**
   * Args can be 2 params - y, x
   * or a object containing y and x
   */
  var Coords = function(opt) {
    opt = opt || {x:0, y:0};
    this.y = opt.y;
    this.x = opt.x;
  };
  Coords.prototype.adjust = function(yChange, xChange, map) {
    this.y += yChange;
    this.x += xChange;
    if (map.wrapsY && this.y < 0) { this.y = map.rows; }
    if (map.wrapsX && this.x < 0) { this.x = map.cols; }
    if (map.wrapsY && this.y > map.rows) { this.y = 0; }
    if (map.wrapsX && this.x > map.cols) { this.x = 0; }
    return this;
  };
  Coords.prototype.equals = function(other) {
    return this.y == other.y && this.x == other.x;
  };
  Coords.prototype.toTile = function(map) {
    return {
      tilesetY : Math.floor(this.y / map.height),
      tilesetX : Math.floor(this.x / map.width),
      tileY : this.y % map.height,
      tileX : this.x % map.width
    };
  };
  Coords.prototype.toString = function() {
    return "[" + this.y + "," + this.x + "]";
  };

  var Tile = function(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.description = opt.desc;
    this.passable = 0;
    this.canHaveBattle = false;
    this.filler = false;
  };
  Tile.prototype.desc = function(d) {
    this.description = d;
    return this;
  };
  Tile.prototype.isFiller = function() {
    this.filler = true;
    return this;
  };
  Tile.prototype.hasBattle = function() {
    this.canHaveBattle = true;
    return this;
  };
  Tile.prototype.inside = function(coords) {
    this.inside = coords;
    return this;
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
    Coords: Coords,
    create: function(id, opt) { return new Map(id, opt); },
    lookup: function(id) { return allMaps[id]; },
    newTile: function(opt) { return new Tile(opt); }
  };
});