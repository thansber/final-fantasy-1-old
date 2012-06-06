define(/* TitansTunnelMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var tiles = {
    "." : {y:4, x:1, desc:"nothing"},
    "..": {y:0, x:3, desc:"floor", inside:{y:1, x:3}, passable:true},
    "D" : {y:2, x:4, desc:"door", inside:{y:3, x:4}, passable:true},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rc": {y:1, x:1, desc:"chest", inside:{y:4, x:3}, passable:true},
    "W" : {y:2, x:3, desc:"wall", inside:{y:3, x:3}},
    "^" : {y:0, x:4, desc:"mountain", inside:{y:1, x:4}},
    "^^": {y:0, x:5, desc:"mountain peak", inside:{y:1, x:5}},
    ">" : {y:2, x:5, desc:"stairs up", inside:{y:3, x:5}, passable:true}
  };
  
  var init = function() {
    Map.create(MapConstants.TITANS_TUNNEL, {hasBattles:false, start:{y:23, x:16}}).tileMapping(tiles)
       .sprites(".  .  ^^ ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  ^  .. .. ^  .  .  .  .  .  .  ^  ^^ .  .  .  .  .")
       .sprites("^^ .. .. .. .. ^  ^^ .  .  .  ^  .. .. ^  .  .  .  .")
       .sprites("^  ^  ^^ .. .. >  ^  .  .  .  ^^ ^  .. ^  .  .  .  .")
       .sprites("^  .. .. .. .. ^^ ^^ .  .  .  ^  .. ^^ ^  ^  .  .  .")
       .sprites("^^ .. .. .. .. .. ^  .  .  ^  .. .. .. .. ^  ^  .  .")
       .sprites("^^ .. .. .. ^  ^  ^^ ^^ ^  .. .. ^^ .. .. .. ^  ^  .")
       .sprites("^  ^^ ^  .. .. ^  .. .. .. .. .. .. ^  .. .. ^  .  .")
       .sprites("^  ^^ ^  .. .. .. .. .. ^  ^^ ^  ^^ .. .. .. ^  ^^ .")
       .sprites(".  ^  ^^ .. .. ^^ ^^ ^  .  .  ^  .. .. .. ^^ ^  .  .")
       .sprites(".  .  ^  ^  .. .. ^  .  .  .  ^^ .. ^  ^^ .. ^^ ^  ^^")
       .sprites(".  .  ^  .. .. ^  ^^ .  .  ^  .. .. .. .. .. ^^ ^  .")
       .sprites("^  ^^ .. .. ^^ ^  .  .  ^^ .. .. .. .. .. ^  ^^ .  .")
       .sprites("^  .. .. .. ^^ .  .  ^  .. .. .. .. .. ^^ .  .  .  .")
       .sprites("^^ .. .. ^  .  .  ^^ ^  ^  ^^ .. >  ^  ^  ^  .  .  .")
       .sprites(".  ^  .. ^  .  .  ^^ ^  ^^ ^  ^  ^^ ^^ .  .  .  .  .")
       .sprites(".  ^  .. ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  ^^ .. .. .. ^^ ^  ^^ ^^ ^  .  .  .  .  .  .  .  .")
       .sprites(".  ^  .. .. R1 R2 R2 R2 R2 R3 ^^ .  .  .  .  .  .  .")
       .sprites(".  ^^ .. .. R4 Rc Rc Rc Rc R5 .. ^  .  .  .  .  .  .")
       .sprites(".  ^^ .. .. R6 R7 R7 R7 R7 R8 .. ^  .  .  .  .  .  .")
       .sprites(".  .  ^  .. W  W  W  W  D  W  .. ^^ .  .  .  .  .  .")
       .sprites(".  .  ^^ .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  ^  ^^ ^  ^^ ^^ ^^ ^^ .  .  .  .  .  .  .  .");
  };
  
  return {
    init: init
  };
});