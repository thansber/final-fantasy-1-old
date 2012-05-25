define(/* CastleMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
  
  var baseMapOptions = {
    hasBattles: false,
    exitOnOutOfBounds: true,
  };

  var mapOptions = function(opt) {
    return $.extend(baseMapOptions, opt);
  };
  
  var tiles = {
    "." : {y:6, x:4, desc:"grass"},
    "..": {y:7, x:4, desc:"sky"},
    "r" : {y:0, x:4, desc:"road"},
    "W" : {y:1, x:4, desc:"wall"},
    "W1": {y:1, x:3, desc:"wall top left"},
    "W2": {y:1, x:5, desc:"wall top right"},
    "W3": {y:0, x:3, desc:"wall left"},
    "W4": {y:0, x:5, desc:"wall right"},
    "P" : {y:2, x:4, desc:"pillar"},
    ">" : {y:2, x:5, desc:"stairs up"},
    "<" : {y:3, x:5, desc:"stairs down"},
    "D" : {y:3, x:3, desc:"door", inside:{y:3, x:4}},
    "R" : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}},
    "R1": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "R2": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "R3": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "R4": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "R5": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "R6": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "R7": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}},
    "R8": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "Rc": {y:1, x:1, desc:"chest", inside:{y:5, x:4}},
    "T1": {y:1, x:1, desc:"throne top left", inside:{y:6, x:0}},
    "T2": {y:1, x:1, desc:"throne top", inside:{y:6, x:1}},
    "T3": {y:1, x:1, desc:"throne top right", inside:{y:6, x:2}},
    "T4": {y:1, x:1, desc:"throne bottom left", inside:{y:7, x:0}},
    "T5": {y:1, x:1, desc:"throne bottom", inside:{y:7, x:1}},
    "T6": {y:1, x:1, desc:"throne bottom right", inside:{y:7, x:2}},
    "bt": {y:1, x:1, desc:"bed top", inside:{y:6, x:5}},
    "bb": {y:1, x:1, desc:"bed bottom", inside:{y:7, x:5}},
    "f" : {y:1, x:1, desc:"fireplace", inside:{y:4, x:4}},
    "sl": {y:1, x:1, desc:"stool left", inside:{y:5, x:5}},
    "sr": {y:1, x:1, desc:"stool right", inside:{y:5, x:3}},
    "tt": {y:1, x:1, desc:"table top", inside:{y:6, x:3}},
    "tb": {y:1, x:1, desc:"table bottom", inside:{y:7, x:3}},
    "&l" : {y:1, x:1, desc:"statue left", inside:{y:4, x:5}},
    "&r" : {y:1, x:1, desc:"statue right", inside:{y:4, x:3}},
  };
  
  var init = function() {

    Map.create(MapConstants.CONERIA_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites("W1 W  W  W  W  W  W  W  W  W  W  W  W  W2 .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W2")
       .sprites("W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4")
       .sprites("W3 r  W1 W  W  W  W2 .  .  .  .  .  .  r  r  r  .  .  .  .  .  .  W1 W  W  W  W2 r  W4")
       .sprites("W3 r  W3 r  r  r  W4 W  W  W  W  W  W  r  r  r  W  W  W  W  W  W  r  r  r  r  W4 r  W4")
       .sprites("W3 r  W3 r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4 r  W4")
       .sprites("W3 r  W3 r  r  r  W4 W  W  W  W  W2 R1 R2 R2 R2 R3 R1 R2 R2 R2 R3 W3 r  r  r  W4 r  W4")
       .sprites("W3 r  W  W1 r  W2 W  r  r  r  r  W4 R4 Rc Rc Rc R5 R4 Rc Rc Rc R5 W  W  r  W2 W  r  W4")
       .sprites("W3 r  .  W3 r  W4 r  r  W  W  W  W2 R4 R  R  R  R5 R4 R  R  R  R5 r  r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  W4 r  r  r  r  r  W4 R6 R7 R7 R7 R8 R6 R7 R7 R7 R8 r  r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  W4 r  r  r  r  r  W4 W  W  D  W  W  W  W  D  W  W  r  P  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  W4 r  r  r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  r  r  r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  P  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  W4 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W3 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  W4 r  r  r  r  r  r  r  r  >  r  r  r  r  r  r  r  W  W  W  W2 .  r  W4")
       .sprites("W3 r  .  W3 r  r  r  r  r  r  r  r  P  r  r  r  P  r  r  r  r  r  r  r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R1 R2 R2 R2 R3 r  P  r  r  r  P  r  R1 R2 R2 R2 R3 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R4 &r f  &l R5 r  r  r  r  r  r  r  R4 &r f  &l R5 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R4 R  bt R  R5 r  P  r  r  r  P  r  R4 sr tt sl R5 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R4 R  bb sr R5 r  r  r  r  r  r  r  R4 sr tb sl R5 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R4 R  R  sr R5 r  P  r  r  r  P  r  R4 R  R  R  R5 r  r  W4 .  r  W4")
       .sprites("W3 r  .  W3 r  r  R6 R7 R7 R7 R8 r  r  r  r  r  r  r  R6 R7 R7 R7 R8 r  r  W4 .  r  W4")
       .sprites("W3 r  W1 W  W  r  W  W  D  W  W2 r  P  r  r  r  P  r  W  W  D  W  W  r  r  r  W2 r  W4")
       .sprites("W3 r  W3 r  r  r  r  r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4 r  W4")
       .sprites("W3 r  W3 r  r  r  W4 W  W  W  W  W  r  r  r  r  r  W  W  W  W  W  W3 r  r  r  W4 r  W4")
       .sprites("W3 r  W3 r  r  r  W4 .  .  .  .  .  .  r  r  r  .  .  .  .  .  .  W3 r  r  r  W4 r  W4")
       .sprites("W3 r  W  W  W  W  W  .  .  .  .  .  r  r  r  r  r  .  .  .  .  .  W  W  W  W  W  r  W4")
       .sprites("W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4")
       .sprites("W  W  W  W  W  W  W  W  W  W  W  W  W3 r  r  r  W4 W  W  W  W  W  W  W  W  W  W  W  W")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W3 r  r  r  W4 .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  W  W  r  W  W  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.CONERIA_CASTLE_2F, mapOptions({start:{y:16, x:13}})).tileMapping(tiles)
       .sprites(".. .. .. .. .. .. R1 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R2 R3 .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. R4 R  R  R  R  T1 T2 T3 R  R  R  R  R5 .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. R4 R  R  &r &r T4 T5 T6 &l &l R  R  R5 .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. R6 R7 R  R  R  R  R  R  R  R  R  R7 R8 .. .. .. .. .. ..") 
       .sprites(".. .. .. .. .. .. W  W  R4 R  R  R  R  R  R  R  R5 W  W  .. .. .. .. .. ..") 
       .sprites(".. .. .. .. .. .. .. .. R6 R7 R7 R7 R7 R7 R7 R7 R8 .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. W  W1 W  W  D  W  W  W2 W  .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  P  r  P  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  P  r  P  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  P  r  P  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  r  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W3 r  r  <  r  r  W4 .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. W  W3 r  r  r  W4 W  .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 r  r  r  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 P  r  P  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 r  r  r  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 P  r  P  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 r  r  r  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 P  r  P  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. W3 r  r  r  W4 .. .. .. .. .. .. .. .. .. ..")
       .sprites("W1 W  W  W  W  W2 .. .. .. .. W3 r  r  r  W4 .. .. .. .. W1 W  W  W  W  W2")
       .sprites("W3 r  r  r  r  r  W  W  W  W  r  r  r  r  r  W  W  W  W  r  r  r  r  r  W4")
       .sprites("W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4")
       .sprites("W3 r  r  r  r  W4 W  W  W  W  W  W  W  W  W  W  W  W  W  W3 r  r  r  r  W4")
       .sprites("W  W  W  W  W  W  .. .. .. .. .. .. .. .. .. .. .. .. .. W  W  W  W  W  W");
    
    
    
    Map.create(MapConstants.ELF_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  r  r  r  r  .") 
       .sprites("W1 W  W  W  W2 .  .  .  .  .  .  .  W1 W  W  W  W2 .  .  r  R1 R2 R2 R2 R2 R3 r")
       .sprites("W3 r  r  r  r  W  W  W  W  W  W  W  r  r  r  r  W4 .  r  r  R4 Rc Rc Rc Rc R5 r")
       .sprites("W3 r  P  r  r  r  r  r  r  r  r  r  r  r  P  r  W4 .  r  r  R6 R7 R7 R7 R7 R8 r")
       .sprites("W3 r  r  r  W4 R1 R2 R2 R2 R2 R2 R3 W3 r  r  r  W4 .  r  r  W  D  W  W  W  W  r")
       .sprites("W  W1 r  W2 R1 R  R  &r f  &l R  R  R3 W1 r  W2 W  .  .  r  r  r  r  r  r  r  .")
       .sprites(".  W3 r  W4 R4 R  R  R  bt sr R  R  R5 W3 r  W4 .  .  .  .  r  r  r  r  r  .  .")
       .sprites(".  W3 r  W4 R4 R  R  R  bb R  R  R  R5 W3 r  W4 .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  W3 r  W4 R4 R  R  R  R  R  R  R  R5 W3 r  W4 .  .  .  .  .  W1 W  W  W  W2 .")
       .sprites(".  W3 r  W4 R4 &r R  R  R  R  R  &l R5 W1 r  W  W  W  W  W  W  r  r  r  r  W4 .")
       .sprites(".  W3 r  W4 R6 R7 R7 R7 R7 R7 R7 R7 R8 W3 r  r  r  r  r  r  r  r  r  P  r  W4 .")
       .sprites(".  W3 r  W4 W  W  W  W  D  W  W  W  W2 W  W  W  W  W  W  r  W  W3 r  r  r  W4 .")
       .sprites(".  W3 r  W4 r  r  r  P  r  P  r  r  W4 .  .  .  .  .  .  .  .  W  W1 r  W2 W  .")
       .sprites("W1 W  r  W  W2 r  r  r  r  r  r  r  W4 .  .  .  .  .  .  .  .  .  W3 r  W4 .  .")
       .sprites("W3 r  r  r  r  W  r  W  W3 r  r  W  W  W  W  W  W  W  W  W  W  W  r  r  W4 .  .")
       .sprites("W3 r  P  r  r  r  r  r  W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  W4 .  .")
       .sprites("W3 r  r  r  W4 W  W  W  W3 r  W4 W  W  W  W2 r  r  r  W1 W  W  W  W3 r  W4 .  .")
       .sprites("W  W  r  W  W  .  .  .  W3 r  W4 r  r  r  W4 r  r  r  W3 r  r  r  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 r  r  r  r  r  r  r  r  r  r  r  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 r  r  r  W4 r  r  r  W3 r  r  r  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 W  W  W  W  r  r  r  W  W  W  W  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  .  .  r  r  r  .  .  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  .  P  r  r  r  P  .  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  P  r  r  r  r  r  P  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  r  r  r  r  r  r  r  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  P  r  r  r  r  r  P  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  .  W3 r  W4 .  .  .  P  r  r  r  P  .  .  .  W3 r  W4 .  .")
       .sprites(".  .  .  .  .  .  .  W1 W  r  W  W2 .  .  .  r  r  r  .  .  .  W1 r  r  r  W2 .")
       .sprites(".  .  .  .  .  .  .  W3 r  r  r  r  W  W  .  r  r  r  .  W  W  r  r  r  r  W4 .")
       .sprites(".  .  .  .  .  .  .  W3 r  P  r  r  r  r  .  r  r  r  .  r  r  r  r  P  r  W4 .")
       .sprites(".  .  .  .  .  .  .  W3 r  r  r  W4 W  W  .  r  r  r  .  W  W  W3 r  r  r  W4 .")
       .sprites(".  .  .  .  .  .  .  W  W  W  W  W  .  .  .  r  r  r  .  .  .  W  W  W  W  W  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  r  r  .  .  .  .  .  .  .  .  .");

    Map.create(MapConstants.ASTOS_CASTLE, mapOptions({start:{y:28, x:14}})).tileMapping(tiles)
       .sprites(".  .  W1 W  W2 .  .  W1 W  W  W  W  W  W1 W  W  W  W2 .  .  .  .  .  .  .  .  W1 W  W2 .  .")
       .sprites(".  W1 r  r  r  W2 .  W3 r  r  r  r  r  r  r  r  r  W4 W  W  W  W2 .  .  .  W1 r  r  r  W2 .")
       .sprites("W1 r  r  r  r  r  W  W3 r  r  r  r  r  r  r  r  r  r  r  r  r  r  W  W  W  r  r  r  r  r  W2")
       .sprites("W3 r  .  .  r  r  r  W3 r  r  r  r  r  W3 r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  r  W4")
       .sprites("W  .  .  r  r  r  r  W3 r  r  r  r  r  R1 R2 R2 R2 R3 r  r  r  W4 r  W  W  W3 r  r  r  W4 W")
       .sprites(".  .  r  r  W4 W  r  W2 r  R1 R2 R2 R2 R  T1 T2 T3 R  R2 R2 R2 R3 .  .  .  W  W3 r  W4 W  .")
       .sprites(".  .  W1 r  W2 r  r  W4 .  R6 R  R  R  &r T4 T5 T6 &l R  R  R  R8 .  .  .  .  W1 r  W2 .  .")
       .sprites(".  .  W3 r  r  r  r  W4 .  W  R6 R  &r R  R  R  R  R  &l R  R8 W  W  W  W  r  W3 r  W4 .  .")
       .sprites(".  .  r  r  r  r  r  W4 .  .  W  R6 R  &r R  R  R  &l R  R8 W2 r  r  r  r  r  W3 r  W4 .  .")
       .sprites(".  .  W3 r  W4 r  r  W4 .  .  .  W  R6 R  &r R  &l R  R8 W  W4 r  P  r  P  r  W3 r  W4 .  .")
       .sprites(".  .  W3 r  W4 W  r  W  .  .  .  .  W  R6 R7 R7 R7 R8 W  r  r  r  r  r  r  r  W3 r  r  .  .")
       .sprites(".  .  W3 r  W4 r  r  r  r  r  r  r  r  W  W1 D  W2 W  r  r  W4 r  P  r  P  r  r  r  r  .  .")
       .sprites(".  .  W3 r  W4 r  r  R1 R2 R2 R2 R3 r  r  W3 r  W4 r  r  r  W4 r  r  r  r  r  W3 r  r  .  .")
       .sprites(".  .  .  r  W4 r  R1 Rc R  R  R  Rc R3 r  W3 r  W4 W  r  W  W2 r  P  r  P  r  W3 r  r  .  .")
       .sprites(".  .  .  .  W4 r  R4 R  R  Rc R  R  R5 r  W3 r  W4 r  r  r  W4 r  r  r  r  r  W3 r  W4 .  .")
       .sprites(".  .  W3 r  W4 r  R6 R  R  R  R  R  R8 r  W3 r  r  r  r  r  W4 r  P  r  P  r  r  r  W4 .  .")
       .sprites(".  .  W3 r  W4 r  W  R6 R7 R7 R7 R8 W  r  W3 r  r  r  r  r  r  r  r  r  r  r  W3 r  r  .  .")
       .sprites(".  .  W1 r  W2 r  r  W  W  D  W  W  r  r  W3 r  W4 r  r  r  r  r  P  r  P  r  W3 r  W4 .  .")
       .sprites(".  W1 r  r  r  W2 r  r  r  r  r  r  r  W1 r  r  r  W2 r  r  r  r  r  r  r  W1 r  r  r  W2 .")
       .sprites("W1 r  r  r  r  r  W2 W  W  r  W  W  W1 r  r  r  r  r  W2 r  r  W  W  r  W  r  r  r  r  r  W2")
       .sprites("W3 r  r  r  r  r  W4 r  r  r  r  r  W3 r  r  r  r  r  W4 r  r  r  r  r  r  r  r  r  r  r  W4")
       .sprites("W  W3 r  r  r  W4 W  W  r  r  r  W  W  W3 r  r  r  W4 W  W  W3 r  W4 W  W  W3 r  r  r  W4 W")
       .sprites(".  W  W3 r  W4 W  .  .  .  .  .  .  .  W  W3 r  W4 W  .  .  W3 r  W4 .  .  W  W3 r  W4 W  .")
       .sprites(".  .  W  r  W  .  .  .  .  .  .  .  .  .  W  W  W  .  .  .  W3 r  W4 .  .  .  W  r  W  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W  r  W  .  .  .  .  .  .  .  .")
  
  };
  

  
  return {
    init: init
  };
});