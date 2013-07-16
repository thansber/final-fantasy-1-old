define(/* */
["jquery", "maps/map", "constants/map"],
function($, Map, MapConstants) {

  var tiles_upper = {
    "~" : {y:4, x:1, desc:"nothing"},
    "." : {y:0, x:3, desc:"floor", inside:{y:3, x:3}, passable:true},
    "[]": {y:1, x:3, desc:"door", inside:{y:4, x:3}, passable:true},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}, passable:true},
    "#-": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "--": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "-#": {y:0, x:2, desc:"room wall top", inside:{y:3, x:2}},
    "#|": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "|#": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "#_": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "__": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "_#": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "$" : {y:1, x:1, desc:"chest", inside:{y:2, x:5}, passable:true},
    "&&": {y:1, x:1, desc:"statue", inside:{y:4, x:5}},
    "RR": {y:0, x:5, desc:"room wall", inside:{y:3, x:5}},
    "WW": {y:0, x:4, desc:"wall", inside:{y:3, x:4}},
    "^" : {y:1, x:4, desc:"stairs up", passable:true, inside:{y:4, x:4}},
    "v" : {y:1, x:5, desc:"stairs down", passable:true},
    "#^": {y:1, x:1, desc:"ladder up", inside:{y:2, x:4}},
    "#v": {y:1, x:1, desc:"ladder down", inside:{y:2, x:3}}
  };

  var init = function() {
    Map.create(MapConstants.MARSH_CAVE_B1, {y:28, x:14}).tileMapping(tiles_upper)
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  WW WW WW .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  WW .  .  .  .  .  WW WW WW WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  .  .  .  .  WW ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW v  .  .  .  WW ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  WW WW WW ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW .  .  .  .  WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW .  .  .  .  WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW .  .  .  .  .  .  WW WW ~  ~  ~  ~  ~  ~  WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  WW ~  ~  ~  WW WW .  .  .  .  .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  .  .  .  WW WW WW .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  .  .  .  .  .  .  .  WW WW WW .  WW WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  .  .  .  .  WW ~  ~  ~  WW ~  ~  WW .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  WW ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  WW")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  WW")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  ^  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  WW WW WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  WW WW WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  WW WW WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  WW WW WW WW .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  WW WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #- -- -- -- -- -# .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #| ,  ,  ,  ,  |# .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #| #v ,  ,  ,  |# .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #_ __ __ __ __ _# .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  RR RR RR RR [] RR .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.MARSH_CAVE_B2A).tileMapping(tiles_upper)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW ~  ~  WW WW WW WW ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  WW ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  WW WW WW WW .  .  WW WW WW WW WW WW WW")
       .sprites("~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW")
       .sprites("~  ~  ~  ~  WW .  #- -- -- -- -- -- -- -# WW .  WW WW WW .  .  WW #- -- -- -- -- -# .  WW WW WW")
       .sprites("WW WW WW WW WW .  #| ,  ,  ,  ,  ,  $  |# .  .  WW .  .  .  .  .  #| ,  ,  ,  $  |# .  WW ~  ~")
       .sprites("WW .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  WW .  WW WW WW .  #| ,  ,  ,  ,  |# .  WW WW WW")
       .sprites("WW .  WW WW WW .  #| ,  ,  ,  ,  ,  ,  |# WW .  WW .  WW .  .  .  #| ,  ,  ,  __ _# .  .  .  WW")
       .sprites("WW .  WW ~  WW .  #| ,  ,  ,  ,  ,  ,  |# .  .  WW .  WW .  .  .  #| ,  ,  |# RR RR .  WW WW WW")
       .sprites("WW .  WW WW WW .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  WW .  WW WW #_ __ __ _# .  .  .  WW ~  ~")
       .sprites("WW .  WW WW .  .  #_ __ __ __ __ __ __ _# .  .  WW .  .  .  .  .  RR RR [] RR .  .  .  WW ~  ~")
       .sprites("WW .  WW WW .  .  RR [] RR RR RR RR RR RR .  .  WW .  WW .  .  .  .  .  .  .  .  .  .  WW ~  ~")
       .sprites("WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  WW .  .  WW WW WW WW WW WW WW WW WW ~  ~")
       .sprites("WW .  WW WW WW .  .  WW WW WW WW .  .  WW .  .  WW .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW .  .  .  .  .  WW .  WW WW WW WW WW .  ^  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW .  WW WW WW WW WW WW .  .  .  .  .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW .  .  .  .  .  WW .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW WW .  .  .  .  WW WW .  .  WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW ~  WW .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  WW WW WW .  #- -- -- -- -- -- -- -# .  WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW .  .  .  .  .  #| ,  ,  $  ,  $  __ _# .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW WW WW WW WW .  #| ,  ,  ,  ,  |# RR RR .  WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  WW .  #| ,  ,  ,  __ _# .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  WW .  #| ,  ,  |# RR RR .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW WW WW .  #_ __ __ _# .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW .  .  .  RR [] RR RR .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.MARSH_CAVE_B2B).tileMapping(tiles_upper)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  #- -- -- -- -- -# .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  #- -- -- ,  ,  ,  ,  ,  |# .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  #- -- -# .  .  .  #_ __ __ __ __ __ __ __ _# .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  #- -- -- ,  ,  |# .  .  .  RR RR RR RR [] RR RR RR RR .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  #- -- -- -- -- -- ,  ,  ,  ,  ,  |# WW .  .  .  .  .  WW .  .  WW .  .  .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #- -- -- ,  #^ ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  WW .  WW .  .  .  .  .  .  .  .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #| ,  ,  ,  ,  ,  __ __ __ __ __ __ __ __ _# WW .  .  .  .  .  WW .  .  .  .  .  .  WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  #_ __ __ __ __ _# [] RR RR RR RR RR RR [] RR .  .  .  .  .  WW .  .  .  .  .  .  WW .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  RR [] RR RR RR RR .  .  .  .  WW .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  WW ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  WW .  WW .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  .  .  .  .  .  .  WW .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  WW ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  .  .  WW .  WW .  .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  WW .  WW .  WW .  WW .  WW ~  ~")
       .sprites("~  ~  ~  WW WW .  .  .  .  .  .  .  .  .  WW .  WW .  WW .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  WW .  WW .  WW .  WW .  WW .  WW .  WW ~")
       .sprites("~  ~  WW .  .  .  .  .  .  .  .  .  .  .  WW .  .  WW .  .  .  .  .  WW .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  WW ~")
       .sprites("~  ~  WW .  .  .  .  .  .  .  .  .  WW WW .  .  .  .  .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  WW .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  WW .  WW ~")
       .sprites("~  ~  WW .  .  #- -- -- -# .  .  WW .  .  .  .  .  #- -- -- -# .  .  .  .  WW .  .  .  #- -- -- -# .  .  WW .  WW .  .  .  #- -- -- -- -- -- -- -- -# .  .  WW ~")
       .sprites("~  ~  WW .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  $  |# .  .  .  .  .  .  .  .  #| $  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# .  WW ~  ~")
       .sprites("~  ~  WW .  .  #| ,  $  |# .  .  .  .  WW .  .  .  #| ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  |# .  .  .  .  WW .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# WW ~  ~  ~")
       .sprites("~  ~  WW .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# .  WW ~  ~")
       .sprites("~  WW .  WW .  #| ,  ,  |# .  .  .  .  WW .  .  .  #| ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  |# .  .  WW .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# .  WW ~  ~")
       .sprites("~  WW .  .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  |# .  .  .  WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  |# .  WW ~  ~")
       .sprites("~  WW .  .  .  #_ __ __ _# .  .  .  .  WW .  .  .  #_ __ __ _# .  .  .  .  WW .  .  .  #_ __ __ _# .  .  .  .  WW .  .  .  #_ __ __ __ ,  ,  __ __ _# .  WW ~  ~")
       .sprites("WW .  .  WW .  RR [] RR RR .  .  .  WW .  .  .  .  RR [] RR RR .  .  .  WW .  .  .  .  RR [] RR RR .  .  .  WW .  .  .  .  RR RR [] RR #_ _# RR [] RR .  .  WW ~")
       .sprites("WW .  WW .  WW .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  RR RR .  .  .  .  .  WW ~")
       .sprites("WW .  .  .  .  WW .  .  WW WW WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW .  .  .  .  .  .  WW .  WW .  WW .  WW .  .  .  .  .  WW")
       .sprites("~  WW .  .  .  .  .  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW ~  WW ~  WW ~  WW ~  WW .  .  v  .  WW")
       .sprites("~  ~  WW WW WW WW .  .  WW .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW")
  };


  return {
    init: init
  };
});