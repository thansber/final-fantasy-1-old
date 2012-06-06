define(/* SardasCaveMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var tiles = {
    "." : {y:4, x:4, desc:"nothing"},
    "..": {y:2, x:4, desc:"floor", passable:true},
    "D" : {y:2, x:3, desc:"door", inside:{y:2, x:5}, passable:true},
    "R" : {y:1, x:1, desc:"room empty", inside:{y:4, x:4}, passable:true},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rp": {y:1, x:1, desc:"pots", inside:{y:4, x:1}},
    "Rt": {y:1, x:1, desc:"table", inside:{y:6, x:1}},
    "RC": {y:1, x:1, desc:"chair", inside:{y:6, x:0}, passable:true},
    "bt": {y:1, x:1, desc:"bed top", inside:{y:5, x:3}},
    "bb": {y:1, x:1, desc:"bed bottom", inside:{y:6, x:3}},
    "fp": {y:1, x:1, desc:"fireplace", inside:{y:6, x:2}},
    "W" : {y:0, x:4, desc:"wall"},
    "W1": {y:0, x:3, desc:"wall top left"},
    "W2": {y:0, x:5, desc:"wall top right"},
    "W3": {y:1, x:3, desc:"wall left"},
    "W4": {y:1, x:5, desc:"wall right"},
    ">" : {y:1, x:4, desc:"stairs up", passable:true}
  };
  
  var init = function() {
    Map.create(MapConstants.SARDAS_CAVE, {hasBattles:false, start:{y:23, x:16}}).tileMapping(tiles)
       .sprites("R1 R2 R2 R2 R2 R3 R2 R2 R2 R2 R3 .  .  .  .  .  .  .  .  R1 R2 R2 R2 R2 R2 R2 R3")
       .sprites("R4 R  fp R  bt R5 R  R  R  Rp R5 .  .  .  .  .  .  .  .  R4 R  Rp R  Rp R  Rp R5")
       .sprites("R4 R  R  R  bb R5 R  R  RC R  R5 .  .  .  .  .  .  .  .  R4 R  R  Rp Rp Rp Rp R5")
       .sprites("R4 R  R  R  R  R5 R  R  Rt R  R5 .  .  .  .  .  .  .  .  R6 R7 R7 R7 R7 R7 R7 R8")
       .sprites("R4 R  R  R  Rt R5 R  R  R  R  R5 W  W  W  W  W  W  W  W  W  D  W  W2 W  W  W  W")
       .sprites("R4 R  R  R  R  R  R  R  R  R  R5 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .")
       .sprites("R4 R  R  R  R  R5 R7 R7 R7 R  R8 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .")
       .sprites("R6 R7 R7 R7 R7 R8 W  W  R1 R  R3 .. W2 W  W  W1 W  W  W  W  .. .. W4 .  .  .  .")
       .sprites("W1 W  W  W  W  W  .. .. R4 R  R5 .. W4 .  .  W3 .. .. .. .. .. .. W4 .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. R6 R7 R8 .. W4 .  .  W3 .. .. .. .. .. .. W4 .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. W  D  W  .. W4 .  .  W3 .. .. W  W  W  W  W2 .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. W4 .  .  W3 .. .. .. .. .. .. W4 .  .  .  .")
       .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  W3 .. W1 W  W2 .. .. W4 .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. W3 >  W4 .. .. W4 .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. W  .. W  .. .. W4 .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  .  .  .  .");
  };
  
  return {
    init: init
  };
});