define( 
/* MapCoordsConverter */
["map-coords-absolute", "map-coords-tile"], 
function(MapCoordsAbsolute, MapCoordsTile) {
  
  return {
    absoluteToTile : function(absolute, config) {
      var coords = {
        tilesetY : Math.floor(absolute.y / config.height)
       ,tilesetX : Math.floor(absolute.x / config.width)
       ,tileY : absolute.y % config.height
       ,tileX : absolute.x % config.width
      };
      return MapCoordsTile.create(coords);
    }
   ,tileToAbsolute : function(tile, config) {
      return MapCoordsAbsolute.create({
        y : tile.tilesetY * config.height + tile.tileY
       ,x: tile.tilesetX * config.width + tile.tileX
      });
    }
  };
});