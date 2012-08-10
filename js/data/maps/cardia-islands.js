define(/* CardiaIslandsMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
    
  var baseMapOptions = {hasBattles:false, start:{y:23, x:16}};
 
  var tiles = {
    "." : {y:9, x:4, desc:"nothing"},
    "..": {y:0, x:3, desc:"floor", inside:{y:1, x:3}, passable:true},
    "C" : {y:4, x:3, desc:"candles", inside:{y:5, x:3}, passable:true},
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
    "Rp": {y:3, x:1, desc:"pots", inside:{y:3, x:3}},
    "Rs": {y:3, x:1, desc:"skull", inside:{y:2, x:3}, passable:true},
    "W" : {y:0, x:1, desc:"wall"},
    "W1": {y:0, x:0, desc:"wall top left"},
    "W2": {y:0, x:2, desc:"wall top right"},
    "W3": {y:1, x:0, desc:"wall left"},
    "W4": {y:1, x:2, desc:"wall right"},
    "WL": {y:0, x:13, desc:"well"},
    ">" : {y:6, x:2, desc:"stairs up", passable:true}
  };
  
  var init = function() {
    Map.create(MapConstants.CARDIA_ISLANDS_MAIN, baseMapOptions).tileMapping(tiles)
       .sprites("W1 W  W  W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R1 R2 R2 R2 R3 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R4 Rs Rs Rc R5 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R4 R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R6 R7 R7 R7 R8 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. W  D  W  W  W  .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 W  W  W  W  W  W  W  W  W3 .. .. .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. >  .. W4 .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. W  W  W  W  W  W4 .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. >  W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  W1 .. .. .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R1 R2 R2 R2 R2 R2 R2 R2 R2 R3 .. .. .. W4 .  .  .  .  .  W  W  W  W  W  W  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. R6 R7 R  R  Rs Rc Rs Rs Rc R5 .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. W  D  R4 R  R  R  R  R  R  R8 .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. R6 R7 R7 R7 R7 R7 R8 W  .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. W  W  W  W  W  W  W  .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. W2 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. >  W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W2 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W1 W  W  W  W  W  .. .. R1 R2 R3 .. .. W4 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. R1 Rc Rc R5 .. .. W4 .  .  .  .  .  .  .  .  W1 W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. R1 R2 R3 .. .. R4 R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. R4 Rc R5 .. >  R4 R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  W  W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 .. R4 R  R  R2 R2 R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  W1 .. .. R4 R  R  Rp Rp R  R  R  R5 .. W4 W  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W2")
       .sprites(".  .  .  .  .  .  W1 .. .. .. R6 R  R  R  Rp R  R  R  R8 .. W4 .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  W3 .. .. .. W  R4 R  R  R  R  R  R5 W  .. W4 .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. W4 .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. R4 R  R  R  R  R  R5 .. .. W4 .  .  .  .  .  .  .  .  .  .  W  W  W  W  W3 .. W4 .  .  .  W3 .. .. .. R1 R2 R2 R2 R2 R2 R2 R3 .. W4")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. R6 R7 R7 R7 R7 R7 R8 .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  .  .  .  W3 .. .. .. R4 R  R  R  Rs Rc Rs R5 .. W4")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. W  D  W  W  W  D  W  .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. R4 R  R  R  Rs R  Rs R5 .. W4")
       .sprites(".  .  .  .  .  .  W3 .. .. .. .. .. .. .. WL .. .. .. .. .. W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. R4 R  R  R  R  R  R  R5 .. W4")
       .sprites(".  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. R4 R  R  R  R  Rc R  R5 .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. R4 Rs R  R  R  R  R  R5 .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. R4 R  Rc R  R  R  R  R5 .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  .. .. .. .. R4 R  R  R  R  R7 R7 R8 .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. R4 R  Rs R  R5 W  D  W  .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. R1 R2 R2 R2 R2 R2 R2 R2 R3 .. .. .. .. .. .. .. .. R4 R  R  Rs R5 .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. R4 Rc Rp Rp R  Rc R  Rc R5 .. .. .. .. .. .. .. .. R4 R  R  Rs R5 .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. R4 R  Rp R  R  R  R  Rc R5 .. .. .. .. .. .. .. .. R6 R7 R7 R7 R8 .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. R4 R  R  R  R  R  R  R  R5 .. .. .. .. .. .. .. .. W  D  W  W  W  .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. R6 R7 R7 R7 R7 R7 R7 R7 R8 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. W  W  W  W  D  W  W  W  W  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. >  W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W3 .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W");
    
    Map.create(MapConstants.CARDIA_ISLANDS_BAHAMUT, baseMapOptions).tileMapping(tiles)
       .sprites("W1 W  W  W  W2")
       .sprites("W3 .. .. .. W4")
       .sprites("W3 .. >  .. W4")
       .sprites("W3 .. .. .. W4")
       .sprites("W  W3 .. W4 W")
 .repeatSprites(".  W3 .. W4 .", 46)
       .sprites("W1 .. .. .. W2")
       .sprites("W3 .. .. .. W4")
       .sprites("W3 .. <  .. W4")
       .sprites("W3 .. .. .. W4")
       .sprites("W  W  W  W  W");
    
    Map.create(MapConstants.CARDIA_ISLANDS_BAHAMUT_2F, baseMapOptions).tileMapping(tiles)
       .sprites("R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3")
       .sprites("R4 R  C  R  R  R  R  R  C  R  R5")
       .sprites("R4 R  C  R  R  R  R  R  C  R  R5")
       .sprites("R4 R  R  C  R  R  R  C  R  R  R5")
       .sprites("R4 R  R  C  R  R  R  C  R  R  R5")
       .sprites("R4 R  C  C  R  R  R  C  C  R  R5")
       .sprites("R4 C  R  R  C  R  C  R  R  C  R5")
       .sprites("R4 C  C  R  R  R  R  R  C  C  R5")
       .sprites("R4 R  C  C  R  R  R  C  C  R  R5")
       .sprites("R4 C  R  C  R  R  R  C  R  C  R5")
       .sprites("R4 C  R  R  C  R  C  R  R  C  R5")
       .sprites("R4 C  R  R  C  R  C  R  R  C  R5")
       .sprites("R4 R  C  R  C  R  C  R  C  R  R5")
       .sprites("R4 R  R  C  C  R  C  C  R  R  R5")
       .sprites("R4 R  R  C  R  R  R  C  R  R  R5")
       .sprites("R4 R  C  C  R  R  R  C  C  R  R5")
       .sprites("R4 R  C  C  R  R  R  C  C  R  R5")
       .sprites("R4 C  R  C  R  R  R  C  R  C  R5")
       .sprites("R4 C  R  C  R  R  R  C  R  C  R5")
       .sprites("R4 C  R  R  R  R  R  R  R  C  R5")
       .sprites("R4 C  R  R  R  R  R  R  R  C  R5")
       .sprites("R4 R  C  R  R  R  R  R  C  R  R5")
       .sprites("R4 R  C  R  R  R  R  R  C  R  R5")
       .sprites("R4 R  R  C  R  R  R  C  R  R  R5")
 .repeatSprites("R4 R  R  R  R  R  R  R  R  R  R5", 13)
       .sprites("R6 R  R  R  R  R  R  R  R  R  R8")
       .sprites("W  R4 R  R  R  R  R  R  R  R5 W")
       .sprites(".  R4 R  R  R  R  R  R  R  R5 .")
       .sprites(".  R6 R  R  R  R  R  R  R  R8 .")
       .sprites(".  W  R4 R  R  R  R  R  R5 W  .")
       .sprites(".  .  R4 R  R  R  R  R  R5 .  .")
       .sprites(".  .  R4 R  R  R  R  R  R5 .  .")
       .sprites(".  .  R6 R  R  R  R  R  R8 .  .")
       .sprites(".  .  W  R4 R  R  R  R5 W  .  .")
       .sprites(".  .  .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  R4 R  R  R  R5 .  .  .")
       .sprites(".  .  .  R6 R7 R7 R7 R8 .  .  .")
       .sprites(".  W1 W  W  W  D  W  W  W  W2 .")
       .sprites(".  W3 .. .. .. .. .. .. .. W4 .")
       .sprites(".  W3 .. .. .. .. .. .. .. W4 .")
       .sprites(".  W3 .. .. .. .. .. .. .. W4 .")
       .sprites(".  W3 .. .. .. .. .. >  .. W4 .")
       .sprites(".  W  W  W  W  W  W  W  W  W  .");
  };
  
  return {
    init: init
  };
  
});