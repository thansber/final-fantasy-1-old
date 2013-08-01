define(/* IceCaveMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var tiles = {
    "~" : Map.newTile({y:4, x:1}).desc("nothing").isFiller(),
    "." : Map.newTile({y:1, x:4}).desc("floor").inside({y:4, x:4}).passableBy(Transport.Foot),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}).passableBy(Transport.Foot),
    "!" : Map.newTile({y:2, x:4}).desc("ice").inside({y:5, x:4}).passableBy(Transport.Foot),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:6, x:1}).passableBy(Transport.Foot),
    "O" : Map.newTile({y:1, x:1}).desc("hole").inside({y:6, x:0}).passableBy(Transport.Foot),
    "[]": Map.newTile({y:2, x:5}).desc("door").inside({y:5, x:5}).passableBy(Transport.Foot),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "WW": Map.newTile({y:0, x:4}).desc("wall").inside({y:3, x:4}),
    "W+": Map.newTile({y:0, x:3}).desc("wall top left").inside({y:3, x:3}),
    "+W": Map.newTile({y:0, x:5}).desc("wall top right").inside({y:3, x:5}),
    "W|": Map.newTile({y:1, x:3}).desc("wall left").inside({y:4, x:3}),
    "|W": Map.newTile({y:1, x:5}).desc("wall right").inside({y:4, x:5}),
    "MM": Map.newTile({y:2, x:3}).desc("mountain").inside({y:5, x:3}),
    "^" : Map.newTile({y:6, x:2}).desc("stairs up").passableBy(Transport.Foot),
    "v" : Map.newTile({y:6, x:3}).desc("stairs down").passableBy(Transport.Foot)
  };

  var init = function() {
    Map.create(MapConstants.ICE_CAVE_B1).tileMapping(tiles).battleEverywhere()
       .sprites("W+ WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW +W")
       .sprites("W| .  .  .  .  .  .  ^  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM MM WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM v  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM ~  MM .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #- -- -- -- -- -# WW WW +W ~  W+ WW WW WW WW WW WW WW WW MM MM MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  ,  ,  ,  |# .  .  |W ~  W| .  .  .  .  .  .  MM MM MM MM MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #_ __ __ ,  ,  |# .  .  |W ~  W| .  .  .  .  .  .  .  .  .  ^  MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W+ WW [] #| ,  |# .  .  |W ~  W| .  .  #- -- -- -- -# .  .  MM MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| v  .  #| ,  |# .  .  |W ~  W| .  .  #| $  $  $  |# .  .  .  MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #- -- -- ,  ,  |# .  .  |W WW W| .  .  #| ,  ,  ,  |# .  .  MM MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| $  ,  ,  ,  |# .  .  .  .  .  .  .  #| ,  ,  O  |# .  .  MM MM ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  ,  __ __ _# .  .  .  .  .  .  .  #| ,  ,  ,  |# .  MM MM MM WW .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  |# [] WW WW .  .  .  .  .  .  .  #| ,  ,  ,  |# .  MM MM .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  |# .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  |# .  MM .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  |# -- -- -# .  .  |W WW W| .  .  #| ,  ,  ,  |# .  MM .  |W WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #| ,  |# ,  $  |# .  .  |W ~  W| .  .  #| ,  ,  ,  |# .  MM MM |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  #_ __ _# __ __ _# .  .  |W ~  W| .  .  #_ __ __ __ _# .  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W+ WW WW [] WW WW .  .  |W ~  W| .  .  WW WW WW [] WW .  .  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  |W ~  W| .  .  .  .  .  .  .  .  MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW ~  WW WW WW WW WW WW MM MM MM MM ~  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.ICE_CAVE_B2A).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW")
       .sprites("~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  MM MM MM MM MM MM .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  |W")
       .sprites("~  ~  ~  ~  W| .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  |W")
 .repeatSprites("~  ~  ~  ~  W| .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  |W", 24)
       .sprites("W+ WW WW WW .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| v  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW");

    Map.create(MapConstants.ICE_CAVE_B2B).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  MM MM MM MM MM .  .  MM MM MM ~  MM MM ~  ~")
       .sprites("~  ~  ~  ~  ~  MM MM MM .  .  .  .  MM MM MM MM ~  MM ~  ~  ~")
       .sprites("~  MM MM ~  MM MM MM .  .  MM MM MM MM MM MM MM MM MM MM ~  ~")
       .sprites("~  ~  MM ~  MM MM .  .  .  .  .  .  .  .  .  .  MM MM MM ~  ~")
       .sprites("~  ~  MM MM MM .  .  .  #- -# MM MM MM MM MM v  MM ~  MM MM ~")
       .sprites("~  ~  MM MM .  .  .  #- ,  ,  -- -- -- -# MM MM MM ~  ~  MM ~")
       .sprites("~  ~  MM MM .  .  #- ,  ,  ,  ,  O  O  ,  -# MM MM MM ~  ~  ~")
       .sprites("~  MM MM .  .  #- ,  ,  O  $  O  $  ,  O  ,  -- -# MM ~  ~  ~")
       .sprites("MM MM MM .  .  #| ,  ,  ,  O  $  O  ,  ,  ,  ,  |# MM MM ~  ~")
       .sprites("MM MM MM .  .  #| ,  ,  O  ,  ,  ,  O  O  O  ,  |# MM MM MM ~")
       .sprites("MM MM MM MM .  #_ ,  ,  ,  O  O  ,  O  ,  ,  ,  |# MM MM MM ~")
       .sprites("~  ~  MM MM .  WW #_ ,  ,  ,  ,  O  ,  ,  ,  ,  _# MM MM MM MM")
       .sprites("~  ~  ~  MM .  .  WW #_ ,  ,  ,  ,  ,  ,  ,  |# WW MM ~  ~  MM")
       .sprites("~  ~  ~  MM MM .  .  WW #| ,  ,  ,  ,  ,  ,  |# MM MM ~  MM MM")
       .sprites("~  ~  ~  ~  MM MM .  .  #_ ,  ,  ,  ,  ,  ,  |# MM ~  ~  ~  ~")
       .sprites("~  ~  ~  MM MM MM MM .  WW #_ __ __ __ __ __ _# MM MM ~  ~  ~")
       .sprites("~  ~  ~  MM MM MM MM .  .  WW WW WW WW WW [] WW MM MM ~  ~  ~")
       .sprites("~  ~  ~  MM ~  ~  MM MM .  .  .  .  .  .  .  MM MM ~  ~  MM ~")
       .sprites("~  ~  ~  MM ~  ~  MM MM MM MM MM MM MM MM MM MM MM MM MM MM ~")
       .sprites("~  ~  ~  ~  ~  ~  MM MM ~  ~  ~  MM MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.ICE_CAVE_B3A).tileMapping(tiles).battleEverywhere()
       .sprites("~  MM MM ~  MM MM MM ~  ~  ~")
       .sprites("~  ~  MM MM MM ~  ~  ~  ~  ~")
       .sprites("MM MM MM ^  MM MM MM ~  ~  ~")
       .sprites("MM ~  MM .  .  .  MM MM ~  ~")
       .sprites("~  ~  MM .  MM ^  MM MM MM MM")
       .sprites("~  ~  MM MM MM MM MM MM ~  MM")
       .sprites("~  ~  ~  MM ~  ~  ~  MM ~  ~")
       .sprites("~  ~  MM MM ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.ICE_CAVE_B3B).tileMapping(tiles).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -# MM ~  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  MM #| ,  |# MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  MM MM #_ __ _# MM MM ~  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  MM WW [] WW MM ~  ~  MM ~  ~  ~  MM MM ~  ~  MM MM MM ~  ~  ~  ~  ~  ~")
       .sprites("#- -- -- -# ~  ~  ~  ~  MM .  .  .  .  MM MM ~  MM MM MM ~  ~  MM ~  MM .  .  MM ~  ~  ~  ~  ~  ~")
       .sprites("#| $  $  |# ~  MM MM ~  ~  MM MM MM .  .  MM MM MM MM MM ~  MM MM ~  MM MM .  MM ~  ~  ~  ~  ~  ~")
       .sprites("#_ __ __ _# ~  ~  MM ~  MM MM .  .  .  .  .  .  MM MM ~  ~  MM ~  MM MM MM .  MM ~  ~  ~  ~  ~  ~")
       .sprites("WW WW [] WW ~  MM MM MM MM MM .  .  .  .  .  .  MM MM MM MM MM ~  ~  ~  MM .  MM MM ~  MM ~  ~  ~")
       .sprites("~  MM .  MM ~  MM !  !  !  !  .  .  .  .  .  .  .  .  .  MM MM MM ~  ~  MM .  MM MM ~  MM ~  ~  ~")
       .sprites("~  MM !  MM MM MM !  !  !  !  .  .  .  .  .  .  .  .  .  .  MM MM ~  MM .  .  MM MM MM MM ~  ~  ~")
       .sprites("~  MM !  MM MM MM !  !  MM MM MM MM .  .  .  .  .  .  .  .  MM MM MM .  .  .  MM MM ~  ~  ~  ~  ~")
       .sprites("~  MM !  !  !  !  !  MM MM ~  ~  ~  MM .  .  MM MM MM MM !  !  !  .  .  .  .  MM ~  ~  ~  ~  ~  ~")
       .sprites("MM MM MM MM MM !  !  MM ~  ~  ~  ~  MM .  .  MM ~  ~  MM !  !  !  .  .  .  MM MM ~  ~  ~  ~  ~  ~")
       .sprites("MM ~  ~  ~  MM MM MM MM ~  ~  MM MM !  !  MM MM ~  ~  MM !  !  !  .  .  MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  MM MM MM ~  MM MM MM ~  MM !  !  !  MM MM MM ~  ~  MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  MM .  .  MM MM ~  ~  ~  ~  MM !  !  !  !  !  !  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  MM .  .  .  MM ~  ~  MM MM .  .  MM MM MM .  .  .  .  MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  MM ~  ~")
       .sprites("~  MM .  .  .  MM ~  ~  MM .  .  .  MM ~  MM .  .  .  .  .  MM MM ~  ~  MM MM MM MM ~  MM MM ~  ~")
       .sprites("~  MM .  .  MM MM ~  ~  MM .  .  .  MM ~  MM .  .  .  .  .  .  MM ~  ~  MM .  .  MM ~  ~  MM ~  ~")
       .sprites("~  MM .  .  MM ~  ~  ~  ~  MM MM MM ~  MM MM MM .  .  .  .  MM MM ~  MM !  !  !  MM MM MM MM ~  ~")
       .sprites("~  MM MM .  MM ~  ~  ~  ~  MM MM MM MM MM !  .  .  .  .  .  MM MM MM !  !  !  MM MM MM ~  ~  ~  ~")
       .sprites("MM MM MM .  .  MM ~  ~  ~  MM !  !  !  !  !  .  .  .  .  .  .  !  !  !  !  MM MM MM MM ~  ~  ~  ~")
       .sprites("MM MM MM .  .  MM ~  ~  MM MM !  !  !  MM MM MM .  MM MM .  MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  MM .  .  .  MM MM MM !  !  !  !  MM ~  MM MM .  MM .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  MM MM MM .  !  !  !  .  .  !  !  MM ~  MM MM .  MM .  MM MM MM ~  ~  MM MM MM MM ~  ~  ~  ~  ~")
       .sprites("MM MM ~  MM .  .  .  .  !  MM MM MM MM ~  MM MM .  MM MM MM ~  MM ~  MM .  .  .  MM ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  MM .  .  .  !  MM MM ~  ~  ~  ~  ~  MM .  .  .  MM ~  ~  MM MM .  .  .  MM MM MM ~  ~  ~")
       .sprites("~  ~  MM .  .  .  .  .  MM ~  ~  MM MM ~  ~  MM MM .  .  MM ~  ~  ~  ~  MM .  .  MM MM MM MM MM MM")
       .sprites("~  MM .  .  .  .  .  .  MM MM ~  MM ~  ~  ~  MM MM .  .  MM MM MM MM ~  MM .  .  .  .  .  .  ^  MM")
       .sprites("~  ~  MM .  .  .  .  .  .  MM MM MM ~  MM MM MM .  .  .  .  .  .  MM ~  MM .  .  .  MM MM MM MM MM")
       .sprites("~  ~  MM MM MM MM MM .  .  .  .  MM ~  MM .  .  .  MM MM .  .  .  MM ~  ~  MM .  .  MM ~  MM ~  ~")
       .sprites("~  ~  MM MM MM ~  MM MM .  .  .  MM ~  MM .  .  .  MM ~  MM .  .  MM ~  ~  MM MM .  .  MM MM MM ~")
       .sprites("~  ~  ~  MM ~  MM ~  MM MM MM MM MM ~  MM MM .  MM MM ~  MM MM .  MM ~  ~  MM MM .  .  .  MM MM ~")
       .sprites("~  ~  MM ~  MM MM MM ~  ~  ~  ~  ~  ~  ~  MM .  MM ~  ~  MM MM .  MM ~  ~  MM MM .  .  .  MM MM ~")
       .sprites("~  ~  ~  MM ~  ~  MM MM MM MM MM MM MM MM .  .  MM ~  ~  MM MM .  MM MM MM .  .  .  .  .  MM MM ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  MM #- -- -- -- -- -# .  MM ~  MM MM .  .  .  .  .  .  .  .  .  MM ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  MM #| ,  $  $  $  |# .  MM ~  MM MM .  .  .  .  .  .  .  MM MM MM ~  ~  MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  MM MM #| ,  ,  ,  ,  |# .  MM ~  ~  MM MM .  .  .  MM MM MM MM ~  MM ~  ~  MM")
       .sprites("~  ~  ~  ~  ~  ~  ~  MM MM #| ,  $  $  $  |# .  MM MM MM MM MM MM MM MM MM ~  ~  ~  ~  ~  MM MM ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  MM MM #_ __ __ __ __ _# .  MM MM ~  ~  ~  MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  MM MM MM MM WW [] WW WW WW WW .  MM MM ~  ~  ~  ~  MM MM MM MM ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  MM ~  ~  MM .  .  .  .  .  .  .  MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  MM MM MM MM ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");
  };

  return {
    init: init
  };
});