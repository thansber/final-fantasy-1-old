define(/* FloatingCastleMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {

  var tiles = {
    "W+": {y:0, x:0, desc:"wall top left", inside:{y:3, x:0}},
    "WW": {y:0, x:1, desc:"wall", inside:{y:3, x:1}},
    "+W": {y:0, x:2, desc:"wall top right", inside:{y:3, x:2}},
    "W|": {y:1, x:0, desc:"wall left", inside:{y:4, x:0}},
    "." : {y:1, x:1, desc:"path", inside:{y:4, x:1}},
    "|W": {y:1, x:2, desc:"wall right", inside:{y:4, x:2}},
    "^" : {y:2, x:1, desc:"stairs up", inside:{y:5, x:1}},
    "v" : {y:2, x:1, desc:"stairs up", inside:{y:5, x:1}},
    "[]": {y:2, x:2, desc:"door", inside:{y:5, x:2}},
    "#-": {y:0, x:3, desc:"room wall top left", inside:{y:3, x:3}},
    "--": {y:0, x:4, desc:"room wall top ", inside:{y:3, x:4}},
    "-#": {y:0, x:5, desc:"room wall top right", inside:{y:3, x:5}},
    "#|": {y:1, x:3, desc:"room wall left", inside:{y:4, x:3}},
    "," : {y:1, x:4, desc:"room empty", inside:{y:4, x:4}},
    "|#": {y:1, x:5, desc:"room wall right", inside:{y:4, x:5}},
    "#_": {y:2, x:3, desc:"room wall bottom left", inside:{y:5, x:3}},
    "__": {y:2, x:4, desc:"room wall bottom", inside:{y:5, x:4}},
    "_#": {y:2, x:5, desc:"room wall bottom right", inside:{y:5, x:5}},
    "$" : {y:1, x:4, desc:"chest", inside:{y:6, x:0}},
    "-{": {y:1, x:4, desc:"snake statue left", inside:{y:7, x:0}},
    "}-": {y:1, x:4, desc:"snake statue right", inside:{y:7, x:2}},

    "~" : {y:4, x:4, desc:"nothing"},
    "II": {y:4, x:4, desc:"monolith"},
    "^^": {y:4, x:4, desc:"arrows"},
    "@" : {y:1, x:1, desc:"orb altar", inside:{y:0, x:7}},
    "O" : {y:1, x:1, desc:"orb", inside:{y:4, x:7}},
    "*" : {y:1, x:1, desc:"no idea", inside:{y:1, x:7}},
    "@@": {y:4, x:4, desc:"transporter"},
    "|h": {y:4, x:4, desc:"chair"},
    "xC": {y:4, x:4, desc:"console upper right"},
    "Cx": {y:4, x:4, desc:"console upper left"},
    "CC": {y:4, x:4, desc:"console double column"},


  };

  var init = function() {
    Map.create(MapConstants.FLOATING_CASTLE_1F).tileMapping(tiles)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  ^  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW .  .  .  WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  #- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  #- -- -# .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -# ~  ~")
       .sprites("~  ~  #| $  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| ,  |# .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  |# ~  ~")
       .sprites("~  #- $  ,  $  -# ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #- ,  ,  ,  -# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  #- ,  $  $  -# ~")
       .sprites("#- ,  ,  ,  ,  ,  -# WW WW WW WW WW WW WW .  .  #- ,  II ,  II ,  -# .  .  WW WW WW WW WW WW WW #- ,  $  ,  ,  ,  -#")
       .sprites("#| ,  ,  ,  ,  $  |# .  .  .  .  .  .  .  .  .  #| ,  ,  @@ ,  ,  |# .  .  .  .  .  .  .  .  .  #| $  ,  ,  ,  ,  |#")
       .sprites("#_ ,  ,  ,  ,  ,  _# .  .  WW WW WW WW WW .  .  #_ ,  II ,  II ,  _# .  .  WW WW WW WW WW .  .  #| ,  ,  ,  ,  $  |#")
       .sprites("WW #_ ,  ,  ,  _# WW .  |W ~  ~  ~  ~  ~  W| .  WW #_ ,  ,  ,  _# WW .  |W ~  ~  ~  ~  ~  W| .  #_ ,  ,  ,  ,  ,  _#")
       .sprites("~  WW #| ,  |# WW .  .  |W ~  ~  ~  ~  ~  W| .  .  WW #| ,  |# WW .  .  |W ~  ~  ~  ~  ~  W| .  WW #_ ,  ,  ,  _# WW")
       .sprites("~  ~  #_ __ _# .  .  .  WW ~  ~  ~  ~  ~  WW .  .  .  #_ __ _# .  .  .  WW ~  ~  ~  ~  ~  WW .  .  WW #_ __ _# WW ~")
       .sprites("~  ~  W+ [] WW .  .  WW ~  ~  ~  ~  ~  ~  ~  WW .  .  WW [] WW .  .  WW ~  ~  ~  ~  ~  ~  ~  WW .  .  WW [] WW ~  ~")
       .sprites("~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~")
       .sprites("~  ~  WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW .  .  .  WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW .  .  .  WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  #- -- -# .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  #| ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  #- ,  ,  ,  -# .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #- ,  ,  ,  ,  ,  -# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #| ,  ,  $  ,  ,  |# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #_ ,  ,  ,  ,  ,  _# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  WW #_ ,  ,  ,  _# WW .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW #| ,  |# WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  #_ __ _# .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW [] WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.FLOATING_CASTLE_2F).tileMapping(tiles)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW +W ~  ~  ~  WW .  .  .  WW ~  ~  ~  W+ WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  #- -- -- -- -- -# |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| #- -- -- -- -- -# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  #| $  ,  ,  $  |# |W ~  ~  ~  ~  W+ .  +W ~  ~  ~  ~  W| W| $  ,  ,  ,  |# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  #_ __ __ __ __ _# |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| #_ __ __ __ __ _# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  WW WW WW [] WW WW |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| WW WW WW WW [] WW .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW WW WW WW .  .  WW ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  WW .  .  WW WW WW WW WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  W| .  |W ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW WW WW .  .  .  WW WW WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  #- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -# ~  ~")
       .sprites("~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  #| $  |# ~  ~")
       .sprites("~  #- ,  ,  $  -# ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  #- ,  ,  ,  -# ~")
       .sprites("#- ,  ,  ,  ,  ,  -# WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW #- ,  ,  ,  $  ,  -#")
       .sprites("#| $  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  |#")
       .sprites("#_ ,  ,  ,  ,  ,  _# .  .  WW WW WW WW WW .  .  .  .  .  .  .  .  .  .  .  WW WW WW WW WW .  .  #| ,  ,  ,  ,  ,  |#")
       .sprites("WW #_ ,  ,  ,  _# WW .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  #_ ,  ,  ,  ,  ,  _#")
       .sprites("~  WW #| ,  |# WW .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  WW #_ ,  ,  ,  _# WW")
       .sprites("~  ~  #_ __ _# .  .  .  WW ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  WW .  .  WW #_ __ _# WW ~")
       .sprites("~  ~  W+ [] WW .  .  WW ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  WW .  .  WW [] WW ~  ~")
       .sprites("~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~")
       .sprites("~  ~  WW WW WW WW WW ~  ~  ~  ~  ~  WW .  .  WW WW WW .  .  .  WW WW WW .  .  WW ~  ~  ~  ~  ~  WW WW WW WW WW ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  WW ~  ~  ~  W| .  |W ~  ~  ~  WW .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W+ WW WW WW WW .  .  +W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W+ .  .  WW WW WW WW WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  #- -- -- -# .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| .  #- -- -- -- -# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  #| ,  $  |# .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| #- $  $  ,  ,  |# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  #_ __ __ _# .  |W ~  ~  ~  ~  W+ .  +W ~  ~  ~  ~  W| #_ __ __ __ __ _# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  WW [] WW WW .  |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| WW WW WW WW [] WW .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  W+ .  .  .  +W ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW ~  ~  W+ .  .  .  .  .  +W ~  ~  WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  ^  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.FLOATING_CASTLE_3F).tileMapping(tiles)
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| $  ,  $  |# .  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| $  ,  $  |# ~  .  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ _# ~  .  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW [] WW .  .  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  .  .  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -# ~  ~  ~")
       .sprites("~  ~  ~  .  ~  .  .  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| $  ,  $  |# ~  .  ~")
       .sprites("~  .  ~  .  .  .  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #| $  ,  $  |# .  .  ~")
       .sprites(".  .  #- -- -- -- -- -# .  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  #| $  ,  $  |# .  .  ~")
       .sprites(".  .  #| $  $  $  $  |# ~  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  .  .  ~  #_ __ __ __ _# .  .  .")
       .sprites("~  .  #_ __ __ __ __ _# .  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  .  ~  .  .  ~  ~  WW WW WW [] WW ~  ~  .")
       .sprites("~  .  WW WW [] WW WW WW .  .  .  .  .  .  .  .  .  ~  ~  ~  ~  .  .  .  .  .  .  .  .  .  .  ~  .  .  .  ~  ~  ~  ~  ~  .  ~  ~  ~  .")
       .sprites("~  .  .  .  .  .  .  .  .  ~  .  .  .  .  .  .  .  .  .  .  .  .  .  v  .  WW WW WW WW .  .  .  .  ~  .  ~  ~  ~  ~  ~  .  ~  ~  .  .")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  .  ~  ~  ~  .  .  .  .  WW ~  ~  WW .  .  .  .  .  .  .  ~  ~  ~  .  .  ~  .  .  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  ~  ~  ~  ~  .  .  .  WW ~  ~  WW .  .  .  .  ~  ~  .  ~  ~  .  .  ~  .  .  .  ~")
       .sprites("~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  .  ~  .  WW ~  ~  WW .  .  .  .  .  ~  ~  ~  ~  .  ~  ~  .  ~  .  .")
       .sprites("~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  WW WW .  WW .  .  ~  ~  .  .  .  ~  ~  .  .  .  .  ~  .  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  .  ^  .  .  .  .  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  .  .  .  .  .  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  .  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  .  ~  .  .  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  .  .  .  ~  ~  .  .  .  .  .  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  ~  ~  ~  ~  ~  .  .  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  .  ~  .  .  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  ~  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  .  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  #- -- -- -# .  .  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #| C- -C |# .  .  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  #_ __ __ _# .  .  ~  .  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  WW [] WW WW .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  .  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  ~  ~  ~  ~  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #- -- -- -- -- -- -# .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #- ,  |h ,  |h ,  |h |h -# .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #_ xC Cx CC xC CC xC CC _# .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  WW #_ ,  |h ,  |h |h _# WW .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  WW #_ ,  ,  ,  _# WW .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  WW #_ __ _# WW .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  WW [] WW .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.FLOATING_CASTLE_4F, {wrapsX:true, wrapsY:true}).tileMapping(tiles)
 .repeatSprites("~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~", 4)
       .sprites("WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 7)
       .sprites("WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW")
 .repeatSprites("~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~", 7)
       .sprites("WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 2)
       .sprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 4)
       .sprites("WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW")
 .repeatSprites("~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~", 7)
       .sprites("WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 7)
       .sprites("WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW")
 .repeatSprites("~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~", 7)
       .sprites("WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  .  WW WW WW WW")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 2)
       .sprites(".  .  .  .  .  .  .  v  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .")
 .repeatSprites(".  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .", 4)
       .sprites("WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  .  .  |W WW WW WW WW")
 .repeatSprites("~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~", 3);

    Map.create(MapConstants.FLOATING_CASTLE_5F).tileMapping(tiles)
       .sprites("#- -- -- -- -- -- -- -- -- -- -- -- -- -- -#")
       .sprites("#| ,  ,  ,  ,  ,  ,  @  ,  ,  ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  ,  -{ *  }- ,  ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  ,  ,  ^^ ,  ,  ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  ,  ,  ^^ ,  ,  ,  ,  ,  ,  |#")
       .sprites("#| ,  ^^ ^^ ^^ ^^ ^^ O  ^^ ^^ ^^ ^^ ^^ ^^ |#")
 .repeatSprites("#| ,  ,  ,  ,  ,  II ^^ II ,  ,  ,  ,  ,  |#", 5)
       .sprites("#_ __ __ __ __ __ _# ^^ #_ __ __ __ __ __ _#")
       .sprites("WW WW WW WW WW WW W+ [] +W WW WW WW WW WW WW")
       .sprites("~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW .  WW ~  ~  ~  ~  ~  ~")
 .repeatSprites("~  ~  ~  ~  ~  ~  ~  .  ~  ~  ~  ~  ~  ~  ~", 37)
       .sprites("~  ~  ~  ~  ~  ~  W+ .  +W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  W| v  |W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW ~  ~  ~  ~  ~  ~")
  };

  return { init: init };
});