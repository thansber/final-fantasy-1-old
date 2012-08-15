define(/* */
["jquery", "maps/map", "constants/map"],
function($, Map, MapConstants) {
  
  var tiles_upper = {
    "~" : {y:4, x:1, desc:"nothing"},
    "." : {y:1, x:4, desc:"floor", inside:{y:4, x:4}, passable:true},
    "[]": {y:6, x:0, desc:"door", inside:{y:6, x:1}, passable:true},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}, passable:true},
    "#-": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "--": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "-#": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "#|": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "|#": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "#_": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "__": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "_#": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "$" : {y:1, x:1, desc:"chest", inside:{y:6, x:3}, passable:true},
    "WW": {y:0, x:4, desc:"wall", inside:{y:3, x:4}},
    "W+": {y:0, x:3, desc:"wall top left", inside:{y:3, x:3}},
    "+W": {y:0, x:5, desc:"wall top right", inside:{y:3, x:5}},
    "W|": {y:1, x:3, desc:"wall left", inside:{y:4, x:3}},
    "|W": {y:1, x:5, desc:"wall right", inside:{y:4, x:5}},
    "MM" : {y:2, x:5, desc:"mountain", inside:{y:5, x:5}},
    "M^": {y:6, x:2, desc:"mountain peak"},
    "&-": {y:1, x:1, desc:"statue right", inside:{y:6, x:4}},
    "-&": {y:1, x:1, desc:"statue left", inside:{y:6, x:5}},
    "^" : {y:2, x:3, desc:"stairs up", passable:true, inside:{y:5, x:3}},
    "v" : {y:2, x:4, desc:"stairs down", passable:true, inside:{y:5, x:4}}
  };
  
  var tiles_lower = $.extend({}, tiles_upper, {
    "x" : {y:1, x:1, desc:"spikes", inside:{y:5, x:5}},
    "O" : {y:1, x:1, desc:"orb", inside:{y:2, x:5}},
    "X" : {y:1, x:1, desc:"spikes rising", inside:{y:5, x:4}},
    "@" : {y:1, x:1, desc:"orb altar", inside:{y:6, x:2}},
    "*" : {y:1, x:1, desc:"no idea", inside:{y:5, x:3}},
    "^" : {y:2, x:3, desc:"stairs up", passable:true},
    "v" : {y:2, x:4, desc:"stairs down", passable:true}
  });
  
  var init = function() {
    Map.create(MapConstants.EARTH_CAVE_B1).tileMapping(tiles_upper)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM MM MM MM MM MM MM MM .  .  MM MM MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  MM MM .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  MM .  .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  MM .  #- -- -- -- -- -- -# .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM .  .  MM ~  ~  MM .  #| $  ,  ,  ,  ,  |# .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  MM ~  ~  MM .  #_ __ ,  ,  ,  ,  |# .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM MM MM ~  MM .  .  .  .  MM ~  ~  MM .  WW WW #_ __ __ __ _# .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  MM .  .  .  .  .  .  .  .  .  MM ~  MM .  .  MM MM MM ~  ~  MM .  .  .  WW WW WW [] WW .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM MM MM MM MM MM MM .  .  .  .  .  .  .  .  .  MM ~  MM .  .  MM ~  ~  ~  ~  MM MM MM .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  .  .  .  .  .  .  MM MM MM MM MM .  .  MM MM MM .  .  MM MM ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  .  .  .  .  .  .  MM ~  ~  ~  MM .  .  MM .  .  .  .  .  MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  MM MM MM MM MM MM MM ~  ~  ~  MM .  .  .  .  .  .  .  .  .  .  .  MM MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM .  .  .  .  .  MM .  .  .  .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  MM .  .  MM MM MM MM MM MM MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  MM MM MM MM MM ~  ~  ~  ~  MM MM MM MM MM MM .  .  MM MM MM .  .  MM MM MM ~  ~  ~  MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("MM .  .  .  .  .  .  MM MM MM MM MM MM .  .  .  .  .  .  .  MM ~  MM .  .  .  .  MM ~  ~  ~  MM .  .  MM MM MM MM MM MM ~  ~  ~  ~")
       .sprites("MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM ~  MM .  .  .  .  MM ~  ~  ~  MM .  .  .  .  .  .  .  MM ~  ~  ~  ~")
       .sprites("MM MM MM MM MM .  .  .  .  .  .  .  .  .  MM MM MM MM .  .  MM ~  MM MM MM .  .  MM ~  ~  ~  MM .  .  .  .  .  .  .  MM ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  MM MM MM MM MM MM MM MM MM MM MM ~  ~  MM .  .  MM ~  ~  ~  MM .  .  MM ~  ~  ~  MM MM MM MM MM MM .  .  MM ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  ~  MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM .  .  MM ~  ~  ~  MM .  .  MM MM MM MM ~  ~  ~  ~  ~  MM .  .  MM ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  ~  ~  MM .  .  MM MM MM MM MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  ~  ~  MM .  .  .  .  .  .  MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM MM MM MM ~  ~  ~  MM MM MM MM .  .  MM ~  ~  ~  ~  ~  MM .  .  .  .  .  v  MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM MM .  .  .  .  .  .  .  MM MM MM .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM MM MM .  MM MM MM MM MM MM ~  MM .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM .  MM ~  ~  ~  ~  ~  ~  MM .  MM MM MM MM MM MM MM MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM .  MM ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  .  .  .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM .  MM ~  ~  ~  ~  ~  ~  MM .  #- -- -- -- -- -# .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM .  MM ~  ~  ~  ~  ~  ~  MM .  #| $  ,  ,  ,  |# .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM .  MM ~  ~  ~  ~  ~  ~  MM .  #| ,  $  ,  ,  |# .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  MM MM MM ~  ~  ~  ~  ~  ~  MM .  #_ __ __ __ __ _# .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  WW WW WW WW [] WW .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM MM MM MM MM MM MM MM MM ~  ~  MM .  .  .  .  .  .  .  .  MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM .  .  .  .  .  .  .  MM ~  ~  MM MM MM MM MM MM MM MM MM MM ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  MM .  #- -- -- -- -# .  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  #| $  $  ,  |# .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM .  #| ,  ,  ,  |# .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  #_ __ __ __ _# .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  WW WW WW [] WW .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM .  .  .  .  .  .  .  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");
       
    Map.create(MapConstants.EARTH_CAVE_B2).tileMapping(tiles_upper)
       .sprites("W+ WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  ^  .  |W WW WW WW WW WW +W WW WW WW WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  |W .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  |W .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW WW W+ .  WW WW .  +W WW .  WW WW +W .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -#")
       .sprites("~  ~  W| .  .  .  .  .  .  .  .  .  |W WW WW WW WW +W WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  #| $  $  ,  ,  |#")
       .sprites("~  ~  W| .  .  .  .  .  .  .  .  .  |W .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("~  ~  W| .  .  .  .  .  .  .  .  .  |W WW +W .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  $  |#")
       .sprites("~  ~  W| .  .  .  .  .  .  .  .  .  |W .  |W .  .  |W ~  ~  W+ WW WW WW WW WW +W ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("~  ~  WW WW W+ WW .  WW +W WW W+ .  WW .  .  .  .  |W ~  ~  W| .  .  .  .  .  |W ~  ~  ~  #_ __ __ __ __ _#")
       .sprites("~  ~  ~  ~  W| .  .  .  |W ~  W| .  .  .  |W .  .  |W ~  ~  W| .  .  .  .  .  |W ~  W+ WW WW [] +W WW WW WW")
       .sprites("~  W+ WW WW W| .  .  .  |W ~  W| .  .  .  |W WW .  WW WW WW WW .  +W .  .  .  |W ~  W| .  .  .  |W ~  ~  ~")
       .sprites("~  W| .  .  W| .  .  .  |W ~  W| .  .  .  |W .  .  .  .  .  .  .  |W WW W+ .  WW WW +W .  .  .  |W ~  ~  ~")
       .sprites("~  W| .  .  W+ .  +W WW WW ~  W| .  .  .  |W WW WW WW WW WW WW WW WW ~  W| .  .  .  |W .  .  .  |W ~  ~  ~")
       .sprites("~  W| .  .  .  .  |W ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  W| .  .  .  .  |W ~  ~  ~  W| .  .  .  |W WW WW WW +W WW WW WW WW WW W| .  .  .  |W .  .  .  |W ~  ~  ~")
       .sprites("~  W+ .  +W WW WW WW ~  ~  ~  W| .  .  .  |W .  .  .  |W .  .  .  .  .  WW WW .  WW +W WW WW WW WW ~  ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  ~  ~  ~  WW WW W+ .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  ~  W+ WW WW WW W| .  .  .  .  .  |W WW .  WW WW WW WW WW W+ .  +W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  ~  W| .  .  .  WW WW .  +W WW W+ WW .  .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W ~  W+ WW WW W| .  .  .  .  .  .  |W ~  W| .  .  .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W WW W| .  .  W| .  .  .  .  .  .  |W ~  W| .  .  .  |W WW WW +W ~  W| .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W .  W| .  .  WW .  +W WW WW WW WW WW ~  W| .  .  .  |W .  .  |W ~  W| .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W+ .  +W .  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  WW +W WW .  WW .  .  |W ~  W| .  |W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  .  .  .  .  .  |W WW WW +W ~  ~  ~  ~  W| .  .  .  .  .  |W ~  W| .  |W ~  ~  ~  W+ WW +W ~")
       .sprites("~  W| .  .  .  W| .  .  .  .  |W .  .  |W ~  W+ WW WW W| .  .  .  .  .  |W ~  W| .  |W ~  ~  W+ W| v  |W ~")
       .sprites("~  WW WW WW WW W| .  .  .  .  |W .  .  |W ~  W| .  .  WW .  +W WW WW WW WW ~  W| .  |W ~  ~  W| WW .  +W ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW W+ .  WW .  .  |W ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  W| .  |W ~  ~  W| .  .  |W ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  W| .  .  .  .  |W WW +W ~  W+ WW W| .  |W WW WW W| .  .  |W ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  W| .  .  .  .  |W .  |W ~  W| .  WW .  WW .  .  W| .  .  |W ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #- -- -- -- -- -# .  .  .  .  |W ~  W| .  .  .  .  .  .  WW .  +W WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| $  ,  ,  ,  |# .  .  |W .  |W ~  W| .  .  .  .  .  .  .  .  |W ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW #| ,  ,  ,  ,  |# WW WW W+ .  |W ~  W| .  .  .  .  .  .  .  .  |W ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  $  ,  $  |# ~  ~  W| .  |W ~  WW WW WW WW WW WW WW WW WW WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |# ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |# ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |# WW WW W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ __ _# .  .  WW .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW W+ [] WW WW .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");
    
    Map.create(MapConstants.EARTH_CAVE_B3).tileMapping(tiles_upper)
       .sprites("#- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW +W ~  ~")
       .sprites("#| ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~")
       .sprites("#| ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW .  WW +W .  .  |W ~  ~")
       .sprites("#| ,  ,  ,  |# ~  ~  W+ WW WW WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W .  .  |W ~  ~")
       .sprites("#_ __ __ __ _# ~  ~  W| .  .  .  .  .  .  .  .  |W ~  ~  ~  #- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W .  .  |W ~  ~")
       .sprites("WW WW W+ [] +W ~  ~  W| .  .  .  .  .  .  .  .  |W ~  ~  ~  #| ,  $  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W WW WW WW ~  ~")
       .sprites("~  ~  W| .  |W WW WW WW .  +W WW WW W+ .  WW WW WW WW +W ~  #| ,  ,  ,  |# ~  ~  W+ WW WW WW WW WW WW WW W| .  .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  |W .  .  .  .  |W ~  ~  W| .  .  .  .  .  |W ~  #| ,  ,  ,  |# ~  ~  W| .  .  .  .  .  .  |W WW +W .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  .  .  .  .  .  |W ~  ~  W| .  .  .  .  .  |W ~  #_ __ __ __ _# ~  ~  W| .  .  .  .  .  .  |W .  |W .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("W+ WW W| .  |W .  .  .  .  |W ~  ~  WW WW WW WW W+ .  .  WW WW +W WW [] +W ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  |W WW WW WW WW +W")
       .sprites("W| .  WW .  WW +W WW WW WW WW ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W .  .  |W WW WW WW .  +W .  .  .  .  |W .  |W .  .  .  |W .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W .  .  |W .  .  .  .  |W WW WW WW W+ WW .  |W WW W+ .  WW .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W .  .  .  .  .  .  .  |W ~  ~  ~  W| .  .  |W ~  W| .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW W+ .  WW .  .  |W .  .  .  .  |W ~  ~  ~  W+ .  +W WW ~  WW WW WW WW WW WW WW WW")
       .sprites("WW W+ .  +W WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W WW WW W+ .  WW WW +W ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  W| .  .  .  |W ~  W| .  |W WW +W ~  #- -- -- -- -# ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  #- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  W| .  |W .  |W ~  #| ,  $  ,  |# ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  #| $  |# ~  ~  ~  ~  ~  MM M^ MM M^ MM M^ M^ ~  ~  ~  ~  ~  WW W+ .  +W WW ~  W| .  .  .  |W ~  #| ,  ,  ,  |# ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  W| .  |W .  |W ~  #| ,  ,  ,  |# ~  ~")
       .sprites("~  W| .  |W ~  ~  ~  #_ __ _# WW +W ~  ~  ~  M^ .  .  v  .  .  MM ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  WW W+ WW .  |W ~  #_ __ __ __ _# ~  ~")
       .sprites("~  W| .  |W WW WW +W WW [] WW .  |W ~  ~  ~  MM .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  W| .  .  |W WW WW WW WW [] WW +W ~")
       .sprites("W+ WW .  WW .  .  |W .  .  .  .  |W ~  ~  ~  MM .  .  .  .  .  M^ ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  W| .  .  |W .  .  .  .  .  .  |W ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  M^ MM MM .  M^ MM M^ ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  W| .  .  |W .  .  .  .  .  .  |W ~")
       .sprites("W| .  .  .  .  .  |W .  .  .  .  |W ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  WW W+ .  WW .  .  .  .  .  .  |W ~")
       .sprites("W+ .  +W WW W+ WW WW .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  WW WW WW WW WW +W ~  ~  W| .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  |W ~")
       .sprites("W| .  |W ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  W| .  |W WW WW +W ~  W| .  .  .  .  .  .  .  .  |W ~")
       .sprites("W| .  |W ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  WW WW WW WW WW WW W| .  |W ~  ~  W| .  |W .  .  |W ~  WW WW WW WW WW WW WW WW WW WW ~")
       .sprites("W| .  |W ~  WW WW WW W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  W+ .  WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  |W ~  ~  ~  ~  W| .  .  .  |W ~  #- -- -- -- -- -- -- -- -- -- -# .  |W ~  ~  W| .  .  .  .  |W WW WW +W ~  #- -- -- -- -# ~  ~  ~")
       .sprites("W| .  |W ~  ~  ~  ~  W| .  .  |W WW ~  #_ __ $  ,  ,  ,  ,  ,  ,  __ _# .  |W ~  ~  W| .  .  .  .  |W .  .  |W ~  #| ,  ,  $  |# ~  ~  ~")
       .sprites("WW WW WW ~  ~  ~  ~  W| .  .  |W ~  ~  WW WW #_ ,  -& ,  &- ,  _# [] WW .  |W ~  ~  WW WW WW W+ .  WW .  .  |W ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  WW #_ _# __ #_ _# WW .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW W+ .  .  WW WW WW WW WW WW WW [] +W WW WW WW WW WW WW ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  #_ __ __ __ _# ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  WW W+ .  WW WW WW WW [] +W WW ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  W| .  .  .  .  .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW .  +W WW WW WW WW WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~");
    
    Map.create(MapConstants.EARTH_CAVE_B4).tileMapping(tiles_lower)
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| v  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  W+ WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  |W WW WW +W ~  W| .  .  .  .  .  .  |W WW WW WW WW WW WW +W ~  #- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW WW W+ WW .  WW .  .  |W ~  W| .  .  .  .  .  .  |W .  .  .  .  .  .  |W ~  #_ __ ,  $  $  ,  ,  ,  $  ,  $  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  .  .  .  .  |W ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  |W WW WW +W #| ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  .  .  .  .  |W ~  W| .  .  .  .  .  .  |W .  .  .  .  .  .  |W .  .  |W #| $  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  W+ WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  .  .  .  W+ WW WW WW WW .  +W .  .  .  |W WW WW W+ WW .  WW WW .  .  |W #_ __ __ __ __ __ __ __ __ _# WW +W ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  W| .  .  .  .  W| .  .  .  .  .  |W .  .  .  |W ~  ~  W| .  .  .  .  .  .  |W WW WW WW WW WW W+ WW [] WW WW .  |W ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW W+ WW .  WW W| .  .  .  .  .  |W WW WW WW WW ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  |W WW WW .  +W .  .  .  .  |W WW WW +W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  W| .  .  .  .  .  |W WW WW WW +W ~  ~  W| .  .  .  .  .  .  |W WW WW +W ~  ~  W| .  .  .  .  .  |W .  .  .  |W .  .  .  .  |W .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  W| .  .  .  .  .  |W .  .  .  |W ~  ~  W| .  .  .  .  .  .  |W .  .  |W ~  ~  WW WW WW W+ WW .  WW .  .  .  |W WW .  WW WW WW .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  WW .  WW WW +W WW WW .  .  .  |W ~  ~  WW WW W+ .  WW WW WW WW .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W WW WW WW +W ~  W| .  .  W+ WW WW WW WW WW +W .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W .  .  .  |W ~  W| .  .  W| .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  WW WW WW WW W+ WW .  WW WW .  .  .  .  .  |W ~  ~  W+ WW W| .  .  .  .  .  .  .  .  .  .  .  |W ~  W| .  .  W| .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  W| .  W| .  .  .  .  .  .  .  |W .  .  .  |W ~  WW WW WW W| .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W+ WW WW WW W| .  .  .  .  .  .  .  .  .  |W WW WW W| .  WW WW WW .  +W WW WW W+ WW .  .  .  |W ~  ~  ~  ~  W| .  .  .  .  .  |W WW WW W+ .  +W WW ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  W| .  .  .  .  .  .  .  .  .  |W .  .  W| .  .  .  .  .  |W ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  W| .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  WW .  WW WW +W WW W+ .  WW WW WW .  .  W| .  .  .  .  .  |W ~  ~  W| .  .  .  .  |W WW WW WW WW W| .  .  .  .  .  |W ~  ~  W| .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  |W ~  W| .  .  .  .  .  .  WW .  WW WW +W WW +W ~  ~  WW WW W+ WW .  WW .  .  .  .  W| .  .  .  .  .  |W ~  ~  W| .  |W ~  ~  ~  ~")
       .sprites("~  W+ WW W| .  .  .  .  .  .  .  |W ~  W| .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  WW WW .  WW +W WW WW ~  ~  W| .  |W WW WW WW +W")
       .sprites("~  W| .  W| .  .  .  .  .  .  .  |W ~  W| .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  W| .  |W .  .  .  |W")
       .sprites("~  W| .  WW .  +W WW WW WW WW WW WW ~  W| .  .  .  .  .  .  .  .  .  .  |W ~  W+ WW WW WW WW W| .  .  .  .  .  .  .  .  .  .  .  |W WW WW +W ~  W| .  .  .  .  ^  |W")
       .sprites("~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  WW WW WW W+ .  WW WW WW WW WW +W WW ~  W| .  .  .  .  W| .  .  .  .  .  .  .  .  .  .  .  |W .  .  +W ~  W| .  |W .  .  .  |W")
       .sprites("~  W| .  .  .  |W ~  #- -- -- -- -- -# ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  W| .  .  .  .  WW WW WW W+ WW .  WW +W WW WW W+ .  WW .  .  |W ~  W| .  |W WW WW WW WW")
       .sprites("~  W| .  .  .  |W ~  #| ,  ,  ,  ,  |# ~  ~  ~  W| .  .  .  .  .  .  |W WW WW WW +W .  .  .  .  .  .  .  .  .  .  |W ~  ~  W| .  .  .  .  |W ~  WW WW WW ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W ~  #| ,  $  ,  ,  |# ~  ~  ~  W| .  .  .  .  .  .  |W .  .  .  |W .  .  .  .  .  .  W| .  .  .  |W ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W ~  #| ,  ,  ,  $  |# ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  |W ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W ~  #| ,  ,  ,  ,  |# ~  ~  ~  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  W| .  .  .  |W ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W ~  #| $  ,  ,  ,  |# ~  ~  ~  W| .  .  .  .  .  .  |W .  .  .  |W .  .  .  .  .  .  WW +W WW WW WW ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W ~  #| ,  ,  ,  ,  |# ~  ~  ~  WW WW WW W+ WW WW WW WW .  .  .  |W .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W WW #_ __ __ __ __ _# ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W .  WW WW [] WW WW WW ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  W| .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  WW WW W+ WW WW .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");
    
    Map.create(MapConstants.EARTH_CAVE_B5).tileMapping(tiles_lower)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  W+ WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  W+ .  WW WW W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  W| .  .  .  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW WW WW W| .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW +W .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  |W .  .  .  .  |W WW WW WW WW WW +W ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  W+ WW .  WW WW +W .  .  |W .  .  .  .  .  |W ~  ~  ~")
       .sprites("#- -- -- -- -- -- -- -- -# .  .  .  .  .  W| .  .  .  .  |W .  .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("#| X  x  ,  @  ,  X  x  |# .  W+ .  +W .  W| .  .  .  .  |W .  .  |W .  .  .  .  .  |W ~  ~  ~")
       .sprites("#| x  x  -& *  &- X  X  |# .  W| .  |W .  W| .  .  .  .  |W WW .  WW +W .  .  .  .  |W ~  ~  ~")
       .sprites("#| X  x  ,  ,  ,  X  x  |# WW W| .  |W WW W| .  .  .  .  |W .  .  .  |W .  .  .  .  |W ~  ~  ~")
       .sprites("#| x  X  x  ,  x  x  x  |# ~  W| .  |W ~  W| .  .  .  .  .  .  .  .  |W WW .  WW WW WW WW +W ~")
       .sprites("#| x  X  X  O  X  x  X  |# ~  W| .  |W ~  WW W+ .  .  +W |W .  .  .  |W .  .  .  .  .  .  |W ~")
       .sprites("#| X  X  X  ,  X  X  X  |# ~  W| .  |W ~  ~  W| .  .  |W WW .  .  .  |W .  .  .  .  .  .  |W ~")
       .sprites("#| x  x  x  ,  X  x  x  |# ~  W| .  |W ~  ~  W| .  .  |W .  .  .  .  |W .  .  .  .  .  .  |W ~")
       .sprites("#_ __ __ __ __ __ __ __ _# ~  W| .  |W ~  ~  W| .  .  |W WW WW WW WW WW +W .  .  .  .  .  |W ~")
       .sprites("WW WW WW W+ [] +W WW WW WW ~  W| .  |W ~  ~  W| .  .  |W .  .  .  .  .  |W .  .  .  .  .  |W ~")
       .sprites("~  ~  ~  W| .  |W ~  ~  ~  ~  W| .  |W ~  ~  W| .  .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~")
       .sprites("~  ~  ~  W| .  |W WW WW WW WW WW .  WW +W ~  W| .  .  |W .  .  .  .  .  |W .  .  .  |W WW WW ~")
       .sprites("~  ~  ~  W| .  |W .  .  .  .  .  .  .  |W ~  W| W+ .  WW WW +W .  .  .  |W .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  WW W| .  .  .  |W .  .  .  |W WW .  WW WW WW WW +W")
       .sprites("~  ~  ~  W| .  |W .  .  .  .  .  .  .  |W ~  ~  W| .  .  .  |W .  .  .  |W .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW ~  W+ WW WW W| .  |W .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  ^  W| .  |W .  .  .  |W .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  WW WW .  WW WW WW WW WW WW +W .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  |W .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  |W WW WW WW WW WW")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~");
  };
  
  return {
    init: init
  };
});