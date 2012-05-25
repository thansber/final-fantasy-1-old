define(/* TownMapData */
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
    "." : {y:1, x:8, desc:"grass"},
    ".1": {y:0, x:9, desc:"grass shadow top"},
    ".2": {y:1, x:9, desc:"grass shadow bottom"},
    "r" : {y:0, x:5, desc:"road"},
    "r1": {y:0, x:4, desc:"road top left"},
    "r2": {y:1, x:4, desc:"road bottom left"},
    "r3": {y:1, x:5, desc:"road bottom right"},
    "r4": {y:0, x:6, desc:"road shadow top"},
    "r5": {y:1, x:6, desc:"road shadow bottom"},
    "t" : {y:1, x:10, desc:"tree"},
    "tt": {y:0, x:10, desc:"trees"},
    "w" : {y:0, x:8, desc:"water"},
    "w1": {y:0, x:7, desc:"water shadow top"},
    "w2": {y:1, x:7, desc:"water shadow bottom"},
    "W" : {y:0, x:1, desc:"wall"},
    "W1": {y:0, x:0, desc:"wall vertical"}, 
    "W2": {y:1, x:0, desc:"wall half left"}, 
    "W3": {y:1, x:1, desc:"wall half middle"}, 
    "W4": {y:1, x:2, desc:"wall half right"}, 
    "W5": {y:0, x:3, desc:"wall vertical shadow top"}, 
    "W6": {y:1, x:3, desc:"wall vertical shadow middle"}, 
    "W7": {y:0, x:2, desc:"wall vertical shadow bottom"}, 
    "AR": {y:1, x:18, desc:"armor shop sign"},
    "BM": {y:1, x:19, desc:"black magic shop sign"},
    "CL": {y:1, x:20, desc:"clinic shop sign"},
    "IN": {y:0, x:21, desc:"inn shop sign"},
    "IT": {y:0, x:20, desc:"item shop sign"},
    "WM": {y:0, x:19, desc:"white magic shop sign"},
    "WP": {y:0, x:18, desc:"weapon shop sign"},
    "Bh": {y:1, x:14, desc:"bridge horizontal"},
    "Bv": {y:0, x:14, desc:"bridge vertical"},
    "D" : {y:1, x:16, desc:"door"},
    "F" : {y:1, x:21, desc:"fountain"},
    "FL": {y:0, x:12, desc:"flowers"},
    "FN": {y:0, x:11, desc:"fence"},
    "G" : {y:1, x:11, desc:"gravestone"},
    "H1": {y:1, x:17, desc:"house side single window"},
    "H2": {y:0, x:17, desc:"house side double window"},
    "Rt": {y:0, x:15, desc:"roof top"},
    "Rb": {y:1, x:15, desc:"roof bottom"},
    "R^": {y:0, x:16, desc:"roof angle"},
    "S" : {y:1, x:12, desc:"sand"},
    "SU": {y:1, x:13, desc:"submarine"},
    "WL": {y:0, x:13, desc:"well"},
  };
  
  var init = function() {
    Map.create(MapConstants.CONERIA, mapOptions({start:{y:23, x:16}})).tileMapping(tiles)
       .sprites("W5 W  W  W  W  W  W  W  W  W  W  W  W  W  W  tt r  tt W  W  W  W  W  W  W  W  W  W  W  W  W  W5")
       .sprites("W6 tt t  t  .  .  .  .  .  .  .  t  t  t  t  t  r  t  tt tt tt tt t  t  t  t  t  tt tt tt tt W6")
       .sprites("W6 t  Rt Rt Rt .  Rt Rt Rt .  .  .  t  w  t  .  r  .  tt tt tt tt .  Rt Rt Rt .  tt tt t  t  W6")
       .sprites("W6 .  Rb BM Rb .2 Rb WM Rb .1 .  .  .  w  .  .  r  .  tt tt tt t  .  Rb CL Rb .1 t  tt w  .  W6")
       .sprites("W6 .  H1 D  H1 .2 H1 D  H1 .2 .  r1 r  Bh r  r  r  .  t  t  t  .  .  H1 D  H1 .2 .  t  w  .  W6")
       .sprites("W6 .  .  r  .  .  .  r  .  .  .  r  .  w  .  .  r  .  .  .  .  .  .  .  r  .  .  .  .  w  .  W6")
       .sprites("W6 .  .  r2 r  r  r  r  r  r  r  r3 .  w  .  .  r  .  .  .  .  FN FN .  r  .  FN FN .  w  .  W6")
       .sprites("W6 .  .  .  .  .  .  .  .  .  .  .  .  w  w  w  Bv w  w  w  w  w  w  w  Bv w  w  w  w  w  .  W6")
       .sprites("W6 .  .  .  Rt Rt Rt Rt .  Rt Rt Rt Rt .  .  .  r  .  .  .  .  .  .  .  r  .  Rt Rt Rt w  .  W6")
       .sprites("W6 tt .  .  Rb Rb AR Rb .1 Rb Rb WP Rb .1 .  t  r  t  .  .  .  .  .  .  r  .  Rb IT Rb w1 .  W6")
       .sprites("W6 tt tt .  H2 H2 D  H2 .2 H2 H2 D  H2 .2 r1 r  r  r  r  .  .  .  .  .  r  .  H2 D  H2 w2 .  t")
       .sprites("W6 tt tt tt .  .  r  .  .  .  .  r  .  t  r  r  r  r  r  t  .  .  .  .  r  .  .  r  .  w  .  t")
       .sprites("W6 tt t  t  .  .  r2 r  r  r  r  r  r  r  r  r  F  r  r  r  r  r  r  r  r  r  r  r  r  Bh .  .")
       .sprites("W6 tt WL .  .  .  .  .  .  .  .  .  .  t  r  r  r  r  r  t  .  .  .  .  .  .  .  .  .  w  .  t")
       .sprites("W6 t  .  .  .  .  .  .  .  .  .  .  .  .  r2 r  r  r  r3 .  .  w  w  w  w  w  w  w  w  w  .  t")
       .sprites("W  W  W  W  W  W  W  W  W5 Rt Rt Rt Rt Rt .  t  r  t  .  .  .  w  .  W1 W  W  W  W  W  W  W  W")
       .sprites(".  .  .  .  .  .  .  .  W6 Rb Rb Rb Rb Rb .  .  r  .  .  .  .  w  .  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 H2 H2 IN H2 H2 .1 t  r  t  .  .  .  w  .  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 H2 H2 D  H2 H2 .2 .  r  .  .  .  .  w  .  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 .  .  r  .  .  .  t  r  t  .  .  .  w  .  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 .  FN r  FN .  .  .  r  .  .  .  .  w  .  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 .  .  r2 r  r  r  r  r  .  .  .  tt w  tt W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W6 .  .  .  .  .  .  t  r  t  .  .  t  t  t  W1 .1 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W  W  W  W  W  W  t  t  r  t  t  W  W  W  W  W  .2 .  .  .  .  .  .  .");

    Map.create(MapConstants.PRAVOKA, mapOptions({start:{y:31, x:19}})).tileMapping(tiles)
       .sprites("W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W5")
       .sprites("W1 w1 w  w  w  w  w  w  w  w  w  w  w  w  w  w  Rt Rt Rt Rt Rt Rt Rt w  w  w  w  w  w  w  w  w  w  w  w  w  w  w  W6")
       .sprites("W1 w1 Rt Rt Rt Rt Rt Rt r  r  r  r  r  r  r  w  R^ Rb Rb R^ Rb Rb R^ w1 r  Rt Rt Rt Rt Rt r  r  r  r  r  r  r  w  W6")
       .sprites("W1 w1 R^ Rb R^ Rb Rb R^ r  r  r  r  r  r  r  w1 H2 H2 H2 IN H2 H2 H2 w1 r  R^ Rb R^ Rb R^ r  r  Rt Rt Rt r  r  w1 W6")
       .sprites("W1 w1 H2 H2 H2 H2 H2 H2 r4 r  Rt Rt Rt Rt Rt w1 H2 H2 H2 D  H2 H2 H2 w1 r  H2 H2 H2 H2 H2 r4 r  R^ WM R^ r4 r  w1 W6")
       .sprites("W1 w1 H2 H2 H2 r5 H2 H2 r5 r  R^ Rb R^ Rb R^ w1 r  r  r  r  r  r  r  w2 r  H2 H2 H2 H2 H2 r5 r  H1 D  H1 r5 r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  H2 H2 H2 H2 H2 w1 w  w  w  Bv w  w  w  w  r  r  r  r  r  r  r  r  r  r  r  r  r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  H2 H2 H2 H2 H2 w1 w  w  r  r  r  w1 w  w  Rt Rt Rt Rt Rt r  r  Rt Rt Rt Rt r  r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  r  r  r  r  r  w1 w  r  r  r  r  r  w1 w  R^ Rb CL Rb R^ r  r  R^ Rb Rb R^ r4 r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  Rt Rt Rt Rt Rt r  r  r  w1 r  r  t  .  t  r  r  w1 H2 H2 H1 H2 H2 r4 r  H2 H2 H2 H2 r5 r  w1 W6")
       .sprites("W1 w1 r  Rt Rt Rt r  R^ Rb R^ Rb R^ r  r  r  r  r  t  .  .  .  t  r  r  H2 H2 D  H2 H2 r5 r  H2 H2 H2 H2 r  r  w1 W6")
       .sprites("W1 w1 r  R^ Rb R^ r  H2 H2 H2 Rt Rt Rt Rt Rt r  r  .  .  .  .  .  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  w1 W6")
       .sprites("W1 w1 r  H2 H2 H2 r4 H2 H2 H2 R^ Rb R^ Rb R^ r  r  t  .  .  .  t  r  r  r  Rt Rt Rt Rt r  r  Rt Rt Rt Rt Rt r  w1 W6")
       .sprites("W1 w1 r  H2 H2 H2 r5 r  r  r  H2 H2 H2 H2 H2 w1 r  r  t  .  t  r  r  w2 r  R^ Rb Rb R^ r  r  R^ Rb R^ Rb R^ r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  H2 H2 r5 H2 H2 w1 w  r  r  r  r  r  w2 w  r  H2 H2 H2 H2 r4 r  H2 H2 H2 H2 H2 r4 w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  r  r  r  r  r  r  w1 w  r  r  r  w1 w  r  r  H2 H2 H2 H2 r5 r  H2 H2 r5 Rt Rt Rt w1 W6")
       .sprites("W1 w1 Rt Rt Rt r  r  Rt Rt Rt Rt Rt r  r  r  r  r  w1 r  r  r  w1 r  r  Rt Rt Rt r  r  r  r  r  r  r  R^ BM R^ w1 W6")
       .sprites("W1 w1 R^ Rb R^ r  r  R^ Rb R^ Rb R^ r  r  Rt Rt Rt w1 r  r  r  w1 r  r  R^ Rb R^ r  r  r  Rt Rt Rt r  H2 D  H2 w1 W6")
       .sprites("W1 w1 H2 H2 H2 r4 r  H2 H2 Rt Rt Rt Rt Rt R^ AR R^ w1 r  r  r  w1 r  r  H2 H2 H2 r4 r  r  R^ WP R^ r4 r  r  r  w1 W6")
       .sprites("W1 w1 H2 H2 H2 r5 r  H2 H2 R^ Rb R^ Rb R^ H1 D  H1 w1 r  r  r  w1 r  r  H2 H2 Rt Rt Rt Rt H2 D  H2 r5 r  r  r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  H2 H2 H2 H2 H2 r4 r  r  w1 r  r  r  w1 r  r  r  r  R^ Rb Rb R^ r  r  Rt Rt Rt Rt r  w1 W6")
       .sprites("W1 w1 r  r  Rt Rt Rt r  r  H2 H2 r5 H2 H2 r5 r  r  w1 r  r  r  w1 r  r  r  r  H2 H2 H2 H2 r4 r  R^ Rb Rb R^ r  w1 W6")
       .sprites("W1 w1 r  r  R^ IT R^ r4 r  r  r  r  r  r  r  r  r  w1 r  r  r  w1 r  r  r  r  H2 H2 r5 H2 r5 r  H2 H2 H2 H2 r4 w1 W6")
       .sprites("W1 w1 r  r  H1 D  H1 r5 r  r  Rt Rt Rt Rt Rt r  r  w1 r  r  r  w1 r  Rt Rt Rt Rt Rt r  r  r  r  H2 H2 r5 H2 r5 w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  R^ Rb R^ Rb R^ r  r  w1 r  r  r  w1 r  R^ Rb R^ Rb R^ r  r  r  r  r  r  r  r  r  w1 W6")
       .sprites("W1 w1 r  Rt Rt Rt Rt Rt r  r  H2 H2 H2 H2 H2 r4 r  w1 r  r  r  w1 r  H2 H2 H2 H2 H2 r4 r  Rt Rt Rt Rt r  r  r  w1 W6")
       .sprites("W1 w1 r  R^ Rb R^ Rb R^ r  r  H2 H2 H2 H2 H2 r5 r  w1 r  r  r  w1 r  H2 H2 r5 H2 H2 r5 r  R^ Rb Rb R^ r  r  r  w1 W6")
       .sprites("W1 w1 r  H2 H2 H2 H2 H2 r4 r  r  r  r  r  r  r  r  w2 r  r  r  w1 r  r  r  r  r  r  r  r  H2 H2 H2 H2 r4 r  r  w1 W6")
       .sprites("W1 w1 r  H2 r5 H2 H2 H2 r5 r  r  r  r  w1 w  w  w  w  r  r  r  w1 w  w  w  w  r  r  r  r  H2 H2 H2 H2 r5 r  r  w1 W6")
       .sprites("W1 w1 r  r  r  r  r  r  r  r  r  r  r  w2 W6 t  .  .  r  r  r  .  .  t  W1 w  r  r  r  r  r  r  r  r  r  r  r  w2 W6")
       .sprites("W1 w1 w  w  w  w  w  w  w  w  w  w  w  w  W6 t  .  .  r  r  r  .  .  t  W1 w1 w  w  w  w  w  w  w  w  w  w  w  w  W6")
       .sprites("W2 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W4 t  .  .  r  r  r  .  .  t  W2 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W4")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  .  .  r  r  r  .  .  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .");

    Map.create(MapConstants.ELFLAND, mapOptions({start:{y:22, x:41}})).tileMapping(tiles)
       .sprites(".  tt tt tt tt tt tt tt tt t  t  t  t  t  t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  t  t  t  t  t  t  .  .  .")
       .sprites("tt tt tt tt tt tt tt tt tt w  w  w  w  w  w  w  w  w  w  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t")
       .sprites("tt Rt Rt Rt tt tt tt tt tt tt tt tt Rt Rt Rt .  .  .  w  .  t  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("tt Rb BM Rb tt tt tt tt tt tt tt t  Rb WM Rb .1 .  .  Bh .  .  t  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("t  H1 D  H1 t  tt tt tt tt t  t  .  H1 D  H1 .2 .  .  w  .  .  .  tt tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  tt tt tt t  .  .  .  .  .  .  .  .  .  w  .  .  .  t  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  tt tt tt t  .  .  .  .  .  .  .  .  tt tt w  .  .  .  .  tt tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("tt tt .  .  t  t  t  .  .  .  .  .  .  .  tt tt tt tt w  tt tt .  .  t  tt tt tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("tt tt tt .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt w  tt tt .  .  .  t  t  tt tt tt tt tt tt tt tt tt .  .  .  .  .  .  .")
       .sprites("tt tt tt tt .  .  .  .  .  tt tt tt tt tt tt tt tt t  w  tt tt tt .  .  .  .  t  tt tt tt tt tt t  t  t  t  t  .  .  .  .  .")
       .sprites("tt tt tt tt .  .  .  tt tt tt tt tt tt tt tt tt tt w  w  tt tt tt tt .  .  .  .  t  t  tt tt t  .  G  G  G  .  t  tt .  .  .")
       .sprites("tt tt tt t  .  .  tt tt tt tt tt tt tt tt tt tt tt w  tt tt tt tt tt .  .  .  .  .  t  tt tt t  .  .  .  .  .  .  t  .  .  t")
       .sprites("tt tt tt w  Bv w  tt tt tt tt tt tt tt t  t  t  t  w  t  tt tt tt t  .  .  tt tt Rt Rt Rt tt .  .  .  .  .  .  .  .  .  .  t")
       .sprites("tt tt tt .  .  tt tt tt tt t  t  t  t  w  w  w  w  w  w  t  t  t  .  .  tt tt tt Rb WM Rb t  .  tt tt tt tt tt tt tt .  .  .")
       .sprites("t  tt tt .  .  tt tt tt t  w  w  w  w  w  .  Rt Rt Rt w  .  .  .  .  t  t  tt tt H1 D  H1 .2 .  t  tt tt tt tt tt tt .  .  .")
       .sprites(".  tt tt .  .  tt tt t  .  .  .  .  .  .  .  Rb IT Rb w1 w  w  .  .  .  .  t  t  .  .  .  .  .  .  t  t  t  tt tt t  .  .  .")
       .sprites(".  tt tt .  .  t  t  .  .  .  .  .  .  .  .  H2 D  H2 .2 .  w  w  Bv w  w  w  w  w  w  w  w  w  w  w  w  w  t  t  .  .  .  tt")
       .sprites(".  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt Rt Rt Rt .  .  .  .  .  .  .  .  .  .  tt tt")
       .sprites(".  t  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt Rb BM Rb .1 .  .  .  tt Rt Rt Rt Rt Rt Rt tt")
       .sprites(".  .  tt tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt H1 D  H1 .2 .  tt tt tt Rb IN Rb Rb Rb Rb tt")
       .sprites(".  .  tt tt tt tt tt tt tt tt .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt H2 D  H2 H2 H2 H2 tt")
       .sprites(".  .  t  tt tt tt tt tt tt t  .  .  .  tt tt tt tt tt t  t  tt Rt Rt Rt tt tt tt tt .  .  .  .  t  t  t  t  .  t  t  t  t  t")
       .sprites(".  .  .  t  tt tt tt tt tt .  .  .  tt tt tt tt tt t  .  .  Rt Rb CL Rb Rt tt t  t  tt tt tt .  .  r  r  r  r  r  r  r  r  r")
       .sprites(".  .  .  .  t  t  tt tt tt .  tt tt tt tt tt tt tt .  .  .  R^ H1 H1 H1 R^ .1 .  .  t  t  tt tt .  r  .  .  .  .  .  t  t  t")
       .sprites(".  .  .  .  .  .  tt tt t  .  tt tt tt tt tt tt tt .  .  .  H2 H2 D  H2 H2 .2 .  .  .  .  t  t  .  r  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  tt t  .  .  t  Rt Rt Rt t  tt tt t  .  .  .  .  r  .  .  .  .  .  .  .  .  .  .  r  tt tt .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  tt .  .  .  .  Rb AR Rb .1 t  tt .  .  .  FN FN r  FN FN .  .  .  .  .  .  r  r  r  tt tt tt .  .  .  .  .")
       .sprites(".  .  .  .  .  .  t  tt .  .  .  H2 D  H2 .2 .  t  .  tt .  .  .  r  .  .  .  .  .  .  .  .  r  tt tt Rt Rt Rt .  .  tt .  .")
       .sprites(".  .  .  .  .  .  .  tt tt .  .  .  .  .  .  .  .  .  tt .  .  .  r  r  r  r  r  r  r  r  r  r  tt tt Rb WP Rb .1 .  tt .  .")
       .sprites(".  .  .  .  .  .  .  t  tt tt .  .  .  .  tt tt tt tt tt tt .  .  .  .  .  .  .  tt tt tt tt tt tt t  H2 D  H2 .2 .  tt .  .")
       .sprites(".  .  .  .  .  .  .  .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  tt tt .  .")
       .sprites(".  .  .  .  .  .  .  .  .  t  t  t  t  t  t  t  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  .  .");

    Map.create(MapConstants.MELMOND, mapOptions({start:{y:17, x:0}})).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  w  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  W  W  W  W5 G  G  G  G  G  G  .  w  .  .  .")
       .sprites(".  .  .  .  .  .  W1 W  W  .2 t  S  t  Rt Rt Rt S  t  S  S  .  W  W  W5 G  .  .  G  G  w  .  .  .")
       .sprites(".  .  .  .  W1 W  W  .2 S  S  .  .  .  Rb AR Rb .1 .  .  S  S  S  S  W  W  W5 .  .  .  w  .  .  .")
       .sprites(".  .  .  W1 W  .2 .  S  S  t  .  .  .  H2 D  H2 .2 .  .  t  .  .  S  S  S  W  W5 .  w  w  .  .  .")
       .sprites(".  .  .  W1 .2 .  S  S  S  S  S  t  .  .  .  .  .  S  S  .  .  S  S  S  S  S  W7 .  w  .  .  .  .")
       .sprites(".  .  W  W  .2 .  .  .  .  S  r  r  S  S  S  .  .  .  S  S  S  S  S  S  S  S  S  S  w  .  .  .  .")
       .sprites("r  r  r  r  r  r  r  .  .  r  r  .  w  w  w  w  w  w  w  Bv w  w  w  w  w  w  w  w  w  .  .  .  .")
       .sprites("r  .  .  .  S  S  S  S  S  S  S  S  w  .  .  W1 W  W  W  .  W5 .  S  S  S  S  w  w  w  .  .  .  .")
       .sprites("r  W5 S  S  S  S  w  w  w  w  w  w  w  .  G  W  .2 .  .  .  W  W  W5 S  S  r  r  r  w  w  w  w  .")
       .sprites("r  W6 .  .  .  w  w  S  S  S  S  .  .  W1 G  G  .  .  Rt Rt Rt .  W6 .  S  r  CL r4 r  W1 .1 w  .")
       .sprites("r  W6 G  G  G  w  Rt Rt Rt Rt Rt .  .  W  .2 G  G  S  Rb WP Rb .1 W  W5 r  r  Rb Rb .  W1 .1 w  w")
       .sprites("r  W6 G  G  w  w  Rb Rb Rb Rb Rb .  .  .  .  S  S  S  H2 D  H2 .2 WL W6 r  H2 r5 H1 .2 W1 .1 .  .")
       .sprites("r  W6 G  G  G  .  H2 H2 IN H2 H2 .1 .  .  S  S  S  S  .  .  .  .  S  W6 S  r  r  r  r  W1 .1 .  .")
       .sprites("r  W6 .  .  .  .  H2 H2 D  H2 H2 .2 .  .  .  .  S  S  S  S  S  S  S  W6 S  S  S  r  .  W1 .1 .  .")
       .sprites("r  W6 .  .  .  .  .  .  r  .  .  .  .  .  .  .  .  .  .  S  S  W1 W  W7 S  S  r  r  .  W1 .1 .  .")
       .sprites("r  W7 .  .  .  S  S  S  r  .  .  .  .  .  W  W  .  .  .  .  .  W  .2 S  S  r  .  r  r  W1 .1 .  .")
       .sprites("r  r  r  r  S  r  r  r  r3 S  S  S  S  S  .  .  W  .  W5 .  .  S  S  S  S  S  .  .  r  W1 .1 .  .")
       .sprites(".  .  .  .  S  S  S  r  S  S  S  S  S  Rt Rt Rt .  .  W7 .  .  S  S  S  S  S  S  r  .  W1 .1 .  .")
       .sprites(".  W5 .  .  .  S  S  r  S  S  S  S  .  Rb WM Rb .1 .  .  .  S  S  S  S  S  S  S  .  .  W1 .1 .  .")
       .sprites(".  W  W5 .  .  G  S  r  S  S  S  S  .  H1 D  H1 .2 S  S  S  S  S  S  S  S  .  .  W1 W  W  .2 .  .")
       .sprites(".  .  W6 .  G  G  t  r  S  S  S  r1 r  r  r3 S  S  S  S  S  S  S  S  S  .  .  .  W1 .1 .  .  .  .")
       .sprites(".  .  W  W5 .  G  S  r  S  S  S  r  .  S  S  S  S  S  .  .  .  .  .  .  .  W1 W  W  .2 .  .  .  .")
       .sprites(".  .  .  W6 G  G  G  r  S  S  S  r  .  .  S  S  S  .  Rt Rt Rt .  .  .  .  W1 .1 .  .  .  .  .  .")
       .sprites(".  .  .  W6 .  G  .  r2 r  r  r  r3 .  S  S  .  .  .  Rb BM Rb .1 .  .  .  W1 .1 .  .  .  .  .  .")
       .sprites(".  .  .  W  W  W5 G  G  G  r  S  S  S  S  S  S  S  S  H1 D  H1 .2 .  .  W1 W  .2 .  .  .  .  .  .")
       .sprites(".  .  .  .  .  W  W  W5 G  r2 r  r  r  S  S  r  r  r  r  r  r3 .  W1 W  W  .2 .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  W  W  W5 .  .  .  S  S  S  S  .  .  .  W1 W  W  .2 .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  W  W  W  W  S  S  S  S  S  S  W  W  .2 .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .");
    
    Map.create(MapConstants.CRESCENT_LAKE, mapOptions({start:{y:24, x:11}})).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .")
       .sprites("W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  W  .  t  t  tt tt tt t  t  t  tt tt tt tt tt tt tt tt tt t  tt tt t  tt tt tt .  .  .  .")
       .sprites("W1 .1 G  G  .  .  t  tt tt tt tt tt .  .  .  .  .  .  .  .  .  .  t  t  t  .  .  .  t  tt tt tt tt t  tt tt t  .  t  t  .  tt t  tt tt tt .  .")
       .sprites("W1 .1 .  .  .  .  .  tt tt tt tt tt Rt Rt Rt .  Rt Rt Rt .  .  .  .  .  .  .  .  .  .  tt tt tt tt .  t  t  .  .  .  .  .  t  .  tt tt tt .  .")
       .sprites("W1 .1 .  Rt Rt Rt .  w  w  w  t  tt Rb WM Rb .1 Rb BM Rb .1 W5 tt .  .  .  .  tt .  .  tt tt tt t  tt .  .  .  .  .  .  .  .  t  t  tt tt tt .")
       .sprites("W1 .1 .  Rb WP Rb w1 w  w  w  w  t  H2 D  H2 .2 H2 D  H2 .2 W6 t  tt t  .  .  tt .  .  tt tt tt .  tt t  .  .  .  .  .  .  .  .  .  t  tt tt .")
       .sprites("W1 .1 .  H2 D  H2 w2 w  w  w  w  .  FN r  .  .  .  r  FN FN W6 .  tt t  .  tt tt .  .  t  tt tt t  t  .  .  .  .  .  .  .  .  .  .  .  tt tt tt")
       .sprites("W1 .1 FN FN r  FN FN w  w  w  w  w  w  Bv w  w  w  Bv w  w  W6 .  t  tt .  tt tt tt .  .  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt")
       .sprites("W1 .1 .  .  r2 r  r  Bh Bh Bh Bh Bh r  r  r  r  r  r3 .  .  W6 .  tt tt .  tt tt tt .  .  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  t  tt tt")
       .sprites("W1 .1 tt tt tt tt .  w  w  w  w  w  r  .  .  .  .  .  .  .  W6 .  tt tt tt tt tt tt .  .  tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  t  tt tt")
       .sprites("W1 .1 t  t  tt tt tt w  w  w  w  w  r  .  G  G  G  G  tt tt W6 .  tt tt tt tt tt tt .  .  tt t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  tt")
       .sprites("W1 .1 FL FL Rt Rt Rt w  w  w  w  w  r  tt tt tt tt .  tt tt W6 .  tt tt tt tt tt tt .  .  tt tt tt .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt")
       .sprites("W1 .1 FL FL Rb AR Rb w1 w  w  w  w  r  t  Rt Rt Rt .  tt tt W6 tt tt tt tt tt tt tt .  .  tt tt tt t  .  .  .  .  .  .  .  .  .  .  tt tt tt tt")
       .sprites("W1 .1 FL FL H1 D  H1 w2 w  w  w  w  r  .  Rb CL Rb .1 tt tt W6 tt tt tt tt tt tt tt .  .  t  tt tt .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt")
       .sprites("W1 .1 FL FL FL r  .  t  t  t  t  t  r  .  H1 D  H1 .2 tt tt W6 tt tt tt tt tt tt tt .  .  .  tt tt tt tt .  tt tt .  .  t  tt .  .  t  tt tt tt")
       .sprites("W1 .1 FL FL FL r2 r  r  r  r  r  r  r3 tt FL r  FL .  tt tt W6 tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt t  .  .  tt tt tt tt .  tt tt tt")
       .sprites("W1 .1 tt tt tt tt tt r  tt tt tt tt tt tt FL r  FL tt tt tt W6 tt tt tt tt tt tt tt tt t  .  tt tt tt t  t  t  .  .  .  tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 tt Rt Rt Rt tt r  tt Rt Rt Rt Rt tt .  r  .  tt tt tt W6 tt tt tt tt tt tt tt tt .  .  t  tt t  .  .  .  t  .  .  tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 tt Rb IT Rb tt r  tt Rb Rb Rb Rb tt .  r  .  tt tt tt W6 tt tt tt tt tt tt tt tt .  t  t  t  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 tt H2 D  H2 tt r  tt H1 H1 IN H1 tt .  r  .  tt tt tt W6 tt tt tt tt tt tt tt tt .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 tt FL r  FL tt r  tt H1 H1 D  H1 tt .  r  .  t  tt tt W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 t  FN r  FN t  r  t  .  .  r  .  t  .  r  t  .  t  tt W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 .  .  r2 r  r  r  r  r  r  r  r  r  r  r3 .  .  .  t  W6 t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("W1 .1 .  .  .  .  .  .  t  t  t  r  t  t  t  t  t  t  t  t  W6 .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("W2 W3 W3 W3 W3 W3 W3 W3 W3 W3 W4 r  W2 W3 W3 W3 W3 W3 W3 W3 W4 .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt");
    
    Map.create(MapConstants.ONRAC, mapOptions({start:{y:39, x:16}})).tileMapping(tiles)
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  t  t  t  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt tt tt t  t  t  t  tt tt tt tt tt tt t  t  t  t  t  t  t  tt tt W1 W  W  W  W  W  W  W  W5 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt tt t  .  .  .  .  t  tt tt tt tt tt WL .  .  .  .  .  .  t  tt W1 t  .  G  .  G  .  t  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt t  WL .  Rt Rt Rt .  tt tt tt tt t  .  .  Rt Rt Rt .  .  .  tt W1 .  .  .  .  .  .  .  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt .  .  .  Rb IT Rb .2 t  tt tt tt .  .  .  Rb CL Rb .  .  .  tt W1 .  G  .  G  .  G  .  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt .  .  .  H1 D  H1 .2 .  tt tt t  .  .  .  R^ H2 R^ .2 .  .  tt W1 .  .  .  .  .  .  .  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt tt .  .  .  .  r  .  .  .  tt tt .  .  .  .  H1 D  H1 .2 .  .  tt W1 .  G  .  G  .  G  .  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("t  tt .  .  .  .  r  .  .  .  tt tt .  .  .  .  .  r  .  .  .  .  tt W1 .  .  .  .  .  .  .  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  t  .  .  .  .  r  .  .  t  t  t  t  .  .  t  .  r  .  t  .  t  tt W1 t  .  .  .  .  .  t  W6 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  .  FN FN FN .  r  .  FN FN .  .  FN FN FN FN .  r  .  FN FN FN t  W2 W3 W3 W4 .  W2 W3 W3 W4 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  .  .  .  .  .  r  .  .  .  .  .  .  .  .  .  .  r  .  .  .  .  .  .  .  t  .  r  .  t  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  .  .  .  .  .  r2 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r3 .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  .  .  .  .  .  r  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  .  tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  r  .  .  .  .  .  r  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites(".  tt tt t  t  t  t  t  t  t  tt tt tt .  .  .  .  r  .  .  .  .  .  r  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt t  w  w  w  w  w  w  w  w  w  t  tt r  r  r  r  r3 .  .  .  .  .  r  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt w  Rt Rt Rt Rt Rt Rt Rt Rt Rt w  t  r  .  .  t  t  t  t  t  t  t  r  t  t  t  t  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt w  Rb Rb Rb R^ Rb R^ Rb Rb Rb w  t  r  .  .  t  r  Rt Rt Rt Rt Rt r  Rt Rt Rt Rt Rt r  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt w  Rb Rb Rb H2 IN H2 Rb Rb Rb w1 t  r  .  .  t  r  R^ Rb WM Rb R^ r4 R^ Rb BM Rb R^ r4 .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt w  R^ Rb R^ H2 D  H2 R^ Rb R^ w1 t  r  .  .  t  r  H1 H1 D  H1 H1 r5 H1 H1 D  H1 H1 r5 .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w")
       .sprites("tt w  H2 H2 H2 .2 r  .  H2 H2 H2 w1 t  r  .  .  t  r2 r  r  r  r  r  r  r  r  r  r  r  r3 .  tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  t  w  w  w")
       .sprites("tt w  H2 H2 H2 .2 r  .  H2 H2 H2 w2 t  r  .  .  t  t  t  t  t  t  t  t  t  r  t  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt t  w  w  w  w  w  w  w")
       .sprites("tt w  t  .  .  .  r  .  .  .  t  w  t  r  r  r  r  r  r  r  r  r  r  r  r  r  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  t  .  t  w  w  w")
       .sprites("tt w  t  .  .  r1 r  r  .  .  t  w  t  r  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt w  t  .  .  t  w  w  w")
       .sprites("tt w  t  .  .  r  F  r  .  .  t  w  t  r  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt t  t  t  t  t  w  .  .  t  t  w  w  w")
       .sprites("tt w  t  .  .  r2 r  r3 .  .  t  w  w  Bh w  w  w  w  w  w  w  w  w  w  w  w  .  .  .  .  tt tt tt tt tt tt tt tt w1 w  w  w  w  w  .  t  t  .  w  w  w")
       .sprites("tt w  t  .  .  .  r  .  .  .  t  w  t  r  .  .  .  .  .  .  .  .  .  .  .  w  .  .  .  .  tt tt tt tt t  t  t  t  w2 t  t  .  .  .  .  .  .  t  w  w  w")
       .sprites("tt w  t  t  t  t  r  t  t  t  t  w  t  r  .  .  .  .  .  .  .  .  .  .  .  w  w  w  w  w  tt tt tt tt w1 w  w  w  w  .  .  .  .  t  t  t  t  w  w  w  w")
       .sprites("tt w  w  w  w  w  Bv w  w  w  w  w  t  r  .  .  .  .  .  .  .  .  .  .  .  w  .  .  .  .  t  t  t  t  t  .  .  t  t  .  t  t  t  t  t  r  r  r  w  w  w")
       .sprites("tt tt tt tt tt tt r  t  t  t  t  t  r  r  r  r  r  r  r  r  r  r  r  r  r  Bh r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  SU w  w  w  w")
       .sprites("tt tt tt tt tt tt r2 r  r  r  r  r  r3 .  .  .  .  .  .  .  .  .  .  .  .  w  t  t  t  t  .  .  .  .  .  t  t  t  t  t  .  .  t  t  t  r  r  r  w  w  w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  t  t  t  w  w  w  w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  t  t  t  w  w  w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w")
       .sprites("tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w")
       .sprites("t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  .  .  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  w")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  w");
    
    Map.create(MapConstants.GAIA, mapOptions({start:{y:54, x:54}})).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  FN FN FN FN FN tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  FN FN FN tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  tt tt tt tt tt t  t  t  t  t  t  t  t  t  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  tt tt tt tt tt tt t  FN FN FN FN FN Rt Rt Rt Rt Rt FN FN t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  t  t  t  tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt tt tt tt tt .  tt WL .  t  t  Rb Rb CL Rb Rb t  tt .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  w  w  w  w  w  w  t  tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt tt tt tt t  .  tt .  .  .  .  R^ Rb H2 Rb R^ .1 tt .  .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w  w  w  w  w  w  tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt tt tt t  .  .  tt .  .  .  .  H1 H2 D  H2 H1 .2 tt .  t  .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w  w  w  w  w  w  tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt tt t  .  .  .  FN FN tt .  .  tt tt r  tt tt .  tt .  .  .  .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt w  w  w  w  w  w  w  w  tt tt tt tt tt tt tt tt tt")
       .sprites("t  tt tt tt .  .  .  .  .  .  tt .  .  .  .  r  .  .  .  tt .  .  .  .  .  t  t  tt tt tt tt tt tt tt tt tt tt tt t  w  w  w  w  w  w  tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  t  t  tt .  .  .  .  .  .  FN FN FN FN FN r  FN FN FN FN .  .  t  .  t  .  .  t  t  t  t  tt tt tt tt tt tt tt tt t  .  .  .  .  t  tt tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  t  .  .  .  .  .  .  .  .  .  .  .  r  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  tt tt tt tt tt tt tt tt t  .  t  .  tt t  tt tt tt tt tt tt tt tt tt")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  .  .  .  .  tt tt .  .  .  t  .  .  .  t  .  .  t  tt tt tt tt tt tt t  .  .  .  t  t  tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  .  .  .  tt tt tt tt tt .  .  .  tt tt .  .  .  .  tt tt tt tt tt tt .  t  .  t  .  tt tt tt tt tt tt tt tt tt tt t")
       .sprites("tt tt .  .  .  .  .  .  r1 r  r  r  r  r  r  r3 .  tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt tt tt t  .  .  .  .  .  t  tt tt tt tt t  t  tt t  t  .")
       .sprites("tt tt tt .  .  .  .  .  r  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  .  tt tt tt tt tt tt .  .  .  t  .  .  .  t  t  t  t  .  .  t  .  .  .")
       .sprites("tt tt tt tt tt tt .  .  r  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  t  tt tt tt tt tt tt .  .  t  .  .  .  .  .  .  .  .  .  .  .  .  t  .")
       .sprites("tt tt tt tt tt tt tt .  r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  .  .  tt tt tt tt tt tt tt .  .  .  .  .  t  .  tt tt tt tt tt tt tt tt .")
       .sprites("tt tt tt tt tt tt tt .  r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  .  .  tt tt tt tt tt tt tt tt tt .  .  t  .  .  tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt tt t  t  tt tt r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  t  .  .  tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt tt t  .  .  t  tt r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt tt tt tt tt tt tt t  .  .  .  tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt tt t  .  .  .  .  t  r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  t  t  t  tt tt tt tt t  t  t  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt t  r1 r  r  r  r  r  r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  t  t  tt t  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt .  r  tt Rt Rt Rt .  r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  t  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt t  r  tt IT Rb Rb .1 r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  t  .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt .  r  tt D  H2 H2 .2 r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt")
       .sprites("tt t  r  t  r  FN FN FN r  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  tt tt t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t")
       .sprites("tt t  r2 r  r  r  r  r  r3 tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  t  t  .  .  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  .")
       .sprites("tt tt .  .  r  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  Rt Rt Rt Rt Rt .  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  .  .  .  .")
       .sprites("tt tt tt .  r  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  .  t  Rb WM Rb BM Rb .1 .  tt tt tt tt tt tt tt tt tt tt tt tt t  t  .  .  .  .  .")
       .sprites("tt tt tt tt r  .  tt tt tt tt tt t  t  t  t  t  t  tt tt tt tt tt tt t  .  .  .  .  .  H2 D  H2 D  H2 .2 t  tt tt tt tt tt tt tt tt tt tt tt t  .  .  .  .  .  .  .")
       .sprites("tt tt tt t  r  .  tt tt tt tt t  .  .  .  .  .  .  t  t  t  t  t  t  .  .  t  t  t  .  .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt tt t  .  .  .  .  t  t  t  t")
       .sprites("tt tt tt .  r  tt tt tt t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  t  .  .  tt tt tt tt tt tt tt t  t  t  .  .  .  .  t  .  .  .  .")
       .sprites("tt tt tt .  r  tt tt t  .  .  .  .  tt tt tt tt tt .  .  .  .  .  .  .  .  .  .  t  t  t  t  .  .  .  .  tt tt tt tt tt tt tt t  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("tt tt tt .  r  t  t  .  .  tt tt tt tt tt tt tt tt tt tt tt tt tt tt .  .  .  .  .  .  t  .  .  .  tt tt tt tt tt tt tt tt t  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("t  tt tt tt r  .  .  .  tt tt tt tt tt t  t  t  t  t  tt tt tt tt tt tt .  .  .  .  .  .  .  tt tt tt tt tt tt tt tt tt t  .  .  .  .  .  t  t  t  t  t  t  t  .  .")
       .sprites(".  tt tt tt r  .  .  .  tt tt tt tt t  .  .  .  .  .  t  t  t  tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt tt t  t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  t  .")
       .sprites(".  t  tt tt r  .  .  tt tt t  t  t  .  .  .  .  .  .  .  .  .  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t")
       .sprites(".  .  tt t  r  .  .  tt tt r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r")
       .sprites(".  .  tt .  r  .  .  tt tt r  r  r  r  r  r  r  r  r  r  r  r  r  r  Rt Rt Rt Rt Rt Rt Rt r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r")
       .sprites(".  .  t  .  r  .  tt t  t  r  r  Rt Rt Rt Rt Rt Rt Rt Rt Rt .  W1 W  Rb Rb Rb R^ Rb Rb Rb W  W5 .  r  r  r  tt t  t  Rt Rt Rt Rt t  tt tt FN Rt Rt Rt Rt FN FN tt r")
       .sprites(".  .  .  .  r  .  t  .  .  r  r  Rb WP Rb Rb Rb Rb Rb AR Rb .1 W1 t  H1 H1 H1 IN H1 H1 H1 .1 W6 .  r  r  r  tt .  .  Rb WM Rb Rb .1 tt tt r  Rb Rb BM Rb r4 r  tt r")
       .sprites("FN FN .  .  r  FN FN FN FN r  r  H2 D  H2 H1 H2 H1 H2 D  H2 .2 W1 t  H2 H2 H2 D  H2 H2 H2 .2 W6 .  r  r  r  tt .  .  H2 D  H2 H2 .2 tt tt r  H1 H1 D  H1 r5 r  tt r")
       .sprites(".  .  .  .  r  .  .  .  .  r  r  tt r  tt tt tt tt tt r  .  .  W2 W3 W3 W3 W4 r  W2 W3 W3 W3 W4 .  r  r  r  t  t  t  t  r  t  t  t  t  t  FN FN FN r  FN FN FN t  r")
       .sprites("r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r")
       .sprites("r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r3")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  r  .  .  .  .  .  .  .  .  .")
       .sprites("FN FN FN FN FN FN FN FN FN FN FN FN .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  FN FN FN FN FN FN FN FN FN FN FN FN FN FN FN FN .  r  r  .  FN FN FN FN FN FN FN .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  r  .  .  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  t  t  t  t  t  t  t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  t  t  t  t  .  .  .  .  .  .  r  r  r  r  r  r  r  r  r  r  r")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r2 r  r  r  r  r  r  r  r  r  r")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  r  r")
       .sprites(".  .  .  .  .  FN FN FN FN FN FN FN .  .  .  FN FN FN FN FN FN FN FN FN .  .  .  .  FN FN FN FN FN .  .  .  .  FN FN FN FN FN FN FN FN FN FN FN FN FN FN FN .  r2 r3");
    
    Map.create(MapConstants.LEFEIN, mapOptions({start:{y:23, x:17}})).tileMapping(tiles)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  .  .  .  .  .  .  .")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  .  t  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  .  Rt Rt Rt Rt .  t  .")
       .sprites("W1 W  W  W  W  W  W  W  W  W  W  W  W  W  W5 .  .  .  .  .  W1 W  W  W  W  W  W  W  W  W  t  t  t  t  t  .  .  .  .  .  .  .  .  .  .  .  t  t  t  .  R^ WM BM R^ .1 t  t")
       .sprites("W1 r  r  r  r  r  r  r  r  r  r  r  r  r  W  W  W  W  W  W  W  r  r  r  r  r  r  r  r  r  r  r  t  t  .  .  .  .  .  .  .  .  .  .  .  t  .  t  .  .  H2 D  D  H2 .2 t  .")
       .sprites("W1 r  Rt Rt Rt r  Rt Rt Rt Rt Rt Rt Rt r  Rt Rt Rt Rt Rt Rt Rt r  Rt Rt Rt Rt Rt Rt r  Rt Rt Rt r  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  R^ Rb R^ r4 R^ Rb R^ Rb R^ Rb R^ r4 R^ Rb R^ Rb R^ Rb R^ r4 R^ Rb R^ R^ Rb R^ r4 R^ Rb R^ r4 t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  .  t  .  .  t  t  .")
       .sprites("W1 r  H1 H2 H1 r5 H1 H2 H1 H2 H1 H2 H1 r5 H1 H2 H1 r5 H1 H2 H1 r5 H1 H2 H1 H1 H2 H1 r5 H1 H2 H1 r5 W5 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  t  t  .  .  .  t  .  .")
       .sprites("W1 r  t  .  t  r  t  .  t  .  t  .  t  r  t  .  t  r  t  .  t  r  t  .  t  t  .  t  r  t  .  t  r  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  r  t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  r  r  r  t  t  t  t  t  t  t  t  t  t  t  r  r  r  t  t  t  t  t  t  t  t  t  t  t  r  r  r  W5 t  t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  r  r  r  t  W  W  W  W  W  W  W  W  r  t  r  r  r  t  r  W  W  W  W  W  W  W  W  t  r  r  r  W6 t  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  w  w  w  w  w  w  w  w  w  r  t  r  r  r  t  r  w1 w  w  w  w  w  w  w  w  w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 r  r  r  r  r  r  r  r  r  r  w1 r  t  r  r  r  t  r  w1 r  r  r  r  r  r  r  r  r  w1 r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 r  r  r  r  r  r  r  r  r  r  w1 r  r  r  r  r  r  r  w1 r  r  r  r  r  r  r  r  r  w1 r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  Bh Bh Bh Bh Bh Bh Bh Bh r  r  r  w1 r  r  t  r  t  r  r  w1 r  r  r  Bh Bh Bh Bh Bh Bh Bh r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  r  r  r  r  r  r  r  r  w1 r  t  r  r  r  t  r  w1 r  r  r  r  r  r  r  w1 w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  r  r  r  r  r  r  r  r  w1 r  r  r  F  r  r  r  w1 r  r  r  r  r  r  r  w1 w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  Bh Bh Bh Bh Bh Bh Bh Bh r  r  r  w1 r  t  r  r  r  t  r  w1 r  r  r  Bh Bh Bh Bh Bh Bh Bh r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  w  w  r  r  r  r  r  r  w1 r  r  t  r  t  r  r  w1 r  r  r  r  r  w1 w  w  w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  w  w  r  r  r  r  r  r  w1 r  r  r  r  r  r  r  w1 r  r  r  r  r  w1 w  w  w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  Bh Bh Bh Bh Bh Bh Bh Bh r  r  r  w1 r  t  r  r  r  t  r  w1 r  r  r  Bh Bh Bh Bh Bh Bh Bh r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  w  w  w  w  w  r  r  r  w2 r  t  r  r  r  t  r  w1 r  r  r  w  w  w  w  w  w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W1 r  w1 w  w  w  w  w  w  w  w  w  w  w  r  t  r  r  r  t  r  w1 w  w  w  w  w  w  w  w  w  w  r  W6 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
       .sprites("W2 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W4 r  r  r  r  r  r  r  W2 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W3 W4 .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
  };
  
  return {
    init: init
  };
});