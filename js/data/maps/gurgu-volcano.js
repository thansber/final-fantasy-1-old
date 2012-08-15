define(/* GurguVolcanoMapData */
["jquery", "maps/map", "constants/map"],
function($, Map, MapConstants) {
    
  var tiles_upper = {
    "~" : {y:4, x:1, desc:"nothing"},
    "." : {y:1, x:4, desc:"floor", inside:{y:4, x:4}, passable:true},
    "!" : {y:2, x:6, desc:"lava", inside:{y:5, x:6}, passable:true},
    "[]": {y:2, x:5, desc:"door", inside:{y:5, x:5}, passable:true},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}},
    "#-": {y:0, x:0, desc:"room wall top left", inside:{y:3, x:0}},
    "--": {y:0, x:1, desc:"room wall top", inside:{y:3, x:1}},
    "-#": {y:0, x:2, desc:"room wall top right", inside:{y:3, x:2}},
    "#|": {y:1, x:0, desc:"room wall left", inside:{y:4, x:0}},
    "|#": {y:1, x:2, desc:"room wall right", inside:{y:4, x:2}},
    "#_": {y:2, x:0, desc:"room wall bottom left", inside:{y:5, x:0}},
    "__": {y:2, x:1, desc:"room wall bottom", inside:{y:5, x:1}, passable:true},
    "_#": {y:2, x:2, desc:"room wall bottom right", inside:{y:5, x:2}},
    "$" : {y:1, x:1, desc:"chest", inside:{y:1, x:6}, passable:true},
    "WW": {y:0, x:4, desc:"wall", inside:{y:3, x:4}},
    "W+": {y:0, x:3, desc:"wall top left", inside:{y:3, x:3}},
    "+W": {y:0, x:5, desc:"wall top right", inside:{y:3, x:5}},
    "W|": {y:1, x:3, desc:"wall left", inside:{y:4, x:3}},
    "|W": {y:1, x:5, desc:"wall right", inside:{y:4, x:5}},
    "MM": {y:0, x:6, desc:"mountain"},
    "M^": {y:3, x:6, desc:"mountain peak"},
    "^" : {y:2, x:3, desc:"stairs up", inside:{y:5, x:3}, passable:true},
    "v" : {y:2, x:4, desc:"stairs down", inside:{y:5, x:4}, passable:true}
  };
  
  var tiles_lower = $.extend({}, tiles_upper, {
    "C" : {y:1, x:1, desc:"candles", inside:{y:4, x:6}},
    "@" : {y:1, x:1, desc:"orb altar", inside:{y:0, x:7}},
    "O" : {y:1, x:1, desc:"orb", inside:{y:4, x:7}},
    "*" : {y:1, x:1, desc:"no idea", inside:{y:1, x:7}},
    "&-" : {y:1, x:1, desc:"statue right", inside:{y:2, x:7}},
    "-&" : {y:1, x:1, desc:"statue left", inside:{y:3, x:7}}
  });
    
  var init = function() {
      Map.create(MapConstants.GURGU_VOLCANO_B1).tileMapping(tiles_upper)
         .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~")
         .sprites("~  ~  ~  M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM MM MM MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ ~  ~  ~")
         .sprites("~  ~  M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ ~  ~")
         .sprites("~  ~  M^ M^ M^ M^ MM MM MM MM MM .  v  MM MM MM MM MM .  .  .  .  .  MM MM MM MM MM M^ M^ M^ M^ ~  ~")
         .sprites("~  M^ M^ M^ M^ MM MM MM MM .  .  .  MM MM MM MM !  !  !  !  .  .  .  .  .  MM MM MM MM M^ M^ M^ M^ ~")
         .sprites("~  M^ M^ M^ MM MM MM MM .  .  .  MM MM MM !  !  !  !  !  !  !  .  .  .  .  .  MM MM MM MM M^ M^ M^ ~")
         .sprites("~  M^ M^ M^ MM MM MM .  .  .  MM MM !  !  !  !  !  !  !  !  !  !  .  .  .  .  .  MM MM MM M^ M^ M^ ~")
         .sprites("M^ M^ M^ M^ MM MM MM .  .  .  .  !  !  !  !  MM M^ M^ M^ !  !  !  !  .  MM .  .  .  MM MM M^ M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM MM .  .  .  !  !  !  !  MM ~  ~  ~  ~  M^ !  !  !  !  MM MM .  .  MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM MM MM .  .  !  !  !  MM ~  ~  !  !  ~  ~  M^ !  !  !  .  MM MM .  MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM MM MM .  .  !  !  !  MM ~  !  !  !  !  ~  M^ !  !  !  .  MM MM ^  MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM .  MM MM .  !  !  !  MM ~  !  !  !  !  ~  MM !  !  !  .  .  MM MM MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM .  MM MM .  !  !  !  MM ~  ~  !  !  ~  ~  MM !  !  !  .  .  MM MM MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ MM MM MM .  .  MM MM !  !  !  !  MM ~  ~  ~  ~  MM !  !  !  !  .  .  .  MM MM MM MM M^ M^ M^")
         .sprites("M^ M^ M^ M^ MM MM .  .  .  MM .  !  !  !  !  MM MM MM MM !  !  !  !  .  .  .  .  MM MM MM M^ M^ M^ M^")
         .sprites("~  M^ M^ M^ MM MM MM .  .  .  .  .  !  !  !  !  !  !  !  !  !  !  MM MM .  .  .  MM MM MM M^ M^ M^ ~")
         .sprites("~  M^ M^ M^ MM MM MM MM .  .  .  .  .  !  !  !  !  !  !  !  MM MM MM .  .  .  MM MM MM MM M^ M^ M^ ~")
         .sprites("~  M^ M^ M^ M^ MM MM MM MM .  .  .  .  .  !  !  !  !  MM MM MM MM .  .  .  MM MM MM MM M^ M^ M^ M^ ~")
         .sprites("~  ~  M^ M^ M^ M^ MM MM MM MM MM .  .  .  .  MM MM MM MM MM MM .  .  .  MM MM MM MM M^ M^ M^ M^ ~  ~")
         .sprites("~  ~  ~  M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM MM MM MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ ~  ~  ~")
         .sprites("~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ MM MM MM MM MM MM M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~  ~  ~")
         .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
 
       Map.create(MapConstants.GURGU_VOLCANO_B2).tileMapping(tiles_upper)
          .sprites("#- -- -- -- #- -- -- #- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- #|")
          .sprites("#| ,  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #- -- -- -- #| ,  #| ,  #- -- -- -- #- -- -- -- #- -- -- -- #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| $  $  ,  #| ,  #| ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  ,  ,  #| ,  #| ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  #| ,  ,  ,  #| ,  #| ,  #| ,  #| ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  #| ,  ,  ,  #| ,  #| $  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  $  ,  #|") 
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  #| ,  ,  ,  #| ,  #| ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  ,  #|") 
          .sprites("#| ,  #| ,  #| ,  ,  -- -- -- -- -- -- -- -- #| ,  -- #- -- -- -- -- -- -- ,  ,  -- -- -- -- -- #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  -- -- -- -- -- -- #| ,  #| ,  ,  #| ,  -- -- #- -- -- -- #- -- -- -- ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  #| ,  #| ,  ,  #| ,  ,  ,  #| ,  ,  $  #| ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  #| ,  #| ,  ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #- -- -- -- -- -- -- ,  ,  #| ,  #| ,  ,  #| ,  #| ,  #| ,  #| ,  #| ,  #- -- ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  #| ,  #| ,  ,  #| ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  #| ,  #| ,  ,  #| ,  #| ,  ,  ,  #| ,  ,  ,  #| ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  -- -- -- -- -- -- #| ,  ,  ,  ,  #| ,  -- -- ,  ,  -- -- ,  ,  #| ,  -- -- #|")
          .sprites("#| ,  #| ,  #| ,  ,  ,  ,  ,  ,  ,  ,  #| ,  ,  ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  #| ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  ,  $  ,  ,  $  ,  ,  #| ,  ,  #- -- -- -- -- -- -- -- -- -- ,  ,  #| ,  ,  ,  #|")
          .sprites("#| ,  #| ,  #| ,  $  ,  ,  $  $  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #- -- ,  ,  #|")
          .sprites("#| ,  ,  ,  #| ,  ,  ,  ,  ,  $  $  ,  #| ,  ,  #- -- -- -- -- ,  ,  -- -- -- -- -- #| ,  ,  ,  #|")
          .sprites("#| ,  ,  ,  #| $  $  ,  $  $  $  ,  ,  #| ,  ,  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  $  ,  #| ,  ,  ,  #|")
          .sprites("#_ __ __ __ #_ __ __ __ __ __ __ __ __ #_ __ __ #_ __ __ __ __ __ __ __ __ __ __ __ #_ __ __ __ #|")
          .sprites("W+ WW [] WW WW WW WW WW WW WW WW WW WW WW [] WW WW [] WW WW WW WW WW WW WW WW WW WW WW [] WW +W ~")
          .sprites("W| v  .  !  !  !  !  .  !  !  !  !  !  !  .  !  !  .  !  !  !  .  .  .  !  !  !  !  !  .  ^  |W ~")
          .sprites("W| !  !  !  .  .  !  !  .  .  .  .  .  !  !  !  !  !  .  .  !  !  !  !  .  !  .  !  !  !  !  |W ~")
          .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~");
          
       // TODO: Check weird surrounding walls for level
       Map.create(MapConstants.GURGU_VOLCANO_B3A).tileMapping(tiles_upper)
          .sprites(",  __ __ __ __ __ __ __ __ ,  ,  ,  ,  __ __ __ __ __ __ ,  ,  __ __ __ __ ,  ,  __ __ __ __ ,  ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ ,")
          .sprites("|# WW WW WW WW WW WW WW WW #| ,  ,  |# WW WW WW WW WW WW #| |# WW WW WW WW #| |# WW WW WW WW #| ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW #|")
          .sprites("|# .  !  .  !  .  !  .  !  #| ,  ,  |# !  .  !  .  .  ^  #_ _# .  .  !  !  #| |# !  !  !  .  #| ,  ,  |# !  .  .  .  !  !  .  .  !  !  .  !  !  !  .  .  #|")
          .sprites("|# !  .  .  !  .  !  .  !  #| ,  ,  |# .  .  .  !  .  .  WW WW .  !  .  .  #| |# .  .  .  !  #| ,  ,  |# !  .  .  !  .  .  .  !  .  .  !  .  .  .  !  !  #|")
          .sprites("|# .  .  !  .  .  !  .  !  #_ __ __ _# !  .  .  .  !  !  !  !  !  .  .  .  #| |# .  .  .  .  #_ __ __ _# !  .  !  .  .  .  !  .  .  !  .  .  !  !  .  .  #|")
          .sprites("|# !  !  .  .  !  .  .  !  WW WW WW WW .  !  .  .  #- -- -- -# .  .  .  !  #| |# !  !  .  .  WW WW WW WW !  .  !  .  #- -- -- -# !  .  .  !  .  .  .  !  #|")
          .sprites("|# .  .  .  !  .  .  !  .  .  !  .  .  !  .  .  !  #_ __ ,  |# .  .  !  .  #_ _# .  .  !  !  !  .  .  !  .  .  !  .  #| ,  ,  |# !  .  .  !  .  !  !  !  #|")
          .sprites("|# !  !  !  .  .  !  .  .  !  .  .  !  #- -# !  .  WW WW #| |# !  !  .  .  WW WW .  .  #- -# .  !  .  !  .  .  .  .  #| ,  ,  |# !  .  !  .  .  !  v  !  #|")
          .sprites("|# .  .  .  .  !  .  .  !  .  .  !  .  #| |# .  .  !  !  #| |# .  .  .  !  !  !  .  .  #| |# .  !  .  .  !  .  .  .  #| ,  ,  |# !  .  !  .  !  !  !  !  #|")
          .sprites(",  -- -- -- -- -- -- -- -- -- -- -- -- ,  |# .  !  .  .  #| ,  -- -- -- -# .  .  !  .  #| |# .  .  !  .  #- -- -- -- ,  ,  ,  ,  -- -- -- -- -- -- -- -- ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  .  .  !  #| ,  ,  ,  ,  |# !  .  .  !  #| |# .  .  !  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- ,  ,  ,  ,  ,  ,  -- -- -- -- ,  ,  -- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,");
          
       Map.create(MapConstants.GURGU_VOLCANO_B3B).tileMapping(tiles_upper)
          .sprites(",  __ __ __ __ __ __ __ __ __ __ __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# WW WW WW WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# .  .  .  !  !  !  !  !  .  .  .  .  M^ M^ #| ,  __ __ __ __ __ __ ,  ,  ,  ,  __ __ __ __ __ __ ,  ,  __ __ __ __ __ __ ,  ,  __ __ __ __ __ __ ,")
          .sprites("|# !  !  !  !  MM MM MM !  !  !  !  .  .  .  #| |# WW WW WW WW WW WW #| ,  ,  |# WW WW WW WW WW WW #| |# WW WW WW WW WW WW #| |# WW WW WW WW WW WW #|")
          .sprites("|# M^ M^ !  !  !  !  !  !  !  !  !  !  !  !  #_ _# MM MM MM .  .  .  #_ __ __ _# .  M^ M^ M^ M^ M^ #_ _# M^ M^ M^ M^ !  !  #_ _# MM MM MM MM MM MM #|")
          .sprites("|# .  .  !  !  !  !  !  M^ M^ M^ !  !  .  .  WW WW .  .  !  !  MM MM WW WW WW WW .  .  .  !  !  .  WW WW MM MM MM !  !  !  WW WW !  M^ M^ M^ M^ M^ #|")
          .sprites("|# .  .  .  .  !  MM MM MM !  !  !  .  .  .  .  .  !  !  !  !  !  !  .  .  .  .  !  !  !  MM MM .  .  .  .  !  !  !  !  .  .  .  !  !  !  v  MM MM #|")
          .sprites(",  -- -# .  .  #- -- -- -- -- -- -- -- -- -- -- -# !  !  M^ M^ M^ M^ #- -- -- -# M^ M^ !  !  MM MM #- -# !  !  !  !  MM MM #- -# .  !  !  !  !  M^ #|")
          .sprites(",  __ _# .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  |# MM MM MM MM MM MM #| ,  ,  |# MM MM MM !  !  !  #| |# !  M^ M^ M^ M^ M^ #| |# .  .  !  !  MM MM #|")
          .sprites("|# WW WW .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- ,  ,  ,  ,  -- -- -- -# .  .  #| ,  -- -- -- -- -- -- ,  ,  -- -# .  .  #- -- ,")
          .sprites("|# .  .  .  .  MM MM MM MM #| ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ __ __ ,  ,  ,  |# .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites("|# .  !  !  M^ M^ M^ M^ M^ #| ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  |# .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites("|# !  !  !  !  .  .  .  .  #_ __ __ _# .  .  .  .  .  !  !  !  !  !  !  !  !  !  #_ __ __ _# .  .  !  MM MM MM #| ,  ,  ,  ,  ,  __ _# .  .  #_ __ ,")
          .sprites("|# !  !  !  !  !  !  !  .  WW WW WW WW .  .  !  !  !  !  !  !  !  !  !  !  !  .  WW WW WW WW !  !  !  !  M^ M^ #| ,  ,  ,  ,  |# WW WW .  .  WW WW #|")
          .sprites("|# .  .  !  !  MM MM .  .  .  .  .  .  !  !  M^ M^ M^ !  !  .  .  .  .  .  .  .  .  .  !  !  !  !  !  !  !  MM #_ __ __ __ __ _# !  !  .  .  .  .  #|")
          .sprites("|# .  .  M^ M^ M^ M^ !  !  !  !  .  .  !  !  !  !  MM MM .  .  .  MM MM MM .  .  .  .  .  .  .  .  !  !  !  !  WW WW WW WW WW WW !  !  !  !  !  MM #|")
          .sprites("|# MM MM MM MM MM !  !  !  MM MM MM MM MM !  !  !  !  !  M^ M^ MM M^ M^ M^ M^ M^ M^ M^ .  .  .  !  !  !  !  !  !  .  .  .  .  !  !  !  !  M^ M^ M^ #|")
          .sprites("|# M^ M^ M^ M^ !  !  M^ M^ #- -- -- -# M^ M^ !  !  !  !  !  !  !  MM MM MM MM MM #- -- -- -# !  !  MM MM !  !  .  .  .  .  !  !  MM MM MM MM MM MM #|")
          .sprites("|# MM MM MM MM MM MM MM MM #| ,  ,  |# !  !  !  !  !  !  !  M^ M^ M^ M^ M^ M^ M^ #| ,  ,  |# !  M^ M^ M^ !  .  .  .  !  !  !  !  !  !  M^ M^ M^ M^ #|")
          .sprites(",  -- -- -- -- -- -- -- -- ,  ,  ,  |# !  !  !  !  !  MM MM MM MM MM MM MM MM MM #| ,  ,  |# !  !  MM MM MM !  #- -- -- -# !  !  !  !  !  MM MM MM #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ #| ,  ,  |# !  !  !  !  !  !  #| ,  ,  |# M^ M^ !  !  !  !  M^ M^ #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- -- -- -- -- -- -- -- -- ,  ,  ,  |# MM !  !  !  !  !  #| ,  ,  |# MM MM MM !  !  !  !  !  #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# M^ M^ M^ !  !  !  #| ,  ,  |# M^ M^ M^ M^ !  !  !  !  #|")
          .sprites(",  ,  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -# .  .  #- -- ,  ,  ,  ,  -- -- -- -# .  .  #- -- ,")
          .sprites(",  |# WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW #_ __ __ __ __ __ __ __ __ __ __ __ __ _# .  .  #_ __ ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites(",  |# M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ M^ WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  WW WW #| ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites(",  |# MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM !  !  !  !  MM MM MM MM MM MM MM !  !  !  .  .  .  #| ,  __ __ __ __ __ _# .  .  #_ __ ,")
          .sprites(",  |# M^ M^ M^ v  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  .  .  .  .  .  .  !  !  M^ M^ M^ !  !  !  !  .  #| |# WW WW WW WW WW WW .  .  WW WW #|")
          .sprites(",  |# MM MM MM MM MM !  !  !  !  !  !  .  .  .  .  .  .  .  .  .  .  !  !  !  !  !  !  !  !  MM MM !  !  !  !  #| |# MM MM !  !  !  !  !  !  !  !  #|")
          .sprites(",  |# M^ M^ M^ M^ M^ M^ M^ M^ !  !  !  !  !  !  .  .  .  #- -- -- -- -- -- -- -# !  !  !  !  !  !  !  !  !  !  #| |# M^ !  !  !  !  !  M^ M^ M^ M^ #|")
          .sprites(",  |# MM MM MM MM MM MM MM MM MM MM MM MM MM !  !  !  !  #| ,  ,  ,  ,  ,  ,  |# !  !  !  !  !  !  !  !  MM MM #| |# !  !  !  MM MM MM MM MM MM MM #|")
          .sprites(",  ,  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  !  !  M^ M^ M^ M^ #| |# !  !  M^ M^ M^ M^ M^ M^ M^ M^ #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  MM MM MM MM MM MM #| |# !  !  !  !  !  !  #- -- -- -- ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  M^ M^ M^ M^ M^ M^ M^ M^ M^ #| |# !  !  !  !  !  !  #| ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- -- -- -- -- ,  ,  -- -- -- -- -- -- ,  ,  ,  ,  ,");

       // Darker shade
       Map.create(MapConstants.GURGU_VOLCANO_B4A).tileMapping(tiles_lower)
          .sprites(",  __ __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  .  .  .  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  .  ^  .  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  .  .  .  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  !  !  !  #_ __ __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  !  !  !  WW WW WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  !  !  !  !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  #- -- -# !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  #| ,  |# !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  #_ __ _# !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  WW WW WW !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# !  !  !  !  !  !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("|# .  .  .  .  !  !  !  !  !  !  !  #_ __ __ __ __ __ __ __ __ __ __ __ ,")
          .sprites("|# #- -- -# .  !  !  !  .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW #|")
          .sprites("|# #| ,  |# .  !  !  !  .  #- -- -# .  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# #_ __ _# .  !  !  !  .  #| ,  |# .  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# WW WW WW .  !  !  !  .  #_ __ _# .  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# .  .  .  .  !  !  !  .  WW WW WW .  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# !  !  !  !  !  !  !  .  .  .  .  .  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# !  !  !  !  !  !  !  !  !  !  !  !  !  !  .  .  .  .  .  !  !  !  !  #|")
          .sprites("|# !  !  .  .  .  .  .  !  !  !  !  !  !  !  .  #- -- -# .  !  !  !  !  #|")
          .sprites("|# !  !  .  #- -- -# .  !  !  !  !  !  !  !  .  #| ,  |# .  !  !  !  !  #|")
          .sprites("|# !  !  .  #| ,  |# .  !  !  !  !  !  !  !  .  #_ __ _# .  !  !  !  !  #|")
          .sprites("|# !  !  .  #_ __ _# .  !  !  !  !  !  !  !  .  WW WW WW .  !  !  !  !  #|")
          .sprites("|# !  !  .  WW WW WW .  !  !  !  !  !  !  !  .  .  .  .  .  !  !  !  ^  #|")
          .sprites("|# !  !  .  .  .  .  .  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites("|# !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  #|")
          .sprites(",  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- ,");
       
       
       Map.create(MapConstants.GURGU_VOLCANO_B4B).tileMapping(tiles_lower)
          .sprites("#- -- -- -- -- -# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #- -- -- -- -- -# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("#| ,  $  ,  $  |# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #| $  ,  ,  ,  |# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("#| ,  ,  ,  $  |# __ __ __ __ __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  __ __ __ __ __ __ __ __ #| ,  ,  ,  ,  |# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("#| $  ,  ,  $  |# WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW #| ,  ,  ,  $  |# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("#_ __ __ __ __ _# .  .  .  .  !  !  !  .  #| ,  ,  ,  ,  ,  ,  |# .  .  !  !  !  !  !  !  #_ __ __ __ __ _# ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("W+ WW [] WW WW WW .  !  !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  |# !  !  !  !  !  .  .  .  WW WW [] WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("W| .  .  .  !  !  !  !  #- -- -- -# .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  #- -- -- -# !  !  !  !  .  .  .  v  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("W| !  !  !  !  !  .  .  #| ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  |# !  !  !  !  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites("-- -- -- -- -- -- -- -- ,  ,  ,  |# .  !  #| ,  #- -- -- -- -- -# .  .  #| ,  ,  ,  -- -- -- -- -- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  #| ,  #| $  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #_ __ #| ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #- -- -- -- -- -# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  WW WW #| ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  #| $  $  ,  ,  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  !  !  #_ __ __ __ __ _# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  __ __ __ __ __ __ __ __ #| ,  ,  ,  $  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  WW WW [] WW WW WW .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -# !  !  !  .  .  .  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  !  !  !  !  !  !  #_ __ __ __ __ _# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  !  !  !  !  !  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  !  !  !  !  .  .  .  WW WW [] WW WW WW #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -# !  .  #- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  #- -- -- -# !  !  !  .  .  .  .  .  #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  .  #| ,  ,  |# .  !  !  !  !  !  .  .  #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  #- -- -- -- -- -# .  .  #| ,  ,  ,  -- -- -- -- -- -- -- -- ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  #| ,  $  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  #_ __ __ __ __ __ __ __ #| ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  !  WW WW WW WW WW WW WW WW #| ,  ,  ,  $  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  !  !  !  !  !  !  .  .  .  #_ __ __ __ __ _# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  !  !  !  !  !  !  !  WW WW [] WW WW WW .  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- -- -# !  !  !  .  .  .  !  !  !  !  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  !  !  !  !  !  !  !  !  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  #- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  #- -- -- -- -- -# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  #| ,  ,  ,  $  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #_ __ __ __ __ __ __ __ __ __ #| ,  ,  ,  $  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# !  !  !  !  !  !  !  !  !  !  !  !  #_ __ __ __ __ _# ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  !  !  !  !  !  WW WW [] WW WW WW #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- -- -- -- -# .  !  !  !  .  .  .  .  #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  !  !  !  !  !  #|")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  #- -- ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  !  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  __ __ __ __ __ _# !  !  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# WW WW WW WW WW WW !  !  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  !  !  !  !  !  !  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ^  .  .  .  .  !  !  .  #| ,  ,")
          .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- -- -- -- -- ,  ,  ,");
       
       Map.create(MapConstants.GURGU_VOLCANO_B5).tileMapping(tiles_lower)
          .sprites("#- -- -- -- -- -- -- -# WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW #- -- -- -- -- -- -- -#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  C  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  C  C  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  C  $  ,  |#")
          .sprites("#| ,  ,  C  ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  C  C  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  C  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  C  C  ,  |#")
          .sprites("#| ,  ,  ,  ,  C  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ __ __ __ __ __ __ __ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#_ __ __ __ __ __ __ _# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW W+ [] WW +W WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #_ __ __ __ __ __ __ _#")
          .sprites("W+ [] WW WW WW WW WW WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW WW WW WW WW WW [] +W")
          .sprites("W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W")
          .sprites("W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W")
          .sprites("WW WW WW WW WW WW WW WW W| .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  WW WW WW WW WW WW WW WW")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  |W WW WW WW WW WW WW WW WW .  .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  .  WW +W ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  W+ WW .  .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  |W +W .  .  .  .  +W ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  W+ .  .  .  .  W+ W| !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("#- -- -- -- -- -- -- -# ~  ~  ~  ~  W| !  |W ~  +W .  .  .  .  +W ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  W+ .  .  .  .  W+ ~  W| !  |W ~  ~  ~  ~  #- -- -- -- -- -- -- -#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  W| !  |W ~  ~  +W .  .  .  .  +W ~  ~  ~  W| .  .  |W ~  ~  ~  W+ .  .  .  .  W+ ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  +W .  .  .  .  +W ~  ~  W| .  .  |W ~  ~  W+ .  .  .  .  W+ ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  C  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  +W .  .  .  .  +W ~  W| .  .  |W ~  W+ .  .  .  .  W+ ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  C  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  ~  +W .  .  .  .  WW .  .  .  .  WW .  .  .  .  W+ ~  ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  __ _# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  ~  ~  +W .  !  !  !  !  !  !  !  !  !  !  .  W+ ~  ~  ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #_ __ ,  ,  ,  ,  ,  |#")
          .sprites("#| C  ,  ,  ,  |# [] WW WW WW WW WW .  !  .  WW WW WW WW WW WW WW +W !  !  !  .  .  .  .  !  !  !  W+ WW WW WW WW WW WW WW .  !  .  WW WW WW WW WW [] #| ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  |# .  .  .  .  .  .  .  !  .  .  .  .  .  .  .  .  .  !  !  !  .  .  ^  .  !  !  !  .  .  .  .  .  .  .  .  .  !  .  .  .  .  .  .  .  #| ,  ,  C  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  -- -# .  .  .  .  .  !  .  .  .  .  .  .  .  .  .  !  !  !  .  .  .  .  !  !  !  .  .  .  .  .  .  .  .  .  !  .  .  .  .  .  #- -- ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  ,  |# WW WW WW WW .  !  .  WW WW WW WW WW WW WW W+ !  !  !  .  .  .  .  !  !  !  +W WW WW WW WW WW WW WW W| !  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  C  ,  C  C  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  ~  ~  W+ .  !  !  !  !  !  !  !  !  !  !  .  +W ~  ~  ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  C  ,  ,  C  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  ~  W+ .  .  .  .  W+ W| .  .  |W +W .  .  .  .  +W ~  ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  C  $  C  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  W+ .  .  .  .  W+ ~  W| .  .  |W ~  +W .  .  .  .  +W ~  ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  C  ,  |# ~  ~  ~  ~  W| !  |W ~  ~  ~  W+ .  .  .  .  W+ ~  ~  W| .  .  |W ~  ~  +W .  .  .  .  +W ~  ~  ~  W| !  |W ~  ~  ~  ~  #| ,  $  ,  ,  ,  ,  |#")
          .sprites("#_ __ __ __ __ __ __ _# ~  ~  ~  ~  W| !  |W ~  ~  W+ .  .  .  .  W+ ~  ~  ~  W| .  .  |W ~  ~  ~  +W .  .  .  .  +W ~  ~  W| !  |W ~  ~  ~  ~  #_ __ __ __ __ __ __ _#")
          .sprites("WW WW WW WW WW WW WW WW ~  ~  ~  ~  W| !  |W ~  W+ .  .  .  .  W+ ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  +W .  .  .  .  +W ~  W| !  |W ~  ~  ~  ~  WW WW WW WW WW WW WW WW")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  WW .  .  .  .  W+ ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  +W .  .  .  .  WW .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  |W WW WW ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  WW WW W| .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  .  .  .  |W WW WW WW WW WW WW WW WW .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  !  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  W+ WW WW WW WW WW WW WW WW WW WW WW W| .  .  |W WW WW WW WW WW WW WW WW WW WW WW +W .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  W+ ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  +W .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  W+ ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  +W .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~")
          .sprites("W+ WW WW WW WW WW WW WW .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  WW WW WW WW WW WW WW +W")
          .sprites("W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W")
          .sprites("#- -- -- -- -- -- -# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W")
          .sprites("#| -& ,  @  ,  &- |# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  #- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #- -- -- -- -- -- -- -#")
          .sprites("#| ,  -& *  &- ,  |# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  C  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  |#")
          .sprites("#| ,  ,  ,  ,  ,  |# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  C  $  |#")
          .sprites("#| ,  -& O  &- ,  |# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  #_ __ __ ,  ,  ,  ,  ,  ,  ,  ,  C  ,  C  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  C  |#")
          .sprites("#_ __ _# __ #_ __ _# .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  WW WW [] #| ,  ,  ,  ,  ,  ,  ,  ,  ,  C  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #_ __ __ ,  ,  ,  ,  |#")
          .sprites("W+ WW WW [] WW WW WW .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  #_ __ __ __ __ __ __ __ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW WW [] #| ,  ,  ,  |#")
          .sprites("W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  W| .  .  W+ WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  #_ __ __ __ _#")
          .sprites("WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW");
  };
    
  return {
    init: init
  };
});