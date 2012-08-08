define(/* DwarfCaveMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var tiles = {
    "." : {y:0, x:3, desc:"floor", inside:{y:4, x:1}, passable:true},
    "D" : {y:4, x:3, desc:"door", inside:{y:5, x:3}, passable:true},
    "R" : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}, passable:true},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rc": {y:1, x:1, desc:"chest", inside:{y:7, x:3}, passable:true},
    "Rt": {y:1, x:1, desc:"table", inside:{y:6, x:1}},
    "RC": {y:1, x:1, desc:"chair", inside:{y:6, x:0}, passable:true},
    "W" : {y:1, x:3, desc:"wall"},
    "^" : {y:2, x:3, desc:"mountain", inside:{y:3, x:3}},
    "an": {y:1, x:1, desc:"anvil", inside:{y:7, x:0}},
    "hm": {y:1, x:1, desc:"hammer", inside:{y:7, x:1}},
    "fg": {y:1, x:1, desc:"forge", inside:{y:7, x:2}},
    "sw": {y:1, x:1, desc:"sword", inside:{y:6, x:3}, passable:true},
    ">" : {y:6, x:2, desc:"stairs up", passable:true},
  };
  
  var init = function() {
    Map.create(MapConstants.DWARF_CAVE, {hasBattles:false, start:{y:23, x:16}}).tileMapping(tiles)
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  R1 R2 R2 R2 R2 R2 R2 R2 R3 .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  R4 fg hm RC R  sw sw sw R5 .  .  ^  ^  ^  ^  ^  R1 R2 R2 R2 R3 ^")
       .sprites("^  ^  .  .  R6 R7 an R  R  sw sw R7 R8 .  .  .  ^  ^  ^  ^  R4 R  Rc R  R5 ^")
       .sprites("^  .  .  .  W  W  R6 R7 R7 R7 R8 W  W  .  .  .  .  ^  ^  ^  R4 RC Rc RC R5 ^")
       .sprites("^  .  .  .  .  .  W  W  D  W  W  .  .  .  .  .  .  ^  ^  ^  R6 R7 R7 R7 R8 ^")
       .sprites("^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  W  W  D  W  W  ^")
       .sprites("^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^  .  .  .  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  .  .  .  ^  .  .  .  .  .  .  .  .  ^  ^  .  .  .  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  .  .  .  ^  ^")
       .sprites("^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^")
       .sprites("^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  >  .  ^  ^")
       .sprites("^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^")
       .sprites("^  ^  ^  .  .  .  ^  ^  ^  ^  .  .  .  ^  ^  ^  R1 R2 R2 R2 R3 .  .  .  ^  ^")
       .sprites("^  ^  ^  .  .  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  R4 RC Rt RC R5 .  .  .  ^  ^")
       .sprites("^  ^  .  .  .  ^  ^  ^  ^  ^  .  .  .  ^  ^  .  R6 R7 R7 R7 R8 .  .  .  ^  ^")
       .sprites("^  .  .  .  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  .  W  W  D  W  W  .  .  .  ^  ^")
       .sprites("^  .  .  .  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^")
       .sprites("^  ^  .  .  .  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^")
       .sprites("^  ^  .  .  .  .  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  ^")
       .sprites("^  ^  ^  .  .  .  .  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  .  .  .  .  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  .  .  .  .  .  .  ^  ^  ^  ^  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R1 R2 R2 R3 ^  .  ^  ^  ^  ^  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 Rc Rc R5 ^  .  ^  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 R  R  R5 ^  .  .  .  ^  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 R  R  R  R2 R2 R2 R2 R3 ^  ^  ^  R1 R2 R2 R3 .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 R  R  R  R  R  Rc Rc Rc R2 R2 R2 Rc Rc Rc R5 .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 R  R  R  R  R  R  R  R  R  R  R  R  R  R  R5 .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R4 R  R  R  R  R  R  R  R  R  R  R7 R7 R7 R7 R8 .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  R6 R7 R  R  R  R7 R7 R7 R7 R7 R8 W  W  W  W  W  .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  W  W  R6 R7 R8 W  W  W  W  W  W  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  .  .  .  W  D  W  .  .  .  .  .  .  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  .  .  .  .  .  ^  ^  ^  ^  .  .  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  .  .  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^")
       .sprites("^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^  ^");
  };
  
  return {
    init: init
  };
});