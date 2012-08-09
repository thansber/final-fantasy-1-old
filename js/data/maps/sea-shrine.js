define(/* SeaShrineMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {
 
  var tiles = {
    "D" : {y:0, x:0, desc:"door"},
    "I" : {y:0, x:0, desc:"pillar"},
    "$" : {y:0, x:0, desc:"chest"},
    "~" : {y:0, x:0, desc:"water"},
    "." : {y:0, x:0, desc:"path"},
    "," : {y:0, x:0, desc:"room empty"},
    "^" : {y:0, x:0, desc:"stairs up"},
    "v" : {y:0, x:0, desc:"stairs down"},
    "--": {y:0, x:0, desc:"wall"},
    "+-": {y:0, x:0, desc:"wall top left"},
    "-+": {y:0, x:0, desc:"wall top right"},
    "|-": {y:0, x:0, desc:"wall left"},
    "-|": {y:0, x:0, desc:"wall right"},
    "#-": {y:0, x:0, desc:"room wall top left"},
    "##": {y:0, x:0, desc:"room wall top "},
    "-#": {y:0, x:0, desc:"room wall top right"},
    "#|": {y:0, x:0, desc:"room wall left"},
    "|#": {y:0, x:0, desc:"room wall right"},
    "#_": {y:0, x:0, desc:"room wall bottom left"},
    "__": {y:0, x:0, desc:"room wall bottom"},
    "_#": {y:0, x:0, desc:"room wall bottom right"},
    "SB": {y:0, x:0, desc:"submarine"},

    "ST": {y:0, x:0, desc:"statue"},
    "@" : {y:0, x:0, desc:"orb altar"},
    "*" : {y:0, x:0, desc:"no idea"},
    "}" : {y:0, x:0, desc:"serpent statue left"},
    "{" : {y:0, x:0, desc:"serpent statue right"}
  };
 
  var init = function() {
    Map.create(MapConstants.SEA_SHRINE_B1).tileMapping(tiles)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- +- -- -- ~  ~  ~  ~  ~  ~  ~  -- -- -- -- -- ~  ~  ~  -- -- -- -- -- -- -- -- -- -- -- -- -- -+ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ~  ~  .  ~  ~  ~  .  .  .  .  .  ~  ~  ~  ~  ~  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  . ")
       .sprites("-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- |- .  .  .  .  .  .  .  .  ~  .  .  .  .  .  .  ~  .  .  ~  ~  ~  ~  .  .  .  .  .  .  .  .  -| -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  |- .  .  #- ## ## ## -# .  ~  #- ## ## ## -# .  .  #- ## ## ## -# ~  ~  #- ## ## ## -# .  .  -| ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  #| ,  ,  ,  |# .  .  #| ,  $  ,  |# .  .  #| $  ,  $  |# ~  ~  #| $  $  $  |# .  .  -| ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  #| ,  ,  ,  |# ~  .  #| ,  ,  ,  |# .  .  #| ,  ,  ,  |# ~  ~  #| ,  ,  ,  |# .  .  -| ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")

  };
 
  return {
    init: init
  };

});   
