define(/* MirageTowerMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var tiles = {
    "~" : Map.newTile({y:4, x:1}).desc("nothing").isFiller(),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:6, x:4}).passableBy(Transport.Foot),
    "." : Map.newTile({y:1, x:4}).desc("path").inside({y:4, x:4}).passableBy(Transport.Foot),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}).passableBy(Transport.Foot),
    "^" : Map.newTile({y:2, x:5}).desc("stairs up").inside({y:5, x:5}).passableBy(Transport.Foot),
    "v" : Map.newTile({y:2, x:4}).desc("stairs down").inside({y:5, x:4}).passableBy(Transport.Foot),
    "WW": Map.newTile({y:0, x:4}).desc("wall").inside({y:3, x:4}),
    "W+": Map.newTile({y:0, x:3}).desc("wall top left").inside({y:3, x:3}),
    "+W": Map.newTile({y:0, x:5}).desc("wall top right").inside({y:3, x:5}),
    "W|": Map.newTile({y:1, x:3}).desc("wall left").inside({y:4, x:3}),
    "|W": Map.newTile({y:1, x:5}).desc("wall right").inside({y:4, x:5}),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top ").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top right").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "[]": Map.newTile({y:2, x:3}).desc("door").inside({y:5, x:3}).passableBy(Transport.Foot).roomEntry(),
    "U" : Map.newTile({y:1, x:1}).desc("inside rock").inside({y:0, x:6}),
    "UU": Map.newTile({y:1, x:6}).desc("rock").inside({y:2, x:6}),
    "C-": Map.newTile({y:1, x:1}).desc("computer left half").inside({y:6, x:0}),
    "-C": Map.newTile({y:1, x:1}).desc("computer right half").inside({y:6, x:1}),
    "C" : Map.newTile({y:1, x:1}).desc("computer 2 column").inside({y:6, x:2}),
    "CC": Map.newTile({y:1, x:1}).desc("computer 1 column").inside({y:6, x:3}),
    "<>": Map.newTile({y:1, x:1}).desc("stone pyramid").inside({y:6, x:5}),
    "%%": Map.newTile({y:1, x:1}).desc("portal").inside({y:6, x:4}).passableBy(Transport.Foot)
  };

  var init = function() {
    Map.create(MapConstants.MIRAGE_TOWER_1F).tileMapping(tiles).battleEverywhere()
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
       .sprites("W| .  .  #- ,  ,  ,  U  ,  U  ,  ,  U  ,  ,  U  U  U  U  ,  ,  U  U  ,  U  ,  ,  ,  -# .  .  |W")
       .sprites("W| .  .  #| ,  ,  ,  U  ,  U  $  ,  U  ,  U  $  $  ,  $  U  ,  $  U  ,  U  ,  ,  ,  |# .  .  |W")
       .sprites("W| .  .  #| ,  ,  ,  U  ,  ,  U  ,  U  ,  ,  ,  ,  $  ,  ,  ,  U  U  ,  U  ,  ,  ,  |# .  .  |W")
       .sprites("W| .  .  #_ ,  ,  ,  U  ,  ,  U  ,  U  ,  U  ,  ,  ,  $  U  ,  U  ,  ,  U  ,  ,  ,  _# .  .  |W")
       .sprites("W| .  .  WW #| ,  ,  ,  U  ,  U  ,  U  ,  ,  U  U  U  U  ,  ,  U  ,  ,  ,  ,  ,  |# WW .  .  |W")
       .sprites("WW .  .  .  #| ,  ,  ,  U  ,  U  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  U  ,  U  ,  ,  ,  |# .  .  .  WW")
       .sprites("~  W| .  .  #_ ,  ,  ,  U  ,  ,  U  U  U  U  U  U  U  U  U  U  ,  ,  U  ,  ,  ,  _# .  .  |W ~")
       .sprites("~  W| .  .  WW #| ,  ,  U  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  U  ,  ,  |# WW .  .  |W ~")
       .sprites("~  WW .  .  .  #| ,  ,  ,  U  U  U  U  U  U  U  ,  ,  U  U  U  U  U  ,  ,  ,  |# .  .  .  WW ~")
       .sprites("~  ~  W| .  .  #_ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  _# .  .  |W ~  ~")
       .sprites("~  ~  W| .  .  WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# WW .  .  |W ~  ~")
       .sprites("~  ~  WW .  .  .  #_ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  _# .  .  .  WW ~  ~")
       .sprites("~  ~  ~  W| .  .  WW #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  __ _# WW .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  WW .  .  .  WW WW #_ __ __ __ __ __ __ __ __ __ __ __ __ __ WW WW .  .  .  WW ~  ~  ~")
       .sprites("~  ~  ~  ~  WW .  .  .  .  WW WW WW WW WW [] +W W+ [] WW WW WW WW WW .  .  .  .  WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW .  .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  .  WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  |W W| .  .  .  .  .  WW WW WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  ^  |W W| v  .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.MIRAGE_TOWER_2F).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  .  UU UU .  .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W+ WW .  .  .  .  .  UU UU UU .  ^  UU UU UU .  .  UU .  .  WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ .  .  .  .  UU UU UU .  .  .  .  .  .  .  .  UU .  UU .  .  .  .  +W ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  .  UU UU .  .  UU .  UU .  .  .  .  UU .  UU .  .  UU UU .  .  .  +W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  UU .  .  .  UU .  UU .  .  .  .  .  .  UU .  UU .  .  .  UU .  .  |W ~  ~  ~")
       .sprites("~  ~  W+ .  .  .  .  .  UU .  .  .  .  .  #- -- -- -# .  .  .  .  UU UU .  .  UU .  .  +W ~  ~")
       .sprites("~  ~  W| .  .  UU .  UU .  .  .  #- -- -- ,  ,  ,  ,  -- -- -# .  .  .  UU .  UU .  .  |W ~  ~")
       .sprites("~  ~  W| .  UU .  .  UU .  #- -- CC -C -C ,  ,  ,  ,  CC C- -C -- -# .  UU .  .  .  .  |W ~  ~")
       .sprites("~  W+ UU UU .  .  UU .  .  #| C- CC ,  ,  ,  ,  ,  ,  ,  ,  -C CC |# .  .  UU .  .  .  .  +W ~")
       .sprites("~  W| .  .  .  .  UU .  #- ,  CC ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  C- ,  -# .  UU .  UU .  .  |W ~")
       .sprites("~  W| .  UU .  .  UU .  #| CC C- ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  CC C- |# .  UU .  .  UU .  |W ~")
       .sprites("W+ .  .  UU .  UU .  .  #| CC ,  ,  ,  ,  $  ,  ,  $  ,  ,  ,  ,  CC |# .  .  UU UU .  .  .  +W")
       .sprites("W| .  UU .  .  UU .  #- ,  -C ,  ,  ,  $  ,  ,  ,  ,  $  ,  ,  ,  C- ,  -# .  .  .  UU .  .  |W")
       .sprites("W| .  UU .  .  UU .  #_ ,  CC ,  ,  $  ,  ,  ,  ,  ,  ,  $  ,  ,  CC ,  _# .  .  .  .  UU .  |W")
       .sprites("W| .  UU .  .  .  .  WW #| C  ,  ,  ,  $  ,  ,  ,  ,  $  ,  ,  ,  -C |# WW .  .  .  .  UU .  |W")
       .sprites("W| .  UU .  .  UU .  .  #| C- ,  ,  ,  ,  $  ,  ,  $  ,  ,  ,  ,  C  |# .  .  .  .  .  UU .  |W")
       .sprites("W| .  .  UU .  UU .  .  #_ CC CC ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  CC C _#  .  .  .  .  UU .  .  |W")
       .sprites("WW .  .  UU .  UU .  .  WW #| -C ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  C- |# WW .  .  .  .  UU .  .  WW")
       .sprites("~  W| .  UU .  .  UU .  .  #_ C  C  ,  ,  ,  ,  ,  ,  ,  ,  -C C- _# .  .  .  .  .  UU .  |W ~")
       .sprites("~  W| .  .  UU .  UU .  .  WW #| C- ,  ,  ,  ,  ,  ,  ,  ,  C- |# WW .  .  .  .  UU .  .  |W ~")
       .sprites("~  WW .  .  .  UU .  UU .  .  #_ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  _# .  .  .  .  .  UU .  .  WW ~")
       .sprites("~  ~  W| .  .  UU .  .  UU .  WW #_ __ __ ,  ,  ,  ,  __ __ _# WW .  .  .  .  .  UU .  |W ~  ~")
       .sprites("~  ~  W| .  .  UU .  .  .  .  .  WW [] WW #_ __ __ _# WW [] WW .  .  .  .  .  UU .  .  |W ~  ~")
       .sprites("~  ~  WW .  .  UU .  .  UU UU .  .  .  .  WW WW WW WW .  .  .  .  UU UU .  .  UU .  .  WW ~  ~")
       .sprites("~  ~  ~  W| .  .  UU .  .  .  UU .  UU .  .  UU UU .  .  UU UU UU .  .  .  UU .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  WW .  .  .  UU UU .  .  .  .  UU UU .  .  UU UU .  .  .  .  UU UU .  .  .  WW ~  ~  ~")
       .sprites("~  ~  ~  ~  WW .  .  .  .  UU UU UU UU .  .  .  .  .  .  UU UU UU UU .  .  .  .  WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW .  .  .  .  .  .  .  .  .  UU UU UU .  .  .  .  .  .  WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  .  .  .  UU .  .  .  .  .  .  WW WW WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW .  .  UU v .  .  WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.MIRAGE_TOWER_3F).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  W+ WW WW WW +W ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ WW .  .  v  .  .  WW +W ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  .  .  .  .  .  .  .  +W ~  ~  ~")
       .sprites("~  ~  W+ .  .  .  .  #- -- -# .  .  .  .  +W ~  ~")
       .sprites("~  W+ .  .  .  .  #- C- -C -C -# .  .  .  .  +W ~")
       .sprites("~  W| .  .  .  #- ,  ,  ,  ,  ,  -# .  .  .  |W ~")
       .sprites("W+ .  .  .  #- ,  ,  ,  ,  ,  ,  ,  -# .  .  .  +W")
       .sprites("W| .  .  #- ,  ,  ,  <> ,  <> ,  ,  ,  -# .  .  |W")
       .sprites("W| .  .  #| ,  ,  ,  ,  %% ,  ,  ,  ,  |# .  .  |W")
       .sprites("W| .  .  #_ ,  ,  ,  <> ,  <> ,  ,  ,  _# .  .  |W")
       .sprites("WW .  .  WW #_ ,  ,  ,  ,  ,  ,  ,  _# WW .  .  WW")
       .sprites("~  W| .  .  WW #_ ,  ,  ,  ,  ,  _# WW .  .  |W ~")
       .sprites("~  WW .  .  .  WW #_ __ __ __ _# WW .  .  .  WW ~")
       .sprites("~  ~  WW .  .  .  WW WW [] WW WW .  .  .  WW ~  ~")
       .sprites("~  ~  ~  WW .  .  .  .  .  .  .  .  .  WW ~  ~  ~")
       .sprites("~  ~  ~  ~  WW WW .  .  .  .  .  WW WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW ~  ~  ~  ~  ~  ~");
  };

  return {
   init: init
  };

});