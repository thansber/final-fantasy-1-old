define(/* IceCaveMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
    
  var tiles = {
    "." : {y:4, x:1, desc:"nothing"},
    "..": {y:0, x:3, desc:"floor", inside:{y:1, x:3}, passable:true},
    "!" : {y:0, x:3, desc:"ice", inside:{y:1, x:3}, passable:true},
    "$":  {y:1, x:1, desc:"chest", inside:{y:0, x:0}},
    "O" : {y:0, x:3, desc:"hole", inside:{y:1, x:3}, passable:true},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "W" : {y:2, x:3, desc:"wall", inside:{y:0, x:0}},
    "W1": {y:2, x:3, desc:"wall top left", inside:{y:0, x:0}},
    "W2": {y:2, x:3, desc:"wall top right", inside:{y:0, x:0}},
    "W3": {y:2, x:3, desc:"wall left", inside:{y:0, x:0}},
    "W4": {y:2, x:3, desc:"wall right", inside:{y:0, x:0}},
    "^" : {y:0, x:0, desc:"mountain", inside:{y:0, x:0}},
    ">" : {y:0, x:0, desc:"stairs up", inside:{y:0, x:0}, passable:true},
    "<" : {y:0, x:0, desc:"stairs down", inside:{y:0, x:0}, passable:true}
  };
  
  var init = function() {
    Map.create(MapConstants.ICE_CAVE_B1).tileMapping(tiles)
       .sprites("W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W3")
       .sprites("W3 .. .. .. .. .. .. >  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites("W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W3 .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  <  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .. .. .. W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  .  ^  .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R1 R2 R2 R2 R2 R3 W  W  W2 .  W1 W  W  W  W  W  W  W  W  ^  ^  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R  R  R  R5 .. .. W4 .  W3 .. .. .. .. .. .. ^  ^  ^  ^  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R6 R7 R7 R  R  R5 .. .. W4 .  W3 .. .. .. .. .. .. .. .. .. >  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W1 W  D  R4 R  R5 .. .. W4 .  W3 .. .. R1 R2 R2 R2 R3 .. .. ^  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W3 <  .. R4 R  R5 .. .. W4 .  W3 .. .. R4 $  $  $  R5 .. .. .. ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R1 R2 R2 R  R  R5 .. .. W4 W  W3 .. .. R4 R  R  R  R5 .. .. ^  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 $  R  R  R  R5 .. .. .. .. .. .. .. R4 R  R  O  R5 .. .. ^  ^  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R  R7 R7 R8 .. .. .. .. .. .. .. R4 R  R  R  R5 .. ^  ^  ^  W  .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R5 D  W  W  .. .. .. .. .. .. .. R4 R  R  R  R5 .. ^  ^  .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R5 .. .. .. .. .. .. .. .. .. .. R4 R  R  R  R5 .. ^  .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R5 R1 R2 R3 .. .. W4 W  W3 .. .. R4 R  R  R  R5 .. ^  .. W4 W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R4 R  R5 R  $  R5 .. .. W4 .  W3 .. .. R4 R  R  R  R5 .. ^  ^  W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  R6 R7 R8 R7 R7 R8 .. .. W4 .  W3 .. .. R6 R7 R7 R7 R8 .. ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W1 W  W  D  W  W  .. .. W4 .  W3 .. .. W  W  W  D  W  .. .. ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W3 .. .. .. .. .. .. .. W4 .  W3 .. .. .. .. .. .. .. .. ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W  W  W  W  W  W  W  W  W  .  W  W  W  W  W  W  ^  ^  ^  ^  .  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.ICE_CAVE_B2A).tileMapping(tiles)
       .sprites(".  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W")
       .sprites(".  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. ^  ^  ^  ^  ^  ^  .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. >  W4")
       .sprites(".  .  .  .  W3 .. .. W4 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites(".  .  .  .  W3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. W4")
       .sprites("W1 W  W  W  .. .. .. .. W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. W4")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites("W3 <  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W");
    
    Map.create(MapConstants.ICE_CAVE_B2B).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  ^  ^  ^  ^  ^  .. .. ^  ^  ^  .  ^  ^  .  .")
       .sprites(".  .  .  .  .  ^  ^  ^  .. .. .. .. ^  ^  ^  ^  .  ^  .  .  .")
       .sprites(".  ^  ^  .  ^  ^  ^  .. .. ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .")
       .sprites(".  .  ^  .  ^  ^  .. .. .. .. .. .. .. .. .. .. ^  ^  ^  .  .")
       .sprites(".  .  ^  ^  ^  .. .. .. R1 R3 ^  ^  ^  ^  ^  <  ^  .  ^  ^  .")
       .sprites(".  .  ^  ^  .. .. .. R1 R  R  R2 R2 R2 R3 ^  ^  ^  .  .  ^  .")
       .sprites(".  .  ^  ^  .. .. R1 R  R  R  R  O  O  R  R3 ^  ^  ^  .  .  .")
       .sprites(".  ^  ^  .. .. R1 R  R  O  $  O  $  R  O  R  R2 R3 ^  .  .  .")
       .sprites("^  ^  ^  .. .. R4 R  R  R  O  $  O  R  R  R  R  R5 ^  ^  .  .")
       .sprites("^  ^  ^  .. .. R4 R  R  O  R  R  R  O  O  O  R  R5 ^  ^  ^  .")
       .sprites("^  ^  ^  ^  .. R6 R  R  R  O  O  R  O  R  R  R  R5 ^  ^  ^  .")
       .sprites(".  .  ^  ^  .. W  R6 R  R  R  R  O  R  R  R  R  R8 ^  ^  ^  ^")
       .sprites(".  .  .  ^  .. .. W  R6 R  R  R  R  R  R  R  R5 W  ^  .  .  ^")
       .sprites(".  .  .  ^  ^  .. .. W  R4 R  R  R  R  R  R  R5 ^  ^  .  ^  ^")
       .sprites(".  .  .  .  ^  ^  .. .. R6 R  R  R  R  R  R  R5 ^  .  .  .  .")
       .sprites(".  .  .  ^  ^  ^  ^  .. W  R6 R7 R7 R7 R7 R7 R8 ^  ^  .  .  .")
       .sprites(".  .  .  ^  ^  ^  ^  .. .. W  W  W  W  W  D  W  ^  ^  .  .  .")
       .sprites(".  .  .  ^  .  .  ^  ^  .. .. .. .. .. .. .. ^  ^  .  .  ^  .")
       .sprites(".  .  .  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .")
       .sprites(".  .  .  .  .  .  ^  ^  .  .  .  ^  ^  ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  ^  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.ICE_CAVE_B3A).tileMapping(tiles)
       .sprites(".  ^  ^  .  ^  ^  ^  .  .  .")
       .sprites(".  .  ^  ^  ^  .  .  .  .  .")
       .sprites("^  ^  ^  <  ^  ^  ^  .  .  .")
       .sprites("^  .  ^  .. .. .. ^  ^  .  .")
       .sprites(".  .  ^  .. ^  <  ^  ^  ^  ^")
       .sprites(".  .  ^  ^  ^  ^  ^  ^  .  ^")
       .sprites(".  .  .  ^  .  .  .  ^  .  .")
       .sprites(".  .  ^  ^  .  .  .  .  .  .");
    
    Map.create(MapConstants.ICE_CAVE_B3B).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  R1 R2 R3 ^  .  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  ^  R4 R  R5 ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  ^  ^  R6 R7 R8 ^  ^  .  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  ^  W  D  W  ^  .  .  ^  .  .  .  ^  ^  .  .  ^  ^  ^  .  .  .  .  .  .")
       .sprites("R1 R2 R2 R3 .  .  .  .  ^  .. .. .. .. ^  ^  .  ^  ^  ^  .  .  ^  .  ^  .. .. ^  .  .  .  .  .  .")
       .sprites("R4 $  $  R5 .  ^  ^  .  .  ^  ^  ^  .. .. ^  ^  ^  ^  ^  .  ^  ^  .  ^  ^  .. ^  .  .  .  .  .  .")
       .sprites("R6 R7 R7 R8 .  .  ^  .  ^  ^  .. .. .. .. .. .. ^  ^  .  .  ^  .  ^  ^  ^  .. ^  .  .  .  .  .  .")
       .sprites("W  W  D  W  .  ^  ^  ^  ^  ^  .. .. .. .. .. .. ^  ^  ^  ^  ^  .  .  .  ^  .. ^  ^  .  ^  .  .  .")
       .sprites(".  ^  .. ^  .  ^  !  !  !  !  .. .. .. .. .. .. .. .. .. ^  ^  ^  .  .  ^  .. ^  ^  .  ^  .  .  .")
       .sprites(".  ^  !  ^  ^  ^  !  !  !  !  .. .. .. .. .. .. .. .. .. .. ^  ^  .  ^  .. .. ^  ^  ^  ^  .  .  .")
       .sprites(".  ^  !  ^  ^  ^  !  !  ^  ^  ^  ^  .. .. .. .. .. .. .. .. ^  ^  ^  .. .. .. ^  ^  .  .  .  .  .")
       .sprites(".  ^  !  !  !  !  !  ^  ^  .  .  .  ^  .. .. ^  ^  ^  ^  !  !  !  .. .. .. .. ^  .  .  .  .  .  .")
       .sprites("^  ^  ^  ^  ^  !  !  ^  .  .  .  .  ^  .. .. ^  .  .  ^  !  !  !  .. .. .. ^  ^  .  .  .  .  .  .")
       .sprites("^  .  .  .  ^  ^  ^  ^  .  .  ^  ^  !  !  ^  ^  .  .  ^  !  !  !  .. .. ^  ^  .  .  .  .  .  .  .")
       .sprites(".  .  ^  ^  ^  .  ^  ^  ^  .  ^  !  !  !  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .")
       .sprites(".  ^  .. .. ^  ^  .  .  .  .  ^  !  !  !  !  !  !  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  ^  .. .. .. ^  .  .  ^  ^  .. .. ^  ^  ^  .. .. .. .. ^  ^  .  .  .  .  .  .  .  .  .  ^  .  .")
       .sprites(".  ^  .. .. .. ^  .  .  ^  .. .. .. ^  .  ^  .. .. .. .. .. ^  ^  .  .  ^  ^  ^  ^  .  ^  ^  .  .")
       .sprites(".  ^  .. .. ^  ^  .  .  ^  .. .. .. ^  .  ^  .. .. .. .. .. .. ^  .  .  ^  .. .. ^  .  .  ^  .  .")
       .sprites(".  ^  .. .. ^  .  .  .  .  ^  ^  ^  .  ^  ^  ^  .. .. .. .. ^  ^  .  ^  !  !  !  ^  ^  ^  ^  .  .")
       .sprites(".  ^  ^  .. ^  .  .  .  .  ^  ^  ^  ^  ^  !  .. .. .. .. .. ^  ^  ^  !  !  !  ^  ^  ^  .  .  .  .")
       .sprites("^  ^  ^  .. .. ^  .  .  .  ^  !  !  !  !  !  .. .. .. .. .. .. !  !  !  !  ^  ^  ^  ^  .  .  .  .")
       .sprites("^  ^  ^  .. .. ^  .  .  ^  ^  !  !  !  ^  ^  ^  .. ^  ^  .. ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .")
       .sprites(".  ^  .. .. .. ^  ^  ^  !  !  !  !  ^  .  ^  ^  .. ^  .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  ^  ^  ^  .. !  !  !  .. .. !  !  ^  .  ^  ^  .. ^  .. ^  ^  ^  .  .  ^  ^  ^  ^  .  .  .  .  .")
       .sprites("^  ^  .  ^  .. .. .. .. !  ^  ^  ^  ^  .  ^  ^  .. ^  ^  ^  .  ^  .  ^  .. .. .. ^  .  .  .  .  .")
       .sprites(".  .  .  ^  .. .. .. !  ^  ^  .  .  .  .  .  ^  .. .. .. ^  .  .  ^  ^  .. .. .. ^  ^  ^  .  .  .")
       .sprites(".  .  ^  .. .. .. .. .. ^  .  .  ^  ^  .  .  ^  ^  .. .. ^  .  .  .  .  ^  .. .. ^  ^  ^  ^  ^  ^")
       .sprites(".  ^  .. .. .. .. .. .. ^  ^  .  ^  .  .  .  ^  ^  .. .. ^  ^  ^  ^  .  ^  .. .. .. .. .. .. <  ^")
       .sprites(".  .  ^  .. .. .. .. .. .. ^  ^  ^  .  ^  ^  ^  .. .. .. .. .. .. ^  .  ^  .. .. .. ^  ^  ^  ^  ^")
       .sprites(".  .  ^  ^  ^  ^  ^  .. .. .. .. ^  .  ^  .. .. .. ^  ^  .. .. .. ^  .  .  ^  .. .. ^  .  ^  .  .")
       .sprites(".  .  ^  ^  ^  .  ^  ^  .. .. .. ^  .  ^  .. .. .. ^  .  ^  .. .. ^  .  .  ^  ^  .. .. ^  ^  ^  .")
       .sprites(".  .  .  ^  .  ^  .  ^  ^  ^  ^  ^  .  ^  ^  .. ^  ^  .  ^  ^  .. ^  .  .  ^  ^  .. .. .. ^  ^  .")
       .sprites(".  .  ^  .  ^  ^  ^  .  .  .  .  .  .  .  ^  .. ^  .  .  ^  ^  .. ^  .  .  ^  ^  .. .. .. ^  ^  .")
       .sprites(".  .  .  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  .. .. ^  .  .  ^  ^  .. ^  ^  ^  .. .. .. .. .. ^  ^  .")
       .sprites(".  .  .  .  .  .  .  .  ^  R1 R2 R2 R2 R2 R3 .. ^  .  ^  ^  .. .. .. .. .. .. .. .. .. ^  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  ^  R4 R  $  $  $  R5 .. ^  .  ^  ^  .. .. .. .. .. .. .. ^  ^  ^  .  .  ^")
       .sprites(".  .  .  .  .  .  .  ^  ^  R5 R  R  R  R  R5 .. ^  .  .  ^  ^  .. .. .. ^  ^  ^  ^  .  ^  .  .  ^")
       .sprites(".  .  .  .  .  .  .  ^  ^  R5 R  $  $  $  R5 .. ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  ^  ^  .")
       .sprites(".  .  .  .  .  .  .  ^  ^  R6 R7 R7 R7 R7 R8 .. ^  ^  .  .  .  ^  ^  ^  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  ^  ^  ^  ^  W  D  W  W  W  W  .. ^  ^  .  .  .  .  ^  ^  ^  ^  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  ^  .  .  ^  .. .. .. .. .. .. .. ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .");
  };

  return {
    init: init
  };  
});