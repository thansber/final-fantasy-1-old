var MovementHelper = (function() {
  
  var event = function($target) {
    if ($target.is("a")) { move($target); }
    else if ($target.is(".start.listening")) { Movement.startListening(); }
    else if ($target.is(".stop.listening")) { Movement.stopListening(); }
  };
  
  var move = function($target) {
    if ($target.hasClass("left")) { Movement.left(); }
    else if ($target.hasClass("right")) { Movement.right(); }
    else if ($target.hasClass("down")) { Movement.down(); }
    else if ($target.hasClass("up")) { Movement.up(); }
  };

  return {
    event: event
   ,move: move
  };
})();