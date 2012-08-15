define(/* MirgaeTowerMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
 
  var tiles_lower = {
    "$" : {y:1, x:1, desc:"chest", inside:{y:6, x:4}},
    "~" : {y:4, x:1, desc:"nothing"},
    "." : {y:1, x:4, desc:"path", inside:{y:4, x:4}},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}},
    "^" : {y:2, x:5, desc:"stairs up", inside:{y:5, x:5}},
    "v" : {y:2, x:4, desc:"stairs down", inside:{y:5, x:4}},
    "WW": {y:0, x:4, desc:"wall", inside:{y:3, x:4}},
    "W+": {y:0, x:3, desc:"wall top left", inside:{y:3, x:3}},
    "+W": {y:0, x:5, desc:"wall top right", inside:{y:3, x:5}},
    "W|": {y:1, x:3, desc:"wall left", inside:{y:4, x:3}},
    "|W": {y:1, x:5, desc:"wall right", inside:{y:4, x:5}},
    "#-": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "--": {y:0, x:1, desc:"room wall top ", inside:{y:3, x:1}},
    "-#": {y:0, x:2, desc:"room wall top right", inside:{y:3, x:2}},
    "#|": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "|#": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "#_": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "__": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}},
    "_#": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "[]": {y:2, x:3, desc:"door", inside:{y:5, x:3}},
    "U" : {y:1, x:1, desc:"inside rock", inside:{y:0, x:6}},
    "UU": {y:1, x:6, desc:"rock", inside:{y:2, x:6}}
    "C-": {y:1, x:1, desc:"computer left half", inside:{y:6, x:0}}
    "-C": {y:1, x:1, desc:"computer right half", inside:{y:6, x:1}}
    "C" : {y:1, x:1, desc:"computer 2 column", inside:{y:6, x:2}}
    "CC": {y:1, x:1, desc:"computer 1 column", inside:{y:6, x:3}}
  };
  
  var init = function() {
    Map.create(MapConstants.MIRAGE_TOWER_1F).tileMapping(tiles_lower)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  .  #- -# .  .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W+ WW .  .  .  .  .  #- -- -- C- -C -- -- -# .  .  .  .  .  WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ .  .  .  .  #- -- -- ,  ,  ,  ,  ,  ,  ,  ,  -- -- -# .  .  .  .  +W ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  .  #- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -# .  .  .  +W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  #- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -# .  .  |W ~  ~  ~")
       .sprites("~  ~  W+ .  .  .  #| ,  ,  ,  ,  ,  ,  ,  U  ,  ,  U  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  +W ~  ~")
       .sprites("~  ~  W| .  .  #- ,  ,  ,  U  U  U  U  U  ,  ,  ,  ,  U  U  U  U  U  ,  ,  ,  -# .  .  |W ~  ~")
       .sprites("~  ~  W| .  .  #| ,  ,  U  ,  ,  ,  ,  ,  ,  ,  ,  U  ,  ,  ,  ,  ,  U  ,  ,  |# .  .  |W ~  ~")
       .sprites("~  W+ .  .  .  #| ,  ,  U  ,  U  U  U  U  ,  U  U  ,  ,  ,  U  ,  ,  U  ,  ,  |# .  .  .  +W ~")
       .sprites("~  W| .  .  #- ,  ,  ,  U  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  U  $  U  ,  U  ,  ,  ,  -# .  .  |W ~")
       .sprites("~  W| .  .  #| ,  ,  ,  U  ,  ,  ,  ,  U  U  U  U  ,  U  U  ,  U  ,  U  ,  ,  ,  |# .  .  |W ~")
       .sprites("W+ .  .  .  #| ,  ,  U  ,  ,  U  ,  U  ,  ,  ,  ,  ,  ,  ,  ,  U  ,  ,  U  ,  ,  |# .  .  .  +W")
       .sprites("W| .  .  #+ ,  ,  ,  U  ,  U  ,  ,  U  ,  ,  U  U  U  U  ,  ,  U  U  ,  U  ,  ,  ,  -# .  .  |W")

  };
  
  return {
   init: init
  };

});