define(/* CaveMapData */
["jquery", "maps/map", "constants/map"],
function($, Map, MapConstants) {
    
  var base_tiles = {
    "~" : {y:4, x:1, desc:"nothing"},
    "." : {y:1, x:4, desc:"floor", inside:{y:4, x:4}, passable:true},
    "," : {y:1, x:1, desc:"room empty", inside:{y:4, x:1}, passable:true},
    "$" : {y:1, x:1, desc:"chest", inside:{y:0, x:6}, passable:true},
    "^" : {y:2, x:4, desc:"stairs up", passable:true},
    "v" : {y:1, x:4, desc:"stairs down", passable:true},
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
  };
  
  var init = function() {
   
   Map.create(MapConstants.MATOYAS_CAVE, {})
      .tileMapping($.extend(base_tiles, {
       "P" : {y:1, x:1, desc:"pots", inside:{y:5, x:4}},
       "SK": {y:1, x:1, desc:"skull", inside:{y:2, x:5}, passable:true},
       "TB": {y:1, x:1, desc:"table", inside:{y:5, x:5}},
       "CH": {y:1, x:1, desc:"chair", inside:{y:1, x:6}, passable:true},
      }))
      .sprites("#- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -#")
      .sprites("#| SK ,  ,  SK P  P  ,  CH ,  P  P  SK ,  ,  SK |#")
      .sprites("#| SK ,  ,  SK ,  P  ,  TB ,  P  ,  SK ,  ,  SK |#")
      .sprites("#| SK ,  ,  SK ,  ,  ,  ,  ,  ,  ,  SK ,  ,  SK |#")
      .sprites("#| $  SK ,  ,  SK ,  ,  ,  ,  ,  SK ,  ,  SK ,  |#")
      .sprites("#| $  ,  SK ,  ,  SK ,  ,  ,  SK ,  ,  SK ,  ,  |#")
      .sprites("#| SK SK SK SK ,  ,  SK ,  SK ,  ,  SK SK SK SK |#")
      .sprites("#| $  SK ,  ,  SK SK ,  ,  ,  SK SK ,  ,  SK ,  |#")
      .sprites("#| ,  ,  SK ,  ,  ,  SK ,  SK ,  ,  ,  SK ,  ,  |#")
      .sprites("#_ __ __ ,  SK SK SK SK ,  SK SK SK SK ,  __ __ _#")
      .sprites("W+ WW WW #| ,  ,  ,  SK ,  SK ,  ,  ,  |# WW WW +W")
      .sprites("W| .  .  #_ __ __ __ __ __ __ __ __ __ _# .  MM |W")
      .sprites("W| .  .  WW WW WW WW WW [] WW WW WW WW WW .  .  |W")
      .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
      .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
      .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW");

   Map.create(MapConstants.DWARF_CAVE, {})
      .tileMapping($.extend(base_tiles, {
       "$" : {y:1, x:1, desc:"chest", inside:{y:2, x:5}, passable:true},
       "TB": {y:1, x:1, desc:"table", inside:{y:1, x:3}},
       "CH": {y:1, x:1, desc:"chair", inside:{y:3, x:5}, passable:true},
       "MM": {y:0, x:3, desc:"mountain", inside:{y:3, x:3}},
       "AN": {y:1, x:1, desc:"anvil", inside:{y:4, x:3}},
       "HM": {y:1, x:1, desc:"hammer", inside:{y:5, x:4}},
       "FG": {y:1, x:1, desc:"forge", inside:{y:1, x:5}},
       "SW": {y:1, x:1, desc:"sword", inside:{y:0, x:5}, passable:true}
      }))
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM #- -- -- -- -- -- -- -- -# .  MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM #| FG HM CH ,  SW SW SW |# .  .  MM MM MM MM MM #- -- -- -- -# MM")
      .sprites("MM MM .  .  #_ __ AN ,  ,  SW SW __ _# .  .  .  MM MM MM MM #| ,  $  ,  |# MM")
      .sprites("MM .  .  .  WW WW #_ __ __ __ _# WW WW .  .  .  .  MM MM MM #| CH $  CH |# MM")
      .sprites("MM .  .  .  .  .  WW WW [] WW WW .  .  .  .  .  .  MM MM MM #_ __ __ __ _# MM")
      .sprites("MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM WW WW [] WW WW MM")
      .sprites("MM MM MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM .  .  .  MM MM")
      .sprites("MM MM MM MM MM MM MM .  .  .  MM .  .  .  .  .  .  .  .  MM MM .  .  .  MM MM")
      .sprites("MM MM MM MM MM MM MM .  .  .  MM MM MM .  .  .  MM MM MM MM MM .  .  .  MM MM")
      .sprites("MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM")
      .sprites("MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .  MM MM")
      .sprites("MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM")
      .sprites("MM MM MM .  .  .  MM MM MM MM .  .  .  MM MM MM #- -- -- -- -# .  .  .  MM MM")
      .sprites("MM MM MM .  .  MM MM MM MM MM .  .  .  MM MM MM #| CH TB CH |# .  .  .  MM MM")
      .sprites("MM MM .  .  .  MM MM MM MM MM .  .  .  MM MM .  #_ __ __ __ _# .  .  .  MM MM")
      .sprites("MM .  .  .  MM MM MM MM MM MM .  .  .  MM MM .  WW WW [] WW WW .  .  .  MM MM")
      .sprites("MM .  .  .  MM MM MM MM MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM")
      .sprites("MM MM .  .  .  MM MM MM MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM")
      .sprites("MM MM .  .  .  .  MM MM MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM")
      .sprites("MM MM MM .  .  .  .  MM MM MM MM MM .  .  .  .  .  .  .  .  .  MM MM MM MM MM")
      .sprites("MM MM MM MM .  .  .  MM MM MM MM MM MM .  .  .  .  .  .  .  MM MM MM MM MM MM")
      .sprites("MM MM MM MM .  .  .  .  MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM .  .  .  .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM .  .  .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM .  .  .  .  .  .  .  MM MM MM MM .  MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM .  #- -- -- -# MM .  MM MM MM MM .  MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM .  #| $  $  |# MM .  MM .  .  .  .  MM MM MM MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM .  #| ,  ,  |# MM .  .  .  MM .  .  .  .  .  .  .  .  MM MM MM MM MM MM MM")
      .sprites("MM .  #| ,  ,  ,  -- -- -- -- -# MM MM MM #- -- -- -# .  MM MM MM MM MM MM MM")
      .sprites("MM .  #| ,  ,  ,  ,  ,  $  $  $  -- -- -- $  $  $  |# .  MM MM MM MM MM MM MM")
      .sprites("MM .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  MM MM MM MM MM MM MM")
      .sprites("MM .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  __ __ __ __ _# .  MM MM MM MM MM MM MM")
      .sprites("MM .  #_ __ ,  ,  ,  __ __ __ __ __ _# WW WW WW WW WW .  MM MM MM MM MM MM MM")
      .sprites("MM .  WW WW #_ __ _# WW WW WW WW WW WW .  .  .  .  .  .  MM MM MM MM MM MM MM")
      .sprites("MM .  .  .  WW [] WW .  .  .  .  .  .  .  .  .  .  .  MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM .  .  .  .  .  MM MM MM MM .  .  .  .  .  MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM")
      .sprites("MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM MM");
   
   Map.create(MapConstants.SARDAS_CAVE, {})
      .tileMapping($.extend(base_tiles, {
       "P" : {y:1, x:1, desc:"pots", inside:{y:3, x:6}},
       "TB": {y:1, x:1, desc:"table", inside:{y:5, x:4}},
       "CH": {y:1, x:1, desc:"chair", inside:{y:2, x:5}, passable:true},
       "==": {y:1, x:1, desc:"bed top", inside:{y:0, x:6}},
       "HH": {y:1, x:1, desc:"bed bottom", inside:{y:1, x:6}},
       "FP": {y:1, x:1, desc:"fireplace", inside:{y:2, x:6}}
      }))
      .sprites("#- -- -- -- -- -# -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -- -- -#")
      .sprites("#| ,  FP ,  == |# ,  ,  ,  P  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  P  ,  P  ,  P  |#")
      .sprites("#| ,  ,  ,  HH |# ,  ,  CH ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  P  P  P  P  |#")
      .sprites("#| ,  ,  ,  ,  |# ,  ,  TB ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ __ __ __ _#")
      .sprites("#| ,  ,  ,  TB |# ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW WW [] WW +W WW WW WW WW")
      .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("#| ,  ,  ,  ,  |# __ __ __ ,  _# .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("#_ __ __ __ __ _# WW WW #- ,  -# .  +W WW WW W+ WW WW WW WW .  .  |W ~  ~  ~  ~")
      .sprites("W+ WW WW WW WW WW .  .  #| ,  |# .  |W ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("W| .  .  .  .  .  .  .  #_ __ _# .  |W ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("W| .  .  .  .  .  .  .  WW [] WW .  |W ~  ~  W| .  .  WW WW WW WW +W ~  ~  ~  ~")
      .sprites("W| .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  W| .  W+ WW +W .  .  |W ~  ~  ~  ~")
      .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  W| ^  |W .  .  |W ~  ~  ~  ~")
      .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  WW .  WW .  .  |W ~  ~  ~  ~")
      .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~")
      .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW ~  ~  ~  ~");
   
   Map.create(MapConstants.TITANS_TUNNEL, {})
      .tileMapping($.extend(base_tiles, {
       "$" : {y:1, x:1, desc:"chest", inside:{y:0, x:5}, passable:true},
       "MM": {y:0, x:3, desc:"mountain", inside:{y:3, x:3}},
       "M^": {y:1, x:3, desc:"mountain peak", inside:{y:4, x:3}}
      }))
      .sprites("~  ~  M^ MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
      .sprites("~  MM .  .  MM ~  ~  ~  ~  ~  ~  MM M^ ~  ~  ~  ~  ~")
      .sprites("M^ .  .  .  .  MM M^ ~  ~  ~  MM .  .  MM ~  ~  ~  ~")
      .sprites("MM MM M^ .  .  ^  MM ~  ~  ~  M^ MM .  MM ~  ~  ~  ~")
      .sprites("MM .  .  .  .  M^ M^ ~  ~  ~  MM .  M^ MM MM ~  ~  ~")
      .sprites("M^ .  .  .  .  .  MM ~  ~  MM .  .  .  .  MM MM ~  ~")
      .sprites("M^ .  .  .  MM MM M^ M^ MM .  .  M^ .  .  .  MM MM ~")
      .sprites("MM M^ MM .  .  MM .  .  .  .  .  .  MM .  .  MM ~  ~")
      .sprites("MM M^ MM .  .  .  .  .  MM M^ MM M^ .  .  .  MM M^ ~")
      .sprites("~  MM M^ .  .  M^ M^ MM ~  ~  MM .  .  .  M^ MM ~  ~")
      .sprites("~  ~  MM MM .  .  MM ~  ~  ~  M^ .  MM M^ .  M^ MM M^")
      .sprites("~  ~  MM .  .  MM M^ ~  ~  MM .  .  .  .  .  M^ MM ~")
      .sprites("MM M^ .  .  M^ MM ~  ~  M^ .  .  .  .  .  MM M^ ~  ~")
      .sprites("MM .  .  .  M^ ~  ~  MM .  .  .  .  .  M^ ~  ~  ~  ~")
      .sprites("M^ .  .  MM ~  ~  M^ MM MM M^ .  ^  MM MM MM ~  ~  ~")
      .sprites("~  MM .  MM ~  ~  M^ MM M^ MM MM M^ M^ ~  ~  ~  ~  ~")
      .sprites("~  MM .  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
      .sprites("~  M^ .  .  .  M^ MM M^ M^ MM ~  ~  ~  ~  ~  ~  ~  ~")
      .sprites("~  MM .  .  #- -- -- -- -- -# M^ ~  ~  ~  ~  ~  ~  ~")
      .sprites("~  M^ .  .  #| $  $  $  $  |# .  MM ~  ~  ~  ~  ~  ~")
      .sprites("~  M^ .  .  #_ __ __ __ __ _# .  MM ~  ~  ~  ~  ~  ~")
      .sprites("~  ~  MM .  WW WW WW WW [] WW .  M^ ~  ~  ~  ~  ~  ~")
      .sprites("~  ~  M^ .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~")
      .sprites("~  ~  ~  MM M^ MM M^ M^ M^ M^ ~  ~  ~  ~  ~  ~  ~  ~");
   
   
   Map.create(MapConstants.WATERFALL_CAVE, {})
      .tileMapping($.extend(base_tiles, {
       "$" : {y:1, x:1, desc:"chest", inside:{y:1, x:3}, passable:true},
       "^" : {y:0, x:3, desc:"stairs up", passable:true},
      }))
      .sprites(",  ,  __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  __ __ __ __ ,  ,  ,  ,  __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  |# WW WW WW WW #| ,  ,  ,  ,  ,  ,  |# WW WW WW WW #| ,  ,  |# WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  |# .  .  .  .  #| ,  __ __ __ __ ,  |# .  .  .  .  #_ __ __ _# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  |# .  .  .  .  #| |# WW WW WW WW #| |# .  .  .  .  WW WW WW WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  |# .  .  .  .  #_ _# .  .  .  .  #| |# .  .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  |# .  .  .  .  WW WW .  .  .  .  #| |# .  .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  |# WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  -- -# .  .  .  .  .  .  .  .  #| ,  -- -- -- -# .  .  .  .  #- -- -- -- ,  ,  ,  |# .  .  .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  #_ __ __ __ __ __ ,  |# .  .  .  .  WW WW WW WW #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  .  .  #- -- ,  ,  ,  ,  ,  ,  -- -# .  .  WW WW WW WW WW WW #| |# .  .  .  .  .  .  .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  .  .  #_ __ ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  #| |# .  .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  -- -# .  .  .  .  WW WW #| ,  ,  ,  ,  ,  __ _# .  .  .  .  .  .  .  .  #| ,  -- -- -- -# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  .  .  #| ,  ,  ,  ,  |# WW WW .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  #- -# .  .  .  .  #| ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  -- -# .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  #_ _# .  .  #- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -# .  .  WW WW ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  __ _# .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  WW WW .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  __ _# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# WW WW .  .  #- -- ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  |# WW WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  #_ __ __ __ ,  ,  ,  ,  -- -- -- -# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  __ _# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  __ _# .  .  .  .  #| ,  ,  ,  ,  ,  __ _# .  .  .  .  #- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# WW WW .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  |# WW WW .  .  .  .  #| ,  ,  ,  ,  |# WW WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  #- -# .  .  .  .  #_ __ __ __ ,  ,  ,  ,  __ _# .  .  .  .  #- -- ,  ,  ,  ,  __ _# .  .  .  .  #- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  #| |# .  .  .  .  WW WW WW WW #_ __ ,  |# WW WW .  .  .  .  #| ,  ,  ,  ,  |# WW WW .  .  .  .  #| ,  __ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  #_ __ -- -# .  .  .  .  .  .  WW WW #| |# .  .  .  .  .  .  #| ,  ,  ,  __ _# .  .  .  .  .  .  #| |# WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  WW WW #| |# .  .  .  .  .  .  .  .  #| |# .  .  .  .  .  .  #_ __ __ _# WW WW .  .  .  .  .  .  #| |# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  -- -# .  .  .  .  #| |# .  .  .  .  .  .  .  .  #_ _# .  .  .  .  #- -# WW WW WW WW .  .  .  .  .  .  #- -- ,  |# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  #| |# .  .  .  .  .  .  .  .  WW WW .  .  .  .  #| |# .  .  .  .  .  .  .  .  .  .  #| ,  ,  |# .  .  .  .  #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  #_ __ -- -- -- -# .  .  .  .  .  .  .  .  .  .  #_ _# .  .  .  .  .  .  .  .  #- -- ,  ,  ,  |# .  .  .  .  WW WW #| ,  ,  ,  ,  ,  ,  ,  __ __ __ __ ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  WW WW #| ,  ,  ,  -- -- -- -# .  .  .  .  .  .  WW WW .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  -- -# .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# WW WW WW WW #| ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  -- -# .  .  .  .  #_ __ __ __ ,  ,  __ _# .  .  .  .  .  .  .  .  .  .  .  .  #- -- -- -- ,  ,  ,  ,  __ __ __ _# .  .  .  .  #_ __ ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  __ _# .  .  .  .  WW WW WW WW #| |# WW WW .  .  .  .  .  .  .  .  #- -- -- -- ,  ,  ,  ,  ,  ,  ,  |# WW WW WW WW .  .  .  .  WW WW #| ,  ,  ,  ,  |# .  .  .  .  #| ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  WW WW .  .  .  .  .  .  .  .  #| |# .  .  .  .  #- -# .  .  .  .  #_ __ ,  ,  ,  ,  ,  ,  __ __ __ _# .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  #_ __ ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  #| |# .  .  .  .  #| |# .  .  .  .  WW WW #| ,  ,  ,  ,  |# WW WW WW WW .  .  .  .  #- -# .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  WW WW #|")
      .sprites(",  ,  __ __ __ _# .  .  .  .  #- -# .  .  .  .  #| |# .  .  .  .  #| ,  -- -# .  .  .  .  #_ __ __ __ ,  |# .  .  .  .  .  .  .  .  #| |# .  .  .  .  #_ __ ,  ,  ,  ,  -- -# .  .  .  .  #|")
      .sprites(",  |# WW WW WW WW .  .  .  .  #| |# .  .  .  .  #| |# .  .  .  .  #| ,  ,  |# .  .  .  .  WW WW WW WW #| |# .  .  .  .  .  .  .  .  #| |# .  .  .  .  WW WW #| ,  ,  ,  ,  |# .  .  .  .  #|")
      .sprites(",  |# .  .  .  .  .  .  .  .  #| ,  -- -- -- -- ,  ,  -- -- -- -- ,  ,  ,  |# .  .  .  .  .  .  .  .  #_ _# .  .  .  .  #- -- -- -- ,  ,  -- -# .  .  .  .  #| ,  ,  ,  __ _# .  .  .  .  #|")
      .sprites(",  |# .  .  .  .  #- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  WW WW .  .  .  .  #| ,  ,  ,  __ __ __ _# .  .  .  .  #| ,  ,  |# WW WW .  .  .  .  #|")
      .sprites(",  |# .  .  .  .  #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  .  .  .  .  #- -- ,  ,  ,  |# WW WW WW WW .  .  .  .  #| ,  ,  |# .  .  .  .  #- -- ,")
      .sprites(",  |# .  .  .  .  WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  |# .  .  .  .  #| ,  ,")
      .sprites(",  ,  -- -# .  .  .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  #| ,  ,  ,  ,  |# .  .  .  .  #- -- -- -- ,  ,  __ _# .  .  .  .  #| ,  ,")
      .sprites(",  ,  ,  |# .  .  .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  ,  __ _# .  .  .  .  #| ,  ,  ,  ,  |# WW WW .  .  .  .  #| ,  ,")
      .sprites(",  ,  __ _# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- ,  ,  ,  |# WW WW .  .  .  .  #| ,  __ __ __ _# .  .  .  .  #- -- ,  ,  ,")
      .sprites(",  |# WW WW .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #- -- ,  |# WW WW WW WW .  .  .  .  #_ __ ,  ,  ,")
      .sprites(",  |# .  .  .  .  #- -# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #_ __ __ _# .  .  .  .  .  .  .  .  WW WW #| ,  ,")
      .sprites(",  |# .  .  .  .  #| |# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  WW WW WW WW .  .  .  .  .  .  .  .  .  .  #| ,  ,")
      .sprites(",  _# .  .  .  .  #| ,  -- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  .  .  #- -# .  .  .  .  #_ __ ,")
      .sprites("|# WW .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  .  .  .  .  #| |# .  .  .  .  WW WW ,")
      .sprites("|# .  .  .  .  #- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #- -- -- -- ,  |# .  .  .  .  .  .  #|")
      .sprites("|# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  ,  ,  ,  -- -# .  .  .  .  #|")
      .sprites("|# .  .  .  .  #_ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #_ __ ,  ,  ,  ,  __ _# .  .  .  .  #|")
      .sprites("|# .  .  .  .  WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  WW WW #| ,  ,  |# WW WW .  .  .  .  #|")
      .sprites(",  -# .  .  .  .  #_ __ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -# .  .  .  .  #| ,  ,  |# .  .  .  .  #- -- ,")
      .sprites(",  |# .  .  .  .  WW WW WW WW #| ,  ,  |# #- -- -- -- -- -- -- -# #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  |# .  .  .  .  #| ,  ,")
      .sprites(",  |# .  .  .  .  .  .  .  .  #_ __ __ _# #| $  $  $  $  $  $  |# #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  __ _# .  .  .  .  #| ,  ,")
      .sprites(",  |# .  .  .  .  .  .  .  .  WW WW WW WW #| ,  ,  ,  ,  ,  ,  |# #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| |# WW WW .  .  .  .  #| ,  ,")
      .sprites(",  ,  -- -- -- -# .  .  .  .  .  .  .  .  #_ __ __ __ __ __ __ _# #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- ,  |# .  .  .  .  #- -- ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  WW WW [] WW WW WW WW WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  .  .  .  .  #- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  ^  #| ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,")
      .sprites(",  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,");
   
  };
  
  return {
    init: init
  };
  
});