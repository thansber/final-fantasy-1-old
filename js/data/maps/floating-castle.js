define(/* FloatingCastleMapData */
["maps/map", "constants/map"],
function(Map, MapConstants) {

  var tiles = {
    "~" : Map.newTile({y:3, x:3}).desc("nothing").isFiller(),
    "W+": Map.newTile({y:0, x:3}).desc("wall top left"),
    "WW": Map.newTile({y:0, x:4}).desc("wall"),
    "+W": Map.newTile({y:0, x:5}).desc("wall top right"),
    "W|": Map.newTile({y:1, x:3}).desc("wall left"),
    "." : Map.newTile({y:1, x:4}).desc("path"),
    "|W": Map.newTile({y:1, x:5}).desc("wall right"),
    "^" : Map.newTile({y:2, x:3}).desc("stairs up"),
    "v" : Map.newTile({y:2, x:5}).desc("stairs down"),
    "[]": Map.newTile({y:2, x:4}).desc("door").inside({y:5, x:4}),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top ").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top right").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:5, x:3}),
    "-{": Map.newTile({y:1, x:1}).desc("snake statue left").inside({y:6, x:3}),
    "}-": Map.newTile({y:1, x:1}).desc("snake statue right").inside({y:6, x:5}),
    "II": Map.newTile({y:1, x:1}).desc("monolith").inside({y:3, x:5}),
    "^^": Map.newTile({y:1, x:1}).desc("arrows").inside({y:6, x:0}),
    "@" : Map.newTile({y:1, x:1}).desc("orb altar").inside({y:6, x:1}),
    "O" : Map.newTile({y:1, x:1}).desc("orb").inside({y:0, x:0}),
    "*" : Map.newTile({y:1, x:1}).desc("no idea").inside({y:6, x:4}),
    "@@": Map.newTile({y:1, x:1}).desc("transporter").inside({y:3, x:4}),
    "|h": Map.newTile({y:1, x:1}).desc("chair").inside({y:5, x:5}),
    "xC": Map.newTile({y:1, x:1}).desc("console upper right").inside({y:4, x:3}),
    "Cx": Map.newTile({y:1, x:1}).desc("console upper left").inside({y:4, x:5}),
    "CC": Map.newTile({y:1, x:1}).desc("console double column").inside({y:4, x:4}),
  };

  var init = function() {
    Map.create(MapConstants.FLOATING_CASTLE_1F).tileMapping(tiles).battleEverywhere()
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

    Map.create(MapConstants.FLOATING_CASTLE_2F).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW +W ~  ~  ~  WW .  .  .  WW ~  ~  ~  W+ WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  #- -- -- -- -- -# |W ~  ~  ~  ~  W| .  |W ~  ~  ~  ~  W| #- -- -- -- -- -# .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  #| $  ,  ,  $  |# |W ~  ~  ~  ~  W+ .  +W ~  ~  ~  ~  W| #| $  ,  ,  ,  |# .  |W ~  ~  ~  ~  ~")
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

    Map.create(MapConstants.FLOATING_CASTLE_3F).tileMapping(tiles).battleEverywhere()
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
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  .  .  #| Cx xC |# .  .  ~  ~  .  .  .  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
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

    Map.create(MapConstants.FLOATING_CASTLE_4F, {wrapsX:true, wrapsY:true}).tileMapping(tiles).battleEverywhere()
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

    Map.create(MapConstants.FLOATING_CASTLE_5F).tileMapping(tiles).battleEverywhere()
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