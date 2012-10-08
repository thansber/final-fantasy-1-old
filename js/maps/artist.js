define(/* MapArtist */
["jquery", "constants/map", "resources"],
function($, MapConstants, Resource) {
  
  var canvas = null;
  var $canvas = null;
  var ctx = null;
  
  // width = # of tiles
  // height = # of tiles
  // scale = # of pixels/tile in a single dimension (assumes tile to be square)
  var resizeCanvas = function(width, height, scale) {
    var w = width * scale;
    var h = height * scale;
    
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
  };
  
  return {
    context: function() { return ctx; },
    draw: function() {
      var map = $canvas.data("map");
      var sheet = Resource.lookup(map);
    },
    drawTile: function(img, whereToPullFrom, whereToDraw) {
      ctx.drawImage(img, 
                    MapConstants.TILE_SIZE * whereToPullFrom.x, // x in source sheet
                    MapConstants.TILE_SIZE * whereToPullFrom.y, // y in source sheet
                    MapConstants.TILE_SIZE, // x-scale on source sheet
                    MapConstants.TILE_SIZE, // y-sacle on source sheet
                    MapConstants.TILE_SIZE * whereToDraw.x, // x on canvas 
                    MapConstants.TILE_SIZE * whereToDraw.y, // y on canvas
                    MapConstants.TILE_SIZE,  // x-scale on canvas
                    MapConstants.TILE_SIZE); // y-sacle on canvas
    },
    init: function() {
      canvas = document.getElementById("view");
      ctx = canvas.getContext("2d");
      $canvas = $(canvas);
      
      resizeCanvas(17, 17, 16);
    },
    resize: function(w, h, s) { resizeCanvas(w,h,s); },
    scrollMap: function(xChange, yChange) {
      if (!!yChange) {
      // Moving up/down
        
      } else if (!!xChange) {
      // Moving left/right
      }
    }
  };
});