var Movement = (function() {
  
  var moveDistance = 16;
  var $view = null;
  var isMoving = false;
  
  var init = function(opt) {
    $view = $(opt.view);
  };

  var move = function(xChange, yChange) {
    if (isMoving) {
      return;
    }
    isMoving = true;
    var oldPos = $view.css("backgroundPosition").split(" ");
    var oldX = parseInt(oldPos[0].replace("px", ""));
    var oldY = parseInt(oldPos[1].replace("px", ""));
    var newPos = (oldX + xChange) + "px " + (oldY + yChange) + "px";
    $view.stop().animate({backgroundPosition:newPos}, 400, function() { isMoving = false; });
  };
  
  var left = function() { move(moveDistance, 0); };
  var right = function() { move(-1 * moveDistance, 0); };
  var down = function() { move(0, -1 * moveDistance); };
  var up = function() { move(0, moveDistance); };
  var moving = function() { return isMoving; };
  
  return {
    init: init
   ,left: left
   ,right: right
   ,down: down
   ,up: up
   ,moving: moving
  };
  
})();