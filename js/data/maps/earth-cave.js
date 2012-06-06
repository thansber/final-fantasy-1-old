define(/* */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var tiles = {
    "." : {y:9, x:4, desc:"nothing"},
    "..": {y:0, x:3, desc:"floor", inside:{y:1, x:3}, passable:true},
    "D" : {y:6, x:5, desc:"door", inside:{y:7, x:5}, passable:true},
    "R" : {y:1, x:1, desc:"room empty", inside:{y:9, x:4}, passable:true},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rc": {y:1, x:1, desc:"chest", inside:{y:4, x:1}, passable:true},
    "W" : {y:0, x:4, desc:"wall", inside:{y:1, x:4}},
    "W1": {y:2, x:3, desc:"wall top left", inside:{y:4, x:3}},
    "W2": {y:2, x:4, desc:"wall top right", inside:{y:4, x:4}},
    "W3": {y:3, x:3, desc:"wall left", inside:{y:5, x:3}},
    "W4": {y:3, x:4, desc:"wall right", inside:{y:5, x:4}},
    "x" : {y:1, x:1, desc:"spikes", inside:{y:9, x:1}},
    "X" : {y:1, x:1, desc:"spikes rising", inside:{y:9, x:0}},
    "x" : {y:1, x:1, desc:"spikes", inside:{y:9, x:1}},
    "@" : {y:1, x:1, desc:"orb altar", inside:{y:9, x:2}},
    "*" : {y:1, x:1, desc:"no idea", inside:{y:9, x:3}},
    "^^": {y:0, x:5, desc:"mountain peak", inside:{y:1, x:5}}, // MISSING
    "]" : {y:1, x:1, desc:"statue right", inside:{y:8, x:3}},
    "[" : {y:1, x:1, desc:"statue left", inside:{y:8, x:4}},
    ">" : {y:2, x:5, desc:"stairs up", passable:true, inside:{y:4, x:5}},
    "<" : {y:3, x:5, desc:"stairs down", passable:true, inside:{y:5, x:5}}
  };
  
  var init = function() {
    Map.create(MapConstants.EARTH_CAVE_B1).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  ^  ^  ^  ^  ^  ^  ^  .. .. ^  ^  ^  ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  ^  ^  .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  ^  .. .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  ^  .. R1 R2 R2 R2 R2 R2 R3 .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .. .. ^  .  .  ^  .. R4 Rc R  R  R  R  R5 .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. ^  .  .  ^  .. R6 R7 R  R  R  R  R5 .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  ^  .. .. .. .. ^  .  .  ^  .. W  W  R6 R7 R7 R7 R8 .. ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  ^  .. .. .. .. .. .. .. .. .. ^  .  ^  .. .. ^  ^  ^  .  .  ^  .. .. .. W  W  W  D  W  .. ^  .  .  .  .  .  .  .")
       .sprites("^  ^  ^  ^  ^  ^  ^  .. .. .. .. .. .. .. .. .. ^  .  ^  .. .. ^  .  .  .  .  ^  ^  ^  .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .")
       .sprites("^  .. .. .. .. .. .. .. .. ^  ^  ^  ^  ^  .. .. ^  ^  ^  .. .. ^  ^  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .")
       .sprites("^  .. .. .. .. .. .. .. .. ^  .  .  .  ^  .. .. ^  .. .. .. .. .. ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. ^  ^  ^  ^  ^  ^  ^  .  .  .  ^  .. .. .. .. .. .. .. .. .. .. .. ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. ^  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. >  .. .. .. .. .. .. .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. ^  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  .. .. .. .. .. ^  .. .. .. .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. ^  .. .. ^  ^  ^  ^  ^  ^  ^  .. .. ^  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. ^  ^  ^  ^  ^  .  .  .  .  ^  ^  ^  ^  ^  ^  .. .. ^  ^  ^  .. .. ^  ^  ^  .  .  .  ^  .. .. ^  .  .  .  .  .  .  .  .  .")
       .sprites("^  .. .. .. .. .. .. ^  ^  ^  ^  ^  ^  .. .. .. .. .. .. .. ^  .  ^  .. .. .. .. ^  .  .  .  ^  .. .. ^  ^  ^  ^  ^  ^  .  .  .  .")
       .sprites("^  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ^  .  ^  .. .. .. .. ^  .  .  .  ^  .. .. .. .. .. .. .. ^  .  .  .  .")
       .sprites("^  ^  ^  ^  ^  .. .. .. .. .. .. .. .. .. ^  ^  ^  ^  .. .. ^  .  ^  ^  ^  .. .. ^  .  .  .  ^  .. .. .. .. .. .. .. ^  .  .  .  .")
       .sprites(".  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  .. .. ^  .  .  .  ^  .. .. ^  .  .  .  ^  ^  ^  ^  ^  ^  .. .. ^  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  .  ^  .. .. ^  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  .. .. ^  .  .  .  ^  .. .. ^  ^  ^  ^  .  .  .  .  .  ^  .. .. ^  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. ^  .  .  .  ^  .. .. .. .. .. ^  .  .  .  .  .  ^  .. .. ^  ^  ^  ^  ^")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. ^  .  .  .  ^  .. .. .. .. .. ^  .  .  .  .  .  ^  .. .. .. .. .. .. ^")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  .. .. ^  .  .  .  .  .  ^  .. .. .. .. .. <  ^")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  .. .. ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. .. .. .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  ^  .. .. .. .. .. .. .. ^  ^  ^  .. ^  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  ^  ^  .. ^  ^  ^  ^  ^  ^  .  ^  .. ^  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  .. ^  .  .  .  .  .  .  ^  .. ^  ^  ^  ^  ^  ^  ^  ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  .. ^  .  .  .  .  .  .  ^  .. .. .. .. .. .. .. .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  .. ^  .  .  .  .  .  .  ^  .. R1 R2 R2 R2 R2 R3 .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  .. ^  .  .  .  .  .  .  ^  .. R4 Rc R  R  R  R5 .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  .. ^  .  .  .  .  .  .  ^  .. R4 R  Rc R  R  R5 .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  ^  ^  ^  .  .  .  .  .  .  ^  .. R6 R7 R7 R7 R7 R8 .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .  .  .  .  .  .  .  .  .  .  ^  .. W  W  W  W  D  W  .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  .. .. .. .. .. .. .. .. ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .. .. .. .. .. .. .. ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. ^  .. R1 R2 R2 R2 R3 .. ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. R4 Rc Rc R  R5 .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .. R4 R  R  R  R5 .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. R6 R7 R7 R7 R8 .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. W  W  W  D  W  .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .. .. .. .. .. .. .. ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .");
       
    Map.create(MapConstants.EARTH_CAVE_B2).tileMapping(tiles)
       .sprites("W1 W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. >  .. W4 W  W  W  W  W  W2 W  W  W  W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. W4 .. .. .. .. .. W4 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. W4 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. W4 .. .. .. .. .. W4 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W  W  W1 .. W  W  .. W2 W  .. W  W  W2 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  R1 R2 R2 R2 R2 R3")
       .sprites(".  .  W3 .. .. .. .. .. .. .. .. .. W4 W  W  W  W  W2 W  W  W  .  .  .  .  .  .  .  .  .  R4 Rc Rc R  R  R5")
       .sprites(".  .  W3 .. .. .. .. .. .. .. .. .. W4 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R5")
       .sprites(".  .  W3 .. .. .. .. .. .. .. .. .. W4 W  W2 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  R4 R  R  R  Rc R5")
       .sprites(".  .  W3 .. .. .. .. .. .. .. .. .. W4 .. W4 .. .. W4 .  .  W1 W  W  W  W  W  W2 .  .  .  R4 R  R  R  R  R5")
       .sprites(".  .  W  W  W1 W  .. W  W2 W  W1 .. W  .. .. .. .. W4 .  .  W3 .. .. .. .. .. W4 .  .  .  R6 R7 R7 R7 R7 R8")
       .sprites(".  .  .  .  W3 .. .. .. W4 .  W3 .. .. .. W4 .. .. W4 .  .  W3 .. .. .. .. .. W4 .  W1 W  W  D  W2 W  W  W")
       .sprites(".  W1 W  W  W3 .. .. .. W4 .  W3 .. .. .. W4 W  .. W  W  W  W  .. W2 .. .. .. W4 .  W3 .. .. .. W4 .  .  .")
       .sprites(".  W3 .. .. W3 .. .. .. W4 .  W3 .. .. .. W4 .. .. .. .. .. .. .. W4 W  W1 .. W  W  W2 .. .. .. W4 .  .  .")
       .sprites(".  W3 .. .. W1 .. W2 W  W  .  W3 .. .. .. W4 W  W  W  W  W  W  W  W  .  W3 .. .. .. W4 .. .. .. W4 .  .  .")
       .sprites(".  W3 .. .. .. .. W4 .  .  .  W3 .. .. .. W4 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .")
       .sprites(".  W3 .. .. .. .. W4 .  .  .  W3 .. .. .. W4 W  W  W  W2 W  W  W  W  W  W3 .. .. .. W4 .. .. .. W4 .  .  .")
       .sprites(".  W1 .. W2 W  W  W  .  .  .  W3 .. .. .. W4 .. .. .. W4 .. .. .. .. .. W  W  .. W  W2 W  W  W  W  .  .  .")
       .sprites(".  W3 .. W4 .  .  .  .  .  .  W  W  W1 .. W  .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .  .  .  .  W1 W  W  W  W3 .. .. .. .. .. W4 W  .. W  W  W  W  W  W1 .. W2 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .  .  .  .  W3 .. .. .. W  W  .. W2 W  W1 W  .. .. W4 .  .  .  .  W3 .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .  W1 W  W  W3 .. .. .. .. .. .. W4 .  W3 .. .. .. W4 .  .  .  .  W3 .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 W  W3 .. .. W3 .. .. .. .. .. .. W4 .  W3 .. .. .. W4 W  W  W2 .  W3 .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .. W3 .. .. W  .. W2 W  W  W  W  W  .  W3 .. .. .. W4 .. .. W4 .  W3 .. W4 .  .  .  .  .  .  .")
       .sprites(".  W1 .. W2 .. W3 .. .. .. .. W4 .  .  .  .  .  .  W  W2 W  .. W  .. .. W4 .  W3 .. W4 .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. .. .. .. .. .. W4 W  W  W2 .  .  .  .  W3 .. .. .. .. .. W4 .  W3 .. W4 .  .  .  W1 W  W2 .")
       .sprites(".  W3 .. .. .. W3 .. .. .. .. W4 .. .. W4 .  W1 W  W  W3 .. .. .. .. .. W4 .  W3 .. W4 .  .  W1 W3 <  W4 .")
       .sprites(".  W  W  W  W  W3 .. .. .. .. W4 .. .. W4 .  W3 .. .. W  .. W2 W  W  W  W  .  W3 .. W4 .  .  W3 W  .. W2 .")
       .sprites(".  .  .  .  .  W  W  W  W1 .. W  .. .. W4 .  W3 .. .. .. .. W4 .  .  .  .  .  W3 .. W4 .  .  W3 .. .. W4 .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  W3 .. .. .. .. W4 W  W2 .  W1 W  W3 .. W4 W  W  W3 .. .. W4 .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  W3 .. .. .. .. W4 .. W4 .  W3 .. W  .. W  .. .. W3 .. .. W4 .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. R1 R2 R2 R2 R2 R3 .. .. .. .. W4 .  W3 .. .. .. .. .. .. W  .. W2 W  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. R4 Rc R  R  R  R5 .. .. W4 .. W4 .  W3 .. .. .. .. .. .. .. .. W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W  W  W  W  R4 R  R  R  R  R5 W  W  W1 .. W4 .  W3 .. .. .. .. .. .. .. .. W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  R4 R  Rc R  Rc R5 .  .  W3 .. W4 .  W  W  W  W  W  W  W  W  W  W  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R5 .  .  W3 .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R5 .  .  W3 .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  R4 R  R  R  R  R5 W  W  W3 .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  R6 R7 R7 R7 R7 R8 .. .. W  .. W2 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W  W  W1 D  W  W  .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.EARTH_CAVE_B3).tileMapping(tiles)
       .sprites("R1 R2 R2 R2 R3 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W2 .  .")
       .sprites("R4 R  R  R  R5 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .")
       .sprites("R4 R  R  R  R5 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  .. W  W2 .. .. W4 .  .")
       .sprites("R4 R  R  R  R5 .  .  W1 W  W  W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .. .. W4 .  .")
       .sprites("R6 R7 R7 R7 R8 .  .  W3 .. .. .. .. .. .. .. .. W4 .  .  .  R1 R2 R2 R2 R3 .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .. .. W4 .  .")
       .sprites("W  W  W1 D  W2 .  .  W3 .. .. .. .. .. .. .. .. W4 .  .  .  R4 R  Rc R  R5 .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 W  W  W  .  .")
       .sprites(".  .  W3 .. W4 W  W  W  .. W2 W  W  W1 .. W  W  W  W  W2 .  R4 R  R  R  R5 .  .  W1 W  W  W  W  W  W  W  W3 .. .. .. .. W4 .  .  .  .  .")
       .sprites(".  .  W3 .. W4 .. .. .. .. W4 .  .  W3 .. .. .. .. .. W4 .  R4 R  R  R  R5 .  .  W3 .. .. .. .. .. .. W4 W  W2 .. .. .. W4 .  .  .  .  .")
       .sprites(".  .  W3 .. .. .. .. .. .. W4 .  .  W3 .. .. .. .. .. W4 .  R6 R7 R7 R7 R8 .  .  W3 .. .. .. .. .. .. W4 .. W4 .. .. .. W4 .  .  .  .  .")
       .sprites("W1 W  W3 .. W4 .. .. .. .. W4 .  .  W  W  W  W  W1 .. .. W  W  W2 W  D  W2 .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. W4 W  W  W  W  W2")
       .sprites("W3 .. W  .. W  W2 W  W  W  W  .  .  .  .  .  .  W3 .. .. .. .. W4 .. .. W4 W  W  W  .. W2 .. .. .. .. W4 .. W4 .. .. .. W4 .. .. .. .. W4")
       .sprites("W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .. .. W4 .. .. .. .. W4 W  W  W  W1 W  .. W4 W  W1 .. W  .. .. .. .. W4")
       .sprites("W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .. .. .. .. .. .. .. W4 .  .  .  W3 .. .. W4 .  W3 .. .. .. .. .. .. W4")
       .sprites("W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  W  W  W  W1 .. W  .. .. W4 .. .. .. .. W4 .  .  .  W1 .. W2 W  .  W  W  W  W  W  W  W  W")
       .sprites("W  W1 .. W2 W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 W  W  W1 .. W  W  W2 .  W3 .. W4 .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  .  .  W3 .. .. .. W4 .  W3 .. W4 W  W2 .  R1 R2 R2 R2 R3 .  .")
       .sprites(".  W3 .. W4 .  .  .  R1 R2 R3 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. W4 .  W3 .. W4 .. W4 .  R4 R  Rc R  R5 .  .")
       .sprites(".  W3 .. W4 .  .  .  R4 Rc R5 .  .  .  .  .  ^  ^^ ^  ^^ ^  ^^ ^^ .  .  .  .  .  W  W1 .. W2 W  .  W3 .. .. .. W4 .  R4 R  R  R  R5 .  .")
       .sprites(".  W3 .. W4 .  .  .  R4 R  R5 .  .  .  .  .  ^  .. .. .. .. .. ^  .  .  .  .  .  .  W3 .. W4 .  .  W3 .. W4 .. W4 .  R4 R  R  R  R5 .  .")
       .sprites(".  W3 .. W4 .  .  .  R6 R7 R8 W  W2 .  .  .  ^^ .. .. <  .. .. ^  .  .  .  .  .  .  W3 .. W4 .  .  W  W1 W  .. W4 .  R6 R7 R7 R7 R8 .  .")
       .sprites(".  W3 .. W4 W  W  W2 W  D  W  .. W4 .  .  .  ^  .. .. .. .. .. ^  .  .  .  .  .  .  W3 .. W4 .  .  .  W3 .. .. W4 W  W  W  W  D  W  W2 .")
       .sprites("W1 W  .. W  .. .. W4 .. .. .. .. W4 .  .  .  ^  .. .. .. .. .. ^^ .  .  .  .  .  .  W3 .. W4 .  .  .  W3 .. .. W4 .. .. .. .. .. .. W4 .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. W4 .  .  .  ^^ ^  ^  .. ^^ ^  ^^ .  .  .  .  .  .  W3 .. W4 .  .  .  W3 .. .. W4 .. .. .. .. .. .. W4 .")
       .sprites("W3 .. .. .. .. .. W4 .. .. .. .. W4 .  .  .  .  .  W3 .. W4 .  .  .  .  .  .  .  .  W3 .. W4 .  .  .  W  W1 .. W  .. .. .. .. .. .. W4 .")
       .sprites("W1 .. W2 W  W1 W  W  .. .. .. .. W4 .  .  .  .  .  W3 .. .. W  W  W  W  W  W2 .  .  W3 .. W4 .  .  .  .  W3 .. .. .. .. .. .. .. .. W4 .")
       .sprites("W3 .. W4 .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  W3 .. W4 W  W  W2 .  W3 .. .. .. .. .. .. .. .. W4 .")
       .sprites("W3 .. W4 .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  W  W  W  W  W  W  W3 .. W4 .  .  W3 .. W4 .. .. W4 .  W  W  W  W  W  W  W  W  W  W  .")
       .sprites("W3 .. W4 .  W  W  W  W3 .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. W4 .  .  W1 .. W  .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. W4 .  .  .  .  W3 .. .. .. W4 .  R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .. W4 .  .  W3 .. .. .. .. W4 W  W  W2 .  R1 R2 R2 R2 R3 .  .  .")
       .sprites("W3 .. W4 .  .  .  .  W3 .. .. W4 W  .  R6 R7 Rc R  R  R  R  R  R  R7 R8 .. W4 .  .  W3 .. .. .. .. W4 .. .. W4 .  R4 R  R  Rc R5 .  .  .")
       .sprites("W  W  W  .  .  .  .  W3 .. .. W4 .  .  W  W  R6 R  [  R  ]  R  R8 D  W  .. W4 .  .  W  W  W  W1 .. W  .. .. W4 .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  .  .  .  .  W3 .. .. W4 .  .  .  .  W  R6 R8 R7 R6 R8 W  .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. W4 .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  .  .  .  .  W  W1 .. .. W  W  W  W  W  W  W  D  W2 W  W  W  W  W  W  .  .  .  .  .  W3 .. .. .. .. W4 .  R6 R7 R7 R7 R8 .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. W  W1 .. W  W  W  W  D  W2 W  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W3 .. .. .. .. .. .. W4 .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W  .. W2 W  W  W  W  W  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 >  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.EARTH_CAVE_B4).tileMapping(tiles)
       .sprites("W1 W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 <  .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. W4 .  .  .  .  W1 W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. W4 W  W  W2 .  W3 .. .. .. .. .. .. W4 W  W  W  W  W  W  W2 .  R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W  W  W1 W  .. W  .. .. W4 .  W3 .. .. .. .. .. .. W4 .. .. .. .. .. .. W4 .  R6 R7 R  Rc Rc R  R  R  Rc R  Rc R5 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  W3 .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. W4 W  W  W2 R4 R  R  R  R  R  R  R  R  R5 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  W3 .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. W4 .. .. .. .. .. .. W4 .. .. W4 R4 Rc R  R  R  R  R  R  R  R5 .  .  .  W1 W  W  W  W  W  W  W2 .  .  .  .  .  .")
       .sprites(".  .  W3 .. .. .. .. W1 W  W  W  W  .. W2 .. .. .. W4 W  W  W1 W  .. W  W  .. .. W4 R6 R7 R7 R7 R7 R7 R7 R7 R7 R8 W  W2 .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .")
       .sprites(".  .  W3 .. .. .. .. W3 .. .. .. .. .. W4 .. .. .. W4 .  .  W3 .. .. .. .. .. .. W4 W  W  W  W  W  W1 W  D  W  W  .. W4 .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .")
       .sprites(".  .  W  W1 W  .. W  W3 .. .. .. .. .. W4 W  W  W  W  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .")
       .sprites(".  .  .  W3 .. .. .. W3 .. .. .. .. .. W4 .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. .. W4 W  W  .. W2 .. .. .. .. W4 W  W  W2 .  .  .")
       .sprites(".  .  .  W3 .. .. .. W3 .. .. .. .. .. W4 W  W  W  W2 .  .  W3 .. .. .. .. .. .. W4 W  W  W2 .  .  W3 .. .. .. .. .. W4 .. .. .. W4 .. .. .. .. W4 .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. W3 .. .. .. .. .. W4 .. .. .. W4 .  .  W3 .. .. .. .. .. .. W4 .. .. W4 .  .  W  W  W  W1 W  .. W  .. .. .. W4 W  .. W  W  W  .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. W  .. W  W  W2 W  W  .. .. .. W4 .  .  W  W  W1 .. W  W  W  W  .. .. W4 .  .  .  .  .  W3 .. .. .. .. .. .. W4 .. .. .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. W4 .. .. .. .. .. W4 .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. .. .. W4 .. .. .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. W4 .. .. .. .. .. W4 .  .  .  .  W3 .. .. .. .. .. .. .. W4 W  W  W  W2 .  W3 .. .. W1 W  W  W  W  W  W2 .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. W4 .. .. .. .. .. W4 .  .  .  .  W3 .. .. .. .. .. .. .. W4 .. .. .. W4 .  W3 .. .. W3 .. .. .. .. .. W4 .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  W  W  W  W  W1 W  .. W  W  .. .. .. .. .. W4 .  .  W1 W  W3 .. .. .. .. .. .. .. .. .. .. .. W4 .  W3 .. .. W3 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. W4 .  .  W3 .. W3 .. .. .. .. .. .. .. W4 .. .. .. W4 .  W  W  W  W3 .. .. .. .. .. W4 .. .. .. .. .. W4 .  .  .")
       .sprites(".  .  .  W1 W  W  W  W3 .. .. .. .. .. .. .. .. .. W4 W  W  W3 .. W  W  W  .. W2 W  W  W1 W  .. .. .. W4 .  .  .  .  W3 .. .. .. .. .. W4 W  W  W1 .. W2 W  .  .  .")
       .sprites(".  .  .  W3 .. .. .. W3 .. .. .. .. .. .. .. .. .. W4 .. .. W3 .. .. .. .. .. W4 .  .  W3 .. .. .. .. W4 .  .  .  .  W3 .. .. .. .. .. W4 .  .  W3 .. W4 .  .  .  .")
       .sprites(".  .  .  W3 .. .. .. W  .. W  W  W2 W  W1 .. W  W  W  .. .. W3 .. .. .. .. .. W4 .  .  W3 .. .. .. .. W4 W  W  W  W  W3 .. .. .. .. .. W4 .  .  W3 .. W4 .  .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. W  .. W  W  W2 W  W2 .  .  W  W  W1 W  .. W  .. .. .. .. W3 .. .. .. .. .. W4 .  .  W3 .. W4 .  .  .  .")
       .sprites(".  W1 W  W3 .. .. .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W  W  .. W  W2 W  W  .  .  W3 .. W4 W  W  W  W2")
       .sprites(".  W3 .. W3 .. .. .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  W3 .. W4 .. .. .. W4")
       .sprites(".  W3 .. W  .. W2 W  W  W  W  W  W  .  W3 .. .. .. .. .. .. .. .. .. .. W4 .  W1 W  W  W  W  W3 .. .. .. .. .. .. .. .. .. .. .. W4 W  W  W2 .  W3 .. .. .. .. >  W4")
       .sprites(".  W3 .. .. .. W4 .  .  .  .  .  .  .  W  W  W  W1 .. W  W  W  W  W  W2 W  .  W3 .. .. .. .. W3 .. .. .. .. .. .. .. .. .. .. .. W4 .. .. W2 .  W3 .. W4 .. .. .. W4")
       .sprites(".  W3 .. .. .. W4 .  R1 R2 R2 R2 R2 R3 .  .  .  W3 .. .. .. .. .. .. W4 .  .  W3 .. .. .. .. W  W  W  W1 W  .. W  W2 W  W  W1 .. W  .. .. W4 .  W3 .. W4 W  W  W  W")
       .sprites(".  W3 .. .. .. W4 .  R4 R  R  R  R  R5 .  .  .  W3 .. .. .. .. .. .. W4 W  W  W  W2 .. .. .. .. .. .. .. .. .. .. W4 .  .  W3 .. .. .. .. W4 .  W  W  W  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .  R4 R  Rc R  R  R5 .  .  .  W3 .. .. .. .. .. .. W4 .. .. .. W4 .. .. .. .. .. .. W3 .. .. .. W4 .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .  R4 R  R  R  Rc R5 .  .  .  W3 .. .. .. .. .. .. .. .. .. .. W4 .. .. .. .. .. .. .. .. .. .. W4 .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .  R4 R  R  R  R  R5 .  .  .  W3 .. .. .. .. .. .. W4 .. .. .. .. .. .. .. .. .. .. W3 .. .. .. W4 .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .  R4 Rc R  R  R  R5 .  .  .  W3 .. .. .. .. .. .. W4 .. .. .. W4 .. .. .. .. .. .. W  W2 W  W  W  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .  R4 R  R  R  R  R5 .  .  .  W  W  W  W1 W  W  W  W  .. .. .. W4 .. .. .. .. .. .. .. W4 .  .  .  .  .  W  W  W  W  W  W  .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 W  R6 R7 R7 R7 R7 R8 .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .. W  W  D  W  W  W  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W3 .. .. .. W4 .. .. .. .. .. W4 .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W  W  W1 W  W  .. .. .. .. .. W4 .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.EARTH_CAVE_B5).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  W1 W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  W1 W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. W1 .. W  W  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. W3 .. .. .. W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W  W  W  W3 .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W2 .. .. .. .. W4 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. W4 .. .. .. .. W4 W  W  W  W  W  W2 .  .  .")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. .. .. .. W1 W  .. W  W  W2 .. .. W4 .. .. .. .. .. W4 .  .  .")
       .sprites("R1 R2 R2 R2 R2 R2 R2 R2 R3 .. .. .. .. .. W3 .. .. .. .. W4 .. .. .. .. .. .. .. .. W4 .  .  .")
       .sprites("R4 X  x  R  @  R  X  x  R5 .. W1 .. W2 .. W3 .. .. .. .. W4 .. .. W4 .. .. .. .. .. W4 .  .  .")
       .sprites("R4 x  x  [  *  ]  X  X  R5 .. W3 .. W4 .. W3 .. .. .. .. W4 W  .. W  W2 .. .. .. .. W4 .  .  .")
       .sprites("R4 X  x  R  R  R  X  x  R5 W  W3 .. W4 W  W3 .. .. .. .. W4 .. .. .. W4 .. .. .. .. W4 .  .  .")
       .sprites("R4 x  X  x  R  x  x  x  R5 .  W3 .. W4 .  W3 .. .. .. .. .. .. .. .. W4 W  .. W  W  W  W  W2 .")
       .sprites("R4 x  X  X  R  X  x  X  R5 .  W3 .. W4 .  W  W1 .. .. W2 W4 .. .. .. W4 .. .. .. .. .. .. W4 .")
       .sprites("R4 X  X  X  R  X  X  X  R5 .  W3 .. W4 .  .  W3 .. .. W4 W  .. .. .. W4 .. .. .. .. .. .. W4 .")
       .sprites("R4 x  x  x  R  X  x  x  R5 .  W3 .. W4 .  .  W3 .. .. W4 .. .. .. .. W4 .. .. .. .. .. .. W4 .")
       .sprites("R6 R7 R7 R7 R7 R7 R7 R7 R8 .  W3 .. W4 .  .  W3 .. .. W4 W  W  W  W  W  W2 .. .. .. .. .. W4 .")
       .sprites("W  W  W  W1 D  W2 W  W  W  .  W3 .. W4 .  .  W3 .. .. W4 .. .. .. .. .. W4 .. .. .. .. .. W4 .")
       .sprites(".  .  .  W3 .. W4 .  .  .  .  W3 .. W4 .  .  W3 .. .. .. .. .. .. .. .. W4 .. .. .. .. .. W4 .")
       .sprites(".  .  .  W3 .. W4 W  W  W  W  W  .. W  W2 .  W3 .. .. W4 .. .. .. .. .. W4 .. .. .. W4 W  W  .")
       .sprites(".  .  .  W3 .. W4 .. .. .. .. .. .. .. W4 .  W3 W1 .. W  W  W2 .. .. .. W4 .. .. .. W4 .  .  .")
       .sprites(".  .  .  W3 .. .. .. .. .. .. .. .. .. W4 .  W  W3 .. .. .. W4 .. .. .. W4 W  .. W  W  W  W  W2")
       .sprites(".  .  .  W3 .. W4 .. .. .. .. .. .. .. W4 .  .  W3 .. .. .. W4 .. .. .. W4 .. .. .. .. .. .. W4")
       .sprites(".  .  .  W  W  W  W  W  W  W  W  W  W  W  .  W1 W  W  W3 .. W4 .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. >  W3 .. W4 .. .. .. W4 .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 .. W  W  .. W  W  W  W  W  W  W2 .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. W4 .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. W4 W  W  W  W  W")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .");
  };
  
  return {
    init: init
  };
});