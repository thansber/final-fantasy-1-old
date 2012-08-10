define(/* GurguVolcanoMapData */
["jquery", "maps/map", "constants/map"],
function($, Map, MapConstants) {
    
  var tiles_upper = {
    "." : {y:4, x:1, desc:"nothing"},
    "..": {y:1, x:4, desc:"floor", inside:{y:4, x:4}, passable:true},
    "!" : {y:2, x:6, desc:"lava", inside:{y:5, x:6}, passable:true},
    "D" : {y:2, x:5, desc:"door", inside:{y:5, x:5}, passable:true},
    "R" : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top right", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rc": {y:1, x:1, desc:"chest", inside:{y:1, x:6}, passable:true},
    "W" : {y:0, x:4, desc:"wall", inside:{y:3, x:4}},
    "W1": {y:0, x:3, desc:"wall top left", inside:{y:3, x:3}},
    "W2": {y:0, x:5, desc:"wall top right", inside:{y:3, x:5}},
    "W3": {y:1, x:3, desc:"wall left", inside:{y:4, x:3}},
    "W4": {y:1, x:5, desc:"wall right", inside:{y:4, x:5}},
    "^" : {y:0, x:6, desc:"mountain"},
    "^^": {y:3, x:6, desc:"mountain peak"},
    ">" : {y:2, x:3, desc:"stairs up", inside:{y:5, x:3}, passable:true},
    "<" : {y:2, x:4, desc:"stairs down", inside:{y:5, x:4}, passable:true}
  };
  
  var tiles_lower = $.extend({}, tiles_upper, {
    "C" : {y:1, x:1, desc:"candles", inside:{y:4, x:6}},
    "@" : {y:1, x:1, desc:"orb altar", inside:{y:0, x:7}},
    "O" : {y:1, x:1, desc:"orb", inside:{y:4, x:7}},
    "*" : {y:1, x:1, desc:"no idea", inside:{y:1, x:7}},
    "]" : {y:1, x:1, desc:"statue right", inside:{y:2, x:7}},
    "[" : {y:1, x:1, desc:"statue left", inside:{y:3, x:7}}
  });
    
  var init = function() {
      Map.create(MapConstants.GURGU_VOLCANO_B1).tileMapping(tiles_upper)
         .sprites(".  .  .  .  .  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .  .  .  .  .")
         .sprites(".  .  .  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .  .  .")
         .sprites(".  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .")
         .sprites(".  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .")
         .sprites(".  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .")
         .sprites(".  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .")
         .sprites(".  .  ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ .  .")
         .sprites(".  .  ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  .. <  ^  ^  ^  ^  ^  .. .. .. .. .. ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ .  .")
         .sprites(".  ^^ ^^ ^^ ^^ ^  ^  ^  ^  .. .. .. ^  ^  ^  ^  !  !  !  !  .. .. .. .. .. ^  ^  ^  ^  ^^ ^^ ^^ ^^ .")
         .sprites(".  ^^ ^^ ^^ ^  ^  ^  ^  .. .. .. ^  ^  ^  !  !  !  !  !  !  !  .. .. .. .. .. ^  ^  ^  ^  ^^ ^^ ^^ .")
         .sprites(".  ^^ ^^ ^^ ^  ^  ^  .. .. .. ^  ^  !  !  !  !  !  !  !  !  !  !  .. .. .. .. .. ^  ^  ^  ^^ ^^ ^^ .")
         .sprites("^^ ^^ ^^ ^^ ^  ^  ^  .. .. .. .. !  !  !  !  ^  ^^ ^^ ^^ !  !  !  !  .. ^  .. .. .. ^  ^  ^^ ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  ^  .. .. .. !  !  !  !  ^  .  .  .  .  ^^ !  !  !  !  ^  ^  .. .. ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  ^  ^  .. .. !  !  !  ^  .  .  !  !  .  .  ^^ !  !  !  .. ^  ^  .. ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  ^  ^  .. .. !  !  !  ^  .  !  !  !  !  .  ^^ !  !  !  .. ^  ^  >  ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  .. ^  ^  .. !  !  !  ^  .  !  !  !  !  .  ^  !  !  !  .. .. ^  ^  ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  .. ^  ^  .. !  !  !  ^  .  .  !  !  .  .  ^  !  !  !  .. .. ^  ^  ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^  ^  ^  .. .. ^  ^  !  !  !  !  ^  .  .  .  .  ^  !  !  !  !  .. .. .. ^  ^  ^  ^  ^^ ^^ ^^")
         .sprites("^^ ^^ ^^ ^^ ^  ^  .. .. .. ^  .. !  !  !  !  ^  ^  ^  ^  !  !  !  !  .. .. .. .. ^  ^  ^  ^^ ^^ ^^ ^^")
         .sprites(".  ^^ ^^ ^^ ^  ^  ^  .. .. .. .. .. !  !  !  !  !  !  !  !  !  !  ^  ^  .. .. .. ^  ^  ^  ^^ ^^ ^^ .")
         .sprites(".  ^^ ^^ ^^ ^  ^  ^  ^  .. .. .. .. .. !  !  !  !  !  !  !  ^  ^  ^  .. .. .. ^  ^  ^  ^  ^^ ^^ ^^ .")
         .sprites(".  ^^ ^^ ^^ ^^ ^  ^  ^  ^  .. .. .. .. .. !  !  !  !  ^  ^  ^  ^  .. .. .. ^  ^  ^  ^  ^^ ^^ ^^ ^^ .")
         .sprites(".  .  ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  .. .. .. .. ^  ^  ^  ^  ^  ^  .. .. .. ^  ^  ^  ^  ^^ ^^ ^^ ^^ .  .")
         .sprites(".  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .")
         .sprites(".  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .")
         .sprites(".  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^  ^  ^  ^  ^  ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .")
         .sprites(".  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .")
         .sprites(".  .  .  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .  .  .")
         .sprites(".  .  .  .  .  .  .  .  .  .  .  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ .  .  .  .  .  .  .  .  .  .  .")
 
       Map.create(MapConstants.GURGU_VOLCANO_B2).tileMapping(tiles_upper)
          .sprites("R1 R2 R2 R2 R1 R2 R2 R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R4")
          .sprites("R4 R  R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R4")
          .sprites("R4 R  R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R1 R2 R2 R2 R4 R  R4 R  R1 R2 R2 R2 R1 R2 R2 R2 R1 R2 R2 R2 R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 Rc Rc R  R4 R  R4 R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R  R  R4 R  R4 R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R4 R  R  R  R4 R  R4 R  R4 R  R4 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R4 R  R  R  R4 R  R4 Rc R4 R  R  R  R4 R  R  R  R4 R  R  Rc R  R4") 
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R4 R  R  R  R4 R  R4 R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R  R4") 
          .sprites("R4 R  R4 R  R4 R  R  R2 R2 R2 R2 R2 R2 R2 R2 R4 R  R2 R1 R2 R2 R2 R2 R2 R2 R  R  R2 R2 R2 R2 R2 R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R2 R2 R2 R2 R2 R2 R4 R  R4 R  R  R4 R  R2 R2 R1 R2 R2 R2 R1 R2 R2 R2 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R4 R  R4 R  R  R4 R  R  R  R4 R  R  Rc R4 R  R  R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R4 R  R4 R  R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R  R  R4")
          .sprites("R4 R  R4 R  R1 R2 R2 R2 R2 R2 R2 R  R  R4 R  R4 R  R  R4 R  R4 R  R4 R  R4 R  R4 R  R1 R2 R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R4 R  R4 R  R  R4 R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R4 R  R4 R  R  R4 R  R4 R  R  R  R4 R  R  R  R4 R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  R2 R2 R2 R2 R2 R2 R4 R  R  R  R  R4 R  R2 R2 R  R  R2 R2 R  R  R4 R  R2 R2 R4")
          .sprites("R4 R  R4 R  R4 R  R  R  R  R  R  R  R  R4 R  R  R  R  R4 R  R  R  R  R  R  R  R  R  R4 R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  R  Rc R  R  Rc R  R  R4 R  R  R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R  R  R4 R  R  R  R4")
          .sprites("R4 R  R4 R  R4 R  Rc R  R  Rc Rc R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  R  R  R1 R2 R  R  R4")
          .sprites("R4 R  R  R  R4 R  R  R  R  R  Rc Rc R  R4 R  R  R1 R2 R2 R2 R2 R  R  R2 R2 R2 R2 R2 R4 R  R  R  R4")
          .sprites("R4 R  R  R  R4 Rc Rc R  Rc Rc Rc R  R  R4 R  R  R4 R  R  R  R  R  R  R  R  R  Rc R  R4 R  R  R  R4")
          .sprites("R6 R7 R7 R7 R6 R7 R7 R7 R7 R7 R7 R7 R7 R6 R7 R7 R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R6 R7 R7 R7 R4")
          .sprites("W1 W  D  W  W  W  W  W  W  W  W  W  W  W  D  W  W  D  W  W  W  W  W  W  W  W  W  W  W  D  W  W2 .")
          .sprites("W3 <  .. !  !  !  !  .. !  !  !  !  !  !  .. !  !  .. !  !  !  .. .. .. !  !  !  !  !  .. >  W4 .")
          .sprites("W3 !  !  !  .. .. !  !  .. .. .. .. .. !  !  !  !  !  .. .. !  !  !  !  .. !  .. !  !  !  !  W4 .")
          .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .");
          
       // TODO: Check weird surrounding walls for level
       Map.create(MapConstants.GURGU_VOLCANO_B3A).tileMapping(tiles_upper)
          .sprites("R  R7 R7 R7 R7 R7 R7 R7 R7 R  R  R  R  R7 R7 R7 R7 R7 R7 R  R  R7 R7 R7 R7 R  R  R7 R7 R7 R7 R  R  R  R  R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R")
          .sprites("R5 W  W  W  W  W  W  W  W  R4 R  R  R5 W  W  W  W  W  W  R4 R5 W  W  W  W  R4 R5 W  W  W  W  R4 R  R  R5 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  R4")
          .sprites("R5 .. !  .. !  .. !  .. !  R4 R  R  R5 !  .. !  .. .. >  R6 R8 .. .. !  !  R4 R5 !  !  !  .. R4 R  R  R5 !  .. .. .. !  !  .. .. !  !  .. !  !  !  .. .. R4")
          .sprites("R5 !  .. .. !  .. !  .. !  R4 R  R  R5 .. .. .. !  .. .. W  W  .. !  .. .. R4 R5 .. .. .. !  R4 R  R  R5 !  .. .. !  .. .. .. !  .. .. !  .. .. .. !  !  R4")
          .sprites("R5 .. .. !  .. .. !  .. !  R6 R7 R7 R8 !  .. .. .. !  !  !  !  !  .. .. .. R4 R5 .. .. .. .. R6 R7 R7 R8 !  .. !  .. .. .. !  .. .. !  .. .. !  !  .. .. R4")
          .sprites("R5 !  !  .. .. !  .. .. !  W  W  W  W  .. !  .. .. R1 R2 R2 R3 .. .. .. !  R4 R5 !  !  .. .. W  W  W  W  !  .. !  .. R1 R2 R2 R3 !  .. .. !  .. .. .. !  R4")
          .sprites("R5 .. .. .. !  .. .. !  .. .. !  .. .. !  .. .. !  R6 R7 R  R5 .. .. !  .. R6 R8 .. .. !  !  !  .. .. !  .. .. !  .. R4 R  R  R5 !  .. .. !  .. !  !  !  R4")
          .sprites("R5 !  !  !  .. .. !  .. .. !  .. .. !  R1 R3 !  .. W  W  R4 R5 !  !  .. .. W  W  .. .. R1 R3 .. !  .. !  .. .. .. .. R4 R  R  R5 !  .. !  .. .. !  <  !  R4")
          .sprites("R5 .. .. .. .. !  .. .. !  .. .. !  .. R4 R5 .. .. !  !  R4 R5 .. .. .. !  !  !  .. .. R4 R5 .. !  .. .. !  .. .. .. R4 R  R  R5 !  .. !  .. !  !  !  !  R4")
          .sprites("R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R  R5 .. !  .. .. R4 R  R2 R2 R2 R3 .. .. !  .. R4 R5 .. .. !  .. R1 R2 R2 R2 R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  .. .. !  R4 R  R  R  R  R5 !  .. .. !  R4 R5 .. .. !  .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R  R  R  R  R  R  R2 R2 R2 R2 R  R  R2 R2 R2 R2 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R");
          
       Map.create(MapConstants.GURGU_VOLCANO_B3B).tileMapping(tiles_upper)
          .sprites("R  R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 W  W  W  W  W  W  W  W  W  W  W  W  W  W  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 .. .. .. !  !  !  !  !  .. .. .. .. ^^ ^^ R4 R  R7 R7 R7 R7 R7 R7 R  R  R  R  R7 R7 R7 R7 R7 R7 R  R  R7 R7 R7 R7 R7 R7 R  R  R7 R7 R7 R7 R7 R7 R")
          .sprites("R5 !  !  !  !  ^  ^  ^  !  !  !  !  .. .. .. R4 R5 W  W  W  W  W  W  R4 R  R  R5 W  W  W  W  W  W  R4 R5 W  W  W  W  W  W  R4 R5 W  W  W  W  W  W  R4")
          .sprites("R5 ^^ ^^ !  !  !  !  !  !  !  !  !  !  !  !  R6 R8 ^  ^  ^  .. .. .. R6 R7 R7 R8 .. ^^ ^^ ^^ ^^ ^^ R6 R8 ^^ ^^ ^^ ^^ !  !  R6 R8 ^  ^  ^  ^  ^  ^  R4")
          .sprites("R5 .. .. !  !  !  !  !  ^^ ^^ ^^ !  !  .. .. W  W  .. .. !  !  ^  ^  W  W  W  W  .. .. .. !  !  .. W  W  ^  ^  ^  !  !  !  W  W  !  ^^ ^^ ^^ ^^ ^^ R4")
          .sprites("R5 .. .. .. .. !  ^  ^  ^  !  !  !  .. .. .. .. .. !  !  !  !  !  !  .. .. .. .. !  !  !  ^  ^  .. .. .. .. !  !  !  !  .. .. .. !  !  !  <  ^  ^  R4")
          .sprites("R  R2 R3 .. .. R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 !  !  ^^ ^^ ^^ ^^ R1 R2 R2 R3 ^^ ^^ !  !  ^  ^  R1 R3 !  !  !  !  ^  ^  R1 R3 .. !  !  !  !  ^^ R4")
          .sprites("R  R7 R8 .. .. R6 R7 R7 R7 R  R  R  R  R  R  R  R5 ^  ^  ^  ^  ^  ^  R4 R  R  R5 ^  ^  ^  !  !  !  R4 R5 !  ^^ ^^ ^^ ^^ ^^ R4 R5 .. .. !  !  ^  ^  R4")
          .sprites("R5 W  W  .. .. W  W  W  W  R4 R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R  R  R  R  R2 R2 R2 R3 .. .. R4 R  R2 R2 R2 R2 R2 R2 R  R  R2 R3 .. .. R1 R2 R")
          .sprites("R5 .. .. .. .. ^  ^  ^  ^  R4 R  R  R  R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R  R  R  R5 .. .. R6 R7 R7 R7 R  R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R5 .. !  !  ^^ ^^ ^^ ^^ ^^ R4 R  R  R5 W  W  W  W  W  W  W  W  W  W  W  W  W  W  R4 R  R  R5 .. .. W  W  W  W  R4 R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R5 !  !  !  !  .. .. .. .. R6 R7 R7 R8 .. .. .. .. .. !  !  !  !  !  !  !  !  !  R6 R7 R7 R8 .. .. !  ^  ^  ^  R4 R  R  R  R  R  R7 R8 .. .. R6 R7 R")
          .sprites("R5 !  !  !  !  !  !  !  .. W  W  W  W  .. .. !  !  !  !  !  !  !  !  !  !  !  .. W  W  W  W  !  !  !  !  ^^ ^^ R4 R  R  R  R  R5 W  W  .. .. W  W  R4")
          .sprites("R5 .. .. !  !  ^  ^  .. .. .. .. .. .. !  !  ^^ ^^ ^^ !  !  .. .. .. .. .. .. .. .. .. !  !  !  !  !  !  !  ^  R6 R7 R7 R7 R7 R8 !  !  .. .. .. .. R4")
          .sprites("R5 .. .. ^^ ^^ ^^ ^^ !  !  !  !  .. .. !  !  !  !  ^  ^  .. .. .. ^  ^  ^  .. .. .. .. .. .. .. .. !  !  !  !  W  W  W  W  W  W  !  !  !  !  !  ^  R4")
          .sprites("R5 ^  ^  ^  ^  ^  !  !  !  ^  ^  ^  ^  ^  !  !  !  !  !  ^^ ^^ ^  ^^ ^^ ^^ ^^ ^^ ^^ ^^ .. .. .. !  !  !  !  !  !  .. .. .. .. !  !  !  !  ^^ ^^ ^^ R4")
          .sprites("R5 ^^ ^^ ^^ ^^ !  !  ^^ ^^ R1 R2 R2 R3 ^^ ^^ !  !  !  !  !  !  !  ^  ^  ^  ^  ^  R1 R2 R2 R3 !  !  ^  ^  !  !  .. .. .. .. !  !  ^  ^  ^  ^  ^  ^  R4")
          .sprites("R5 ^  ^  ^  ^  ^  ^  ^  ^  R4 R  R  R5 !  !  !  !  !  !  !  ^^ ^^ ^^ ^^ ^^ ^^ ^^ R4 R  R  R5 !  ^^ ^^ ^^ !  .. .. .. !  !  !  !  !  !  ^^ ^^ ^^ ^^ R4")
          .sprites("R  R2 R2 R2 R2 R2 R2 R2 R2 R  R  R  R5 !  !  !  !  !  ^  ^  ^  ^  ^  ^  ^  ^  ^  R4 R  R  R5 !  !  ^  ^  ^  !  R1 R2 R2 R3 !  !  !  !  !  ^  ^  ^  R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R5 !  !  !  !  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ R4 R  R  R5 !  !  !  !  !  !  R4 R  R  R5 ^^ ^^ !  !  !  !  ^^ ^^ R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R  R  R  R5 ^  !  !  !  !  !  R4 R  R  R5 ^  ^  ^  !  !  !  !  !  R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 ^^ ^^ ^^ !  !  !  R4 R  R  R5 ^^ ^^ ^^ ^^ !  !  !  !  R4")
          .sprites("R  R  R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R  R  R  R  R  R  R  R  R  R  R  R  R2 R3 .. .. R1 R2 R  R  R  R  R2 R2 R2 R3 .. .. R1 R2 R")
          .sprites("R  R5 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R8 .. .. R6 R7 R  R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R  R5 ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ W  W  W  W  W  W  W  W  W  W  W  W  W  W  .. .. W  W  R4 R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R  R5 ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  !  !  !  !  ^  ^  ^  ^  ^  ^  ^  !  !  !  .. .. .. R4 R  R7 R7 R7 R7 R7 R8 .. .. R6 R7 R")
          .sprites("R  R5 ^^ ^^ ^^ <  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  .. .. .. .. .. .. !  !  ^^ ^^ ^^ !  !  !  !  .. R4 R5 W  W  W  W  W  W  .. .. W  W  R4")
          .sprites("R  R5 ^  ^  ^  ^  ^  !  !  !  !  !  !  .. .. .. .. .. .. .. .. .. .. !  !  !  !  !  !  !  !  ^  ^  !  !  !  !  R4 R5 ^  ^  !  !  !  !  !  !  !  !  R4")
          .sprites("R  R5 ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ !  !  !  !  !  !  .. .. .. R1 R2 R2 R2 R2 R2 R2 R3 !  !  !  !  !  !  !  !  !  !  R4 R5 ^^ !  !  !  !  !  ^^ ^^ ^^ ^^ R4")
          .sprites("R  R5 ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  !  !  !  !  R4 R  R  R  R  R  R  R5 !  !  !  !  !  !  !  !  ^  ^  R4 R5 !  !  !  ^  ^  ^  ^  ^  ^  ^  R4")
          .sprites("R  R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R  R  R  R  R  R  R  R5 !  !  !  !  !  !  ^^ ^^ ^^ ^^ R4 R5 !  !  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  !  !  !  ^  ^  ^  ^  ^  ^  R4 R5 !  !  !  !  !  !  R1 R2 R2 R2 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ ^^ R4 R5 !  !  !  !  !  !  R4 R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R  R  R2 R2 R2 R2 R2 R2 R  R  R  R  R");

       // Darker shade
       Map.create(MapConstants.GURGU_VOLCANO_B4A).tileMapping(tiles_lower)
          .sprites("R  R7 R7 R7 R7 R7 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  .. .. .. !  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  .. >  .. !  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  .. .. .. !  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  !  !  !  R6 R7 R7 R7 R7 R7 R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  !  !  !  W  W  W  W  W  W  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  !  !  !  !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  R1 R2 R3 !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  R4 R  R5 !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  R6 R7 R8 !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  W  W  W  !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 !  !  !  !  !  !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R5 .. .. .. .. !  !  !  !  !  !  !  R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R")
          .sprites("R5 R1 R2 R3 .. !  !  !  .. .. .. .. W  W  W  W  W  W  W  W  W  W  W  W  R4")
          .sprites("R5 R4 R  R5 .. !  !  !  .. R1 R2 R3 .. !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 R6 R7 R8 .. !  !  !  .. R4 R  R5 .. !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 W  W  W  .. !  !  !  .. R6 R7 R8 .. !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 .. .. .. .. !  !  !  .. W  W  W  .. !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 !  !  !  !  !  !  !  .. .. .. .. .. !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 !  !  !  !  !  !  !  !  !  !  !  !  !  !  .. .. .. .. .. !  !  !  !  R4")
          .sprites("R5 !  !  .. .. .. .. .. !  !  !  !  !  !  !  .. R1 R2 R3 .. !  !  !  !  R4")
          .sprites("R5 !  !  .. R1 R2 R3 .. !  !  !  !  !  !  !  .. R4 R  R5 .. !  !  !  !  R4")
          .sprites("R5 !  !  .. R4 R  R5 .. !  !  !  !  !  !  !  .. R6 R7 R8 .. !  !  !  !  R4")
          .sprites("R5 !  !  .. R6 R7 R8 .. !  !  !  !  !  !  !  .. W  W  W  .. !  !  !  !  R4")
          .sprites("R5 !  !  .. W  W  W  .. !  !  !  !  !  !  !  .. .. .. .. .. !  !  !  >  R4")
          .sprites("R5 !  !  .. .. .. .. .. !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R5 !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  R4")
          .sprites("R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R");
       
       
       Map.create(MapConstants.GURGU_VOLCANO_B4B).tileMapping(tiles_lower)
          .sprites("R1 R2 R2 R2 R2 R3 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R1 R2 R2 R2 R2 R3 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R4 R  Rc R  Rc R5 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R4 Rc R  R  R  R5 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R4 R  R  R  Rc R5 R7 R7 R7 R7 R7 R7 R7 R7 R  R  R  R  R  R  R  R  R7 R7 R7 R7 R7 R7 R7 R7 R4 R  R  R  R  R5 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R4 Rc R  R  Rc R5 W  W  W  W  W  W  W  W  R4 R  R  R  R  R  R  R5 W  W  W  W  W  W  W  W  R4 R  R  R  Rc R5 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R6 R7 R7 R7 R7 R8 .. .. .. .. !  !  !  .. R4 R  R  R  R  R  R  R5 .. .. !  !  !  !  !  !  R6 R7 R7 R7 R7 R8 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("W1 W  D  W  W  W  .. !  !  !  !  !  !  !  R4 R  R  R  R  R  R  R5 !  !  !  !  !  .. .. .. W  W  D  W  W  W  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("W3 .. .. .. !  !  !  !  R1 R2 R2 R3 .. .. R4 R  R  R  R  R  R  R5 .. .. R1 R2 R2 R3 !  !  !  !  .. .. .. <  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("W3 !  !  !  !  !  .. .. R4 R  R  R5 .. .. R4 R  R  R  R  R  R  R5 .. .. R4 R  R  R5 !  !  !  !  !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R2 R2 R2 R2 R2 R2 R2 R2 R  R  R  R5 .. !  R4 R  R1 R2 R2 R2 R2 R3 .. .. R4 R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R5 !  !  R4 R  R4 Rc R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R6 R7 R4 R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R1 R2 R2 R2 R2 R3 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R5 .. .. W  W  R4 R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R4 Rc Rc R  R  R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R5 .. .. !  !  R6 R7 R7 R7 R7 R8 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R7 R7 R7 R7 R7 R7 R7 R7 R4 R  R  R  Rc R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R5 !  !  !  !  W  W  D  W  W  W  .. .. R4 R  R  R  R  R  R  R  R  R  R  R5 W  W  W  W  W  W  W  W  R4 R  R  R  R  R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R2 R3 !  !  !  .. .. .. !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R5 .. .. !  !  !  !  !  !  R6 R7 R7 R7 R7 R8 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  !  !  !  !  !  !  !  !  .. R4 R  R  R  R  R  R  R  R  R  R  R5 .. !  !  !  !  .. .. .. W  W  D  W  W  W  R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R3 !  .. R1 R2 R  R  R  R  R  R  R  R  R  R  R  R5 !  !  R1 R2 R2 R3 !  !  !  .. .. .. .. .. R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R5 !  .. R4 R  R  R5 .. !  !  !  !  !  .. .. R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R1 R2 R2 R2 R2 R3 .. .. R4 R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R4 R  Rc R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  !  R6 R7 R7 R7 R7 R7 R7 R7 R4 R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. !  W  W  W  W  W  W  W  W  R4 R  R  R  Rc R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. !  !  !  !  !  !  .. .. .. R6 R7 R7 R7 R7 R8 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. .. !  !  !  !  !  !  !  W  W  D  W  W  W  .. !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R3 !  !  !  .. .. .. !  !  !  !  R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. !  !  !  !  !  !  !  !  .. R4 R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R3 .. .. R1 R2 R2 R2 R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R1 R2 R2 R2 R2 R3 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R  R  R  R  R  R  R  R  R4 R  R  R  Rc R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R4 R  R  R  Rc R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. W  W  W  W  W  W  W  W  W  W  R4 R  R  R  R  R5 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 !  !  !  !  !  !  !  !  !  !  !  !  R6 R7 R7 R7 R7 R8 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. .. .. .. .. .. !  !  !  !  !  W  W  D  W  W  W  R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .. !  !  !  .. .. .. .. R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. .. !  !  !  !  !  R4")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R3 .. .. R1 R2 R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. !  R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R7 R7 R7 R7 R7 R8 !  !  R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 W  W  W  W  W  W  !  !  R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .. .. !  !  !  !  !  !  R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 >  .. .. .. .. !  !  .. R4 R  R")
          .sprites("R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R  R2 R2 R2 R2 R2 R2 R2 R2 R  R  R");
       
       Map.create(MapConstants.GURGU_VOLCANO_B5).tileMapping(tiles_lower)
          .sprites("R1 R2 R2 R2 R2 R2 R2 R3 W  W  W2 .  .  .  .  .  .  .  .  .  R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .  .  .  .  .  .  .  .  .  W1 W  W  R1 R2 R2 R2 R2 R2 R2 R3")
          .sprites("R4 R  R  R  R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  C  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R  R  R  R  R  R  C  C  R  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  C  Rc R  R5")
          .sprites("R4 R  R  C  R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  R4 R  C  C  R  R  R  R  R  R  R  R  R  R  C  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  C  C  R  R5")
          .sprites("R4 R  R  R  R  C  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R8 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  R  R5")
          .sprites("R6 R7 R7 R7 R7 R7 R7 R8 .. .. W4 .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W1 D  W  W2 W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  W3 .. .. R6 R7 R7 R7 R7 R7 R7 R8")
          .sprites("W1 D  W  W  W  W  W  W  .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W  W  W  W  W  W  D  W2")
          .sprites("W3 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. W4")
          .sprites("W3 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. W4")
          .sprites("W  W  W  W  W  W  W  W  W3 .. .. W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 .. .. .. W  W  W  W  W  W  W  W")
          .sprites(".  .  .  .  .  .  .  .  W  W3 .. .. W2 .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  W1 .. .. .. W  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  W  W3 .. .. W2 .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  W1 .. .. .. W  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  W  W3 .. .. W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. .. W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. W  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  W  W3 !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. W4 W  W  W  W  W  W  W  W  W3 .. .. W4 W  W  W  W  W  W  W  W  .. .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. .. W  W2 .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  W1 W  .. .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  W4 W2 .. .. .. .. W2 .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  W1 .. .. .. .. W1 W3 !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites("R1 R2 R2 R2 R2 R2 R2 R3 .  .  .  .  W3 !  W4 .  W2 .. .. .. .. W2 .  .  .  .  W3 .. .. W4 .  .  .  .  W1 .. .. .. .. W1 .  W3 !  W4 .  .  .  .  R1 R2 R2 R2 R2 R2 R2 R3")
          .sprites("R4 R  R  R  R  R  R  R5 .  .  .  .  W3 !  W4 .  .  W2 .. .. .. .. W2 .  .  .  W3 .. .. W4 .  .  .  W1 .. .. .. .. W1 .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R  R5 .  .  .  .  W3 !  W4 .  .  .  W2 .. .. .. .. W2 .  .  W3 .. .. W4 .  .  W1 .. .. .. .. W1 .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  C  R  R5")
          .sprites("R4 R  R  R  R  R  R  R5 .  .  .  .  W3 !  W4 .  .  .  .  W2 .. .. .. .. W2 .  W3 .. .. W4 .  W1 .. .. .. .. W1 .  .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  C  R5")
          .sprites("R4 R  R  R  R  R  R  R5 .  .  .  .  W3 !  W4 .  .  .  .  .  W2 .. .. .. .. W  .. .. .. .. W  .. .. .. .. W1 .  .  .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R7 R8 .  .  .  .  W3 !  W4 .  .  .  .  .  .  W2 .. !  !  !  !  !  !  !  !  !  !  .. W1 .  .  .  .  .  .  W3 !  W4 .  .  .  .  R6 R7 R  R  R  R  R  R5")
          .sprites("R4 C  R  R  R  R5 D  W  W  W  W  W  .. !  .. W  W  W  W  W  W  W  W2 !  !  !  .. .. .. .. !  !  !  W1 W  W  W  W  W  W  W  .. !  .. W  W  W  W  W  D  R4 R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R5 .. .. .. .. .. .. .. !  .. .. .. .. .. .. .. .. .. !  !  !  .. .. >  .. !  !  !  .. .. .. .. .. .. .. .. .. !  .. .. .. .. .. .. .. R4 R  R  C  R  R5")
          .sprites("R4 R  R  R  R  R  R2 R3 .. .. .. .. .. !  .. .. .. .. .. .. .. .. .. !  !  !  .. .. .. .. !  !  !  .. .. .. .. .. .. .. .. .. !  .. .. .. .. .. R1 R2 R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R  R5 W  W  W  W  .. !  .. W  W  W  W  W  W  W  W1 !  !  !  .. .. .. .. !  !  !  W2 W  W  W  W  W  W  W  W3 !  .. W  W  W  W  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  C  R  C  C  R5 .  .  .  .  W3 !  W4 .  .  .  .  .  .  W1 .. !  !  !  !  !  !  !  !  !  !  .. W2 .  .  .  .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  C  R  R  C  R5 .  .  .  .  W3 !  W4 .  .  .  .  .  W1 .. .. .. .. W1 W3 .. .. W4 W2 .. .. .. .. W2 .  .  .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  C  Rc C  R5 .  .  .  .  W3 !  W4 .  .  .  .  W1 .. .. .. .. W1 .  W3 .. .. W4 .  W2 .. .. .. .. W2 .  .  .  .  W3 !  W4 .  .  .  .  R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  C  R  R5 .  .  .  .  W3 !  W4 .  .  .  W1 .. .. .. .. W1 .  .  W3 .. .. W4 .  .  W2 .. .. .. .. W2 .  .  .  W3 !  W4 .  .  .  .  R4 R  Rc R  R  R  R  R5")
          .sprites("R6 R7 R7 R7 R7 R7 R7 R8 .  .  .  .  W3 !  W4 .  .  W1 .. .. .. .. W1 .  .  .  W3 .. .. W4 .  .  .  W2 .. .. .. .. W2 .  .  W3 !  W4 .  .  .  .  R6 R7 R7 R7 R7 R7 R7 R8")
          .sprites("W  W  W  W  W  W  W  W  .  .  .  .  W3 !  W4 .  W1 .. .. .. .. W1 .  .  .  .  W3 .. .. W4 .  .  .  .  W2 .. .. .. .. W2 .  W3 !  W4 .  .  .  .  W  W  W  W  W  W  W  W")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. W  .. .. .. .. W1 .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  W2 .. .. .. .. W  .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. W4 W  W  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  W  W  W3 .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  .. .. .. W4 W  W  W  W  W  W  W  W  .. .. .. .. W  W  W  W  W  W  W  W  .. .. .. .. !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  W4 .  .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  .  W1 .. !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  .. W2 .  .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  .  W1 .. .. .. W1 W  W  W  W  W  W  W  W  W  W  W  W3 .. .. W4 W  W  W  W  W  W  W  W  W  W  W  W2 .. .. .. W2 .  .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  .  W1 .. .. .. W1 .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  W2 .. .. .. W2 .  .  .  .  .  .  .  .  .")
          .sprites(".  .  .  .  .  .  .  .  W1 .. .. .. W1 .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  W2 .. .. .. W2 .  .  .  .  .  .  .  .")
          .sprites("W1 W  W  W  W  W  W  W  .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W3 .. .. W  W  W  W  W  W  W  W2")
          .sprites("W3 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. W4")
          .sprites("R1 R2 R2 R2 R2 R2 R3 .. .. .. W4 .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. W4")
          .sprites("R4 [  R  @  R  ]  R5 .. .. .. W4 .  .  .  .  .  .  W3 .. .. R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .  .  .  .  .  .  .  .  .  W3 .. .. R1 R2 R2 R2 R2 R2 R2 R3")
          .sprites("R4 R  [  *  ]  R  R5 .. .. .. W4 .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  C  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  R  R5")
          .sprites("R4 R  R  R  R  R  R5 .. .. .. W4 .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  C  Rc R5")
          .sprites("R4 R  [  O  ]  R  R5 .. .. .. W4 .  .  .  .  .  .  W3 .. .. R6 R7 R7 R  R  R  R  R  R  R  R  C  R  C  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R4 R  R  R  R  R  C  R5")
          .sprites("R6 R7 R8 R7 R6 R7 R8 .. .. .. W4 .  .  .  .  .  .  W3 .. .. W  W  D  R4 R  R  R  R  R  R  R  R  R  C  R  R5 .  .  .  .  .  .  .  .  .  W3 .. .. R6 R7 R7 R  R  R  R  R5")
          .sprites("W1 W  W  D  W  W  W  .. .. .. W4 .  .  .  .  .  .  W3 .. .. .. .. .. R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R7 R8 .  .  .  .  .  .  .  .  .  W3 .. .. W  W  D  R4 R  R  R  R5")
          .sprites("W3 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  W3 .. .. W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. R6 R7 R7 R7 R8")
          .sprites("W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W");
  };
    
  return {
    init: init
  };
});