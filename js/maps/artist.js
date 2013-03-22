define(/* MapArtist */
["jquery", "logger", "constants/map", "resources"],
function($, Logger, MapConstants, Resource) {
  
  var canvas = null;
  var $canvas = null;
  var ctx = null;
  var pixelsMoved = -1;
  
  var drawTile = function(img, whereToPullFrom, whereToDraw) {
    ctx.drawImage(img, 
        MapConstants.TILE_SIZE * whereToPullFrom.x, // x in source sheet
        MapConstants.TILE_SIZE * whereToPullFrom.y, // y in source sheet
        MapConstants.TILE_SIZE, // x-scale on source sheet
        MapConstants.TILE_SIZE, // y-sacle on source sheet
        MapConstants.TILE_SIZE * whereToDraw.x, // x on canvas 
        MapConstants.TILE_SIZE * whereToDraw.y, // y on canvas
        MapConstants.TILE_SIZE,  // x-scale on canvas
        MapConstants.TILE_SIZE); // y-sacle on canvas
  };
  
  var moveOnePixel = function(opt, directionOpt) {
    var upperLeftX = opt.position.x - (MapConstants.TILE_SIZE / 2 - 1) + directionOpt.xUpperLeftAdjustment;
    var upperLeftY = opt.position.y - (MapConstants.TILE_SIZE / 2 - 1) + directionOpt.yUpperLeftAdjustment;
    var img = opt.map.resource.image;
    
    for (var y = 0, yMax = MapConstants.TILE_SIZE + directionOpt.yExtraTiles; y < yMax; y++) { 
      for (var x = 0, xMax = MapConstants.TILE_SIZE + directionOpt.xExtraTiles; x < xMax; x++) {
        var tileX = upperLeftX + x;
        var tileY = upperLeftY + y;
        var tile = opt.map.getTile(tileY, tileX);
        drawTile(img, {x:tile.x, y:tile.y}, {x:x - directionOpt.xAdjustment, y:y - directionOpt.yAdjustment});
      }
    }
  };
  
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
    drawTile: drawTile,
    init: function() {
      canvas = document.getElementById("view");
      ctx = canvas.getContext("2d");
      $canvas = $(canvas);
      
      resizeCanvas(17, 17, 16);
    },
    resize: function(w, h, s) { resizeCanvas(w,h,s); },
    moveOneSquare: function(opt) {
      var pixelsMoved = 1;
      var baseDirectionOpt = {
          xExtraTiles: 0, 
          xUpperLeftAdjustment: 0, 
          xAdjustment: 0,
          yExtraTiles: 0, 
          yUpperLeftAdjustment: 0, 
          yAdjustment: 0,
      };

      var moveLoop = function() {
        if (pixelsMoved < MapConstants.TILE_SIZE) {
          requestAnimationFrame(moveLoop);
        }
        
        var directionOpt = {};
        
        if (!!opt.y) {
          // Moving up/down
          if (opt.y > 0) {
            directionOpt = $.extend(baseDirectionOpt, {
              yExtraTiles: 1, 
              yUpperLeftAdjustment: -1, 
              yAdjustment: parseFloat(pixelsMoved / MapConstants.TILE_SIZE)
            });
          } else {
            directionOpt = $.extend(baseDirectionOpt, {
              yExtraTiles: 1, 
              yAdjustment: parseFloat(1 - pixelsMoved / MapConstants.TILE_SIZE)
            });
          }
        } else if (!!opt.x) {
          if (opt.x > 0) {
            directionOpt = $.extend(baseDirectionOpt, {
              xExtraTiles: 1, 
              xUpperLeftAdjustment: -1, 
              xAdjustment: parseFloat(pixelsMoved / MapConstants.TILE_SIZE)
            });
          } else {
            directionOpt = $.extend(baseDirectionOpt, {
              xExtraTiles: 1, 
              xAdjustment: parseFloat(1 - pixelsMoved / MapConstants.TILE_SIZE)
            })
          }
        }
        
        moveOnePixel(opt, directionOpt);
        pixelsMoved++;
      };
      
      requestAnimationFrame(moveLoop);
    }
  };
});