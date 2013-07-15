define(/* MapArtist */
["jquery", "events", "logger", "constants/map", "resources"],
function($, Event, Logger, MapConstants, Resource) {

  var canvas = null;
  var $canvas = null;
  var ctx = null;
  var pixelsMoved = -1;
  var FPS = 40;

  var moveUpOpt = {
    xExtraTiles: 0,
    xUpperLeftAdjustment: 0,
    yExtraTiles: 1,
    yUpperLeftAdjustment: -1
  };

  var moveDownOpt = {
    xExtraTiles: 0,
    xUpperLeftAdjustment: 0,
    yExtraTiles: 1,
    yUpperLeftAdjustment: 0
  };

  var moveRightOpt = {
    xExtraTiles: 1,
    xUpperLeftAdjustment: -1,
    yExtraTiles: 0,
    yUpperLeftAdjustment: 0
  };

  var moveLeftOpt = {
    xExtraTiles: 1,
    xUpperLeftAdjustment: 0,
    yExtraTiles: 0,
    yUpperLeftAdjustment: 0
  };


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

  var moveOnePixel = function(opt, directionOpt, xAdjustment, yAdjustment) {
    var upperLeftX = opt.position.x - (MapConstants.TILE_SIZE / 2 - 1) + directionOpt.xUpperLeftAdjustment;
    var upperLeftY = opt.position.y - (MapConstants.TILE_SIZE / 2 - 1) + directionOpt.yUpperLeftAdjustment;

    for (var y = 0, yMax = MapConstants.TILE_SIZE + directionOpt.yExtraTiles; y < yMax; y++) {
      for (var x = 0, xMax = MapConstants.TILE_SIZE + directionOpt.xExtraTiles; x < xMax; x++) {
        var tileX = upperLeftX + x;
        var tileY = upperLeftY + y;
        var tile = opt.map.getTile(tileY, tileX);
        drawTile(opt.map.resource.image, {x:tile.x, y:tile.y}, {x:x - xAdjustment, y:y - yAdjustment});
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
    /*draw: function() {
      var map = $canvas.data("map");
      var sheet = Resource.lookup(map);
    },*/
    drawMap: function(map, start) {
      resizeCanvas(16, 14, MapConstants.TILE_SIZE);
      var img = map.resource.image;

      var upperLeftX = start.x - 7;
      var upperLeftY = start.y - 7;
      var img = map.resource.image;

      for (var y = 0; y < 16; y++) { // for now, treat y like x, even though y uses halves
        for (var x = 0; x < 16; x++) {
          var tileX = upperLeftX + x;
          var tileY = upperLeftY + y;
          var tile = map.getTile(tileY, tileX);
          drawTile(img, {x:tile.x, y:tile.y}, {x:x, y:y});
        }
      }
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
      var intervalId = null;
      Event.transmit(Event.Types.MovingChange, true);

      var moveLoop = function() {
        if (!!opt.y) {
          // Moving up/down
          if (opt.y > 0) {
            moveOnePixel(opt, moveUpOpt, 0, parseFloat(pixelsMoved / MapConstants.TILE_SIZE));
          } else {
            moveOnePixel(opt, moveDownOpt, 0, parseFloat(1 - pixelsMoved / MapConstants.TILE_SIZE));
          }
        } else if (!!opt.x) {
          if (opt.x > 0) {
            moveOnePixel(opt, moveRightOpt, parseFloat(pixelsMoved / MapConstants.TILE_SIZE), 0);
          } else {
            moveOnePixel(opt, moveLeftOpt, parseFloat(1 - pixelsMoved / MapConstants.TILE_SIZE), 0);
          }
        }

        pixelsMoved++;

        if (pixelsMoved > MapConstants.TILE_SIZE) {
          Event.transmit(Event.Types.MovingChange, false);
          clearInterval(intervalId);
          Event.transmit(Event.Types.MovementCallback);
        }
      };

      intervalId = setInterval(moveLoop, 1000 / FPS);
    }
  };
});