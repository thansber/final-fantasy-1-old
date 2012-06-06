define(/* */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var tiles = {
    "." : {y:1, x:1, desc:"floor", passable:true},
    "D" : {y:4, x:3, desc:"door", inside:{y:5, x:3}, passable:true},
    "R" : {y:3, x:1, desc:"room empty", inside:{y:6, x:1}, passable:true},
    "R1": {y:2, x:0, desc:"room wall top left", inside:{y:5, x:0}},
    "R2": {y:2, x:1, desc:"room wall top", inside:{y:5, x:1}},
    "R3": {y:2, x:2, desc:"room wall top", inside:{y:5, x:2}},
    "R4": {y:3, x:0, desc:"room wall left", inside:{y:6, x:0}},
    "R5": {y:3, x:2, desc:"room wall right", inside:{y:6, x:2}},
    "R6": {y:4, x:0, desc:"room wall bottom left", inside:{y:7, x:0}},
    "R7": {y:4, x:1, desc:"room wall bottom", inside:{y:7, x:1}, passable:true},
    "R8": {y:4, x:2, desc:"room wall bottom right", inside:{y:7, x:2}},
    "Rc": {y:3, x:1, desc:"chest", inside:{y:8, x:3}, passable:true},
    "Rp": {y:3, x:1, desc:"pots", inside:{y:3, x:3}},
    "Rs": {y:3, x:1, desc:"skull", inside:{y:2, x:3}, passable:true},
    "Rt": {y:3, x:1, desc:"table", inside:{y:6, x:3}},
    "RC": {y:3, x:1, desc:"chair", inside:{y:7, x:3}, passable:true},
    "W" : {y:0, x:1, desc:"wall"},
    "W1": {y:0, x:0, desc:"wall top left"},
    "W2": {y:0, x:2, desc:"wall top right"},
    "W3": {y:1, x:0, desc:"wall left"},
    "W4": {y:1, x:2, desc:"wall right"},
    ">" : {y:1, x:3, desc:"stairs up", passable:true}
  };
  
  var init = function() {
    Map.create(MapConstants.MATOYAS_CAVE, {hasBattles:false, start:{y:23, x:16}}).tileMapping(tiles)
       .sprites("R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3")
       .sprites("R4 Rs R  R  Rs Rp Rp R  RC R  Rp Rp Rs R  R  Rs R5")
       .sprites("R4 Rs R  R  Rs R  Rp R  Rt R  Rp R  Rs R  R  Rs R5")
       .sprites("R4 Rs R  R  Rs R  R  R  R  R  R  R  Rs R  R  Rs R5")
       .sprites("R4 Rc Rs R  R  Rs R  R  R  R  R  Rs R  R  Rs R  R5")
       .sprites("R4 Rc R  Rs R  R  Rs R  R  R  Rs R  R  Rs R  R  R5")
       .sprites("R4 Rs Rs Rs Rs R  R  Rs R  Rs R  R  Rs Rs Rs Rs R5")
       .sprites("R4 Rc Rs R  R  Rs Rs R  R  R  Rs Rs R  R  Rs R  R5")
       .sprites("R4 R  R  Rs R  R  R  Rs R  Rs R  R  R  Rs R  R  R5")
       .sprites("R6 R7 R7 R  Rs Rs Rs Rs R  Rs Rs Rs Rs R  R7 R7 R8")
       .sprites("W1 W  W  R4 R  R  R  Rs R  Rs R  R  R  R5 W  W  W2")
       .sprites("W3 .  .  R6 R7 R7 R7 R7 R7 R7 R7 R7 R7 R8 .  >  W4")
       .sprites("W3 .  .  W  W  W  W  W  D  W  W  W  W  W  .  .  W4")
       .sprites("W3 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W4")
       .sprites("W3 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W4")
       .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W");
  };
  
  return {
    init: init
  };
});