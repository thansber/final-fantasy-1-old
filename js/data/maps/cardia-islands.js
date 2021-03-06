define(/* CardiaIslandsMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var tiles = {
    "~" : Map.newTile({y:4, x:1}).desc("nothing").isFiller(),
    "." : Map.newTile({y:1, x:4}).desc("floor").inside({y:4, x:4}).passableBy(Transport.Foot),
    "C" : Map.newTile({y:1, x:1}).desc("candles").inside({y:3, x:6}).passableBy(Transport.Foot),
    "[]": Map.newTile({y:2, x:3}).desc("door").inside({y:5, x:3}).passableBy(Transport.Foot).roomEntry(),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}).passableBy(Transport.Foot),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:2, x:5}).passableBy(Transport.Foot),
    "P" : Map.newTile({y:1, x:1}).desc("pots").inside({y:2, x:6}),
    "SK": Map.newTile({y:1, x:1}).desc("skull").inside({y:1, x:6}).passableBy(Transport.Foot),
    "WW": Map.newTile({y:0, x:4}).desc("wall").inside({y:3, x:4}),
    "W+": Map.newTile({y:0, x:3}).desc("wall top left").inside({y:3, x:3}),
    "+W": Map.newTile({y:0, x:5}).desc("wall top right").inside({y:3, x:5}),
    "W|": Map.newTile({y:1, x:3}).desc("wall left").inside({y:4, x:3}),
    "|W": Map.newTile({y:1, x:5}).desc("wall right").inside({y:4, x:5}),
    "WL": Map.newTile({y:0, x:6}).desc("well"),
    "^" : Map.newTile({y:2, x:4}).desc("stairs up").passableBy(Transport.Foot),
    "v" : Map.newTile({y:5, x:4}).desc("stairs down").passableBy(Transport.Foot)
  };

  var init = function() {
    Map.create(MapConstants.CARDIA_ISLANDS_MAIN).tileMapping(tiles)
       .sprites("W+ WW WW WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #- -- -- -- -# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #| SK SK $  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #| ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #_ __ __ __ _# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  WW [] WW WW WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W WW WW WW WW WW WW WW WW W| .  .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  ^  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  WW WW WW WW WW +W ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  ^  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #- -- -- -- -- -- -- -- -- -# .  .  .  |W ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  #_ __ ,  ,  SK $  SK SK $  |# .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  WW [] #| ,  ,  ,  ,  ,  ,  _# .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  #_ __ __ __ __ __ _# WW .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  WW WW WW WW WW WW WW .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  ^  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW .  .  #- -- -# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  #- $  $  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W+ W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  #- -- -# .  .  #| ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  #| $  |# .  ^  #| ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  W| .  #| ,  ,  -- -- ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W+ .  .  #| ,  ,  P  P  ,  ,  ,  |# .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW WW WW +W")
       .sprites("~  ~  ~  ~  ~  ~  W+ .  .  .  #_ ,  ,  ,  P  ,  ,  ,  _# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  WW #| ,  ,  ,  ,  ,  |# WW .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  #| ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW W| .  |W ~  ~  ~  W| .  .  .  #- -- -- -- -- -- -- -# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  #_ __ __ __ __ __ _# .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW ~  ~  ~  W| .  .  .  #| ,  ,  ,  SK $  SK |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  WW [] WW WW WW [] WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| ,  ,  ,  SK ,  SK |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  WL .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| ,  ,  ,  ,  $  ,  |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| SK ,  ,  ,  ,  ,  |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  #| ,  $  ,  ,  ,  ,  |# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  #| ,  ,  ,  ,  __ __ _# .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  #| ,  SK ,  |# WW [] WW .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #- -- -- -- -- -- -- -- -# .  .  .  .  .  .  .  .  #| ,  ,  SK |# .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #| $  P  P  ,  $  ,  $  |# .  .  .  .  .  .  .  .  #| ,  ,  SK |# .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #| ,  P  ,  ,  ,  ,  $  |# .  .  .  .  .  .  .  .  #_ __ __ __ _# .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #| ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  WW [] WW WW WW .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #_ __ __ __ __ __ __ __ _# .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  WW WW WW WW [] WW WW WW WW .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  ^  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW");

    Map.create(MapConstants.CARDIA_ISLANDS_BAHAMUT).tileMapping(tiles)
       .sprites("W+ WW WW WW +W")
       .sprites("W| .  .  .  |W")
       .sprites("W| .  ^  .  |W")
       .sprites("W| .  .  .  |W")
       .sprites("WW W| .  |W WW")
 .repeatSprites("~  W| .  |W ~", 46)
       .sprites("W+ .  .  .  +W")
       .sprites("W| .  .  .  |W")
       .sprites("W| .  v  .  |W")
       .sprites("W| .  .  .  |W")
       .sprites("WW WW WW WW WW");

    Map.create(MapConstants.CARDIA_ISLANDS_BAHAMUT_2F).tileMapping(tiles)
       .sprites("#- -- -- -- -- -- -- -- -- -- -#")
       .sprites("#| ,  C  ,  ,  ,  ,  ,  C  ,  |#")
       .sprites("#| ,  C  ,  ,  ,  ,  ,  C  ,  |#")
       .sprites("#| ,  ,  C  ,  ,  ,  C  ,  ,  |#")
       .sprites("#| ,  ,  C  ,  ,  ,  C  ,  ,  |#")
       .sprites("#| ,  C  C  ,  ,  ,  C  C  ,  |#")
       .sprites("#| C  ,  ,  C  ,  C  ,  ,  C  |#")
       .sprites("#| C  C  ,  ,  ,  ,  ,  C  C  |#")
       .sprites("#| ,  C  C  ,  ,  ,  C  C  ,  |#")
       .sprites("#| C  ,  C  ,  ,  ,  C  ,  C  |#")
       .sprites("#| C  ,  ,  C  ,  C  ,  ,  C  |#")
       .sprites("#| C  ,  ,  C  ,  C  ,  ,  C  |#")
       .sprites("#| ,  C  ,  C  ,  C  ,  C  ,  |#")
       .sprites("#| ,  ,  C  C  ,  C  C  ,  ,  |#")
       .sprites("#| ,  ,  C  ,  ,  ,  C  ,  ,  |#")
       .sprites("#| ,  C  C  ,  ,  ,  C  C  ,  |#")
       .sprites("#| ,  C  C  ,  ,  ,  C  C  ,  |#")
       .sprites("#| C  ,  C  ,  ,  ,  C  ,  C  |#")
       .sprites("#| C  ,  C  ,  ,  ,  C  ,  C  |#")
       .sprites("#| C  ,  ,  ,  ,  ,  ,  ,  C  |#")
       .sprites("#| C  ,  ,  ,  ,  ,  ,  ,  C  |#")
       .sprites("#| ,  C  ,  ,  ,  ,  ,  C  ,  |#")
       .sprites("#| ,  C  ,  ,  ,  ,  ,  C  ,  |#")
       .sprites("#| ,  ,  C  ,  ,  ,  C  ,  ,  |#")
 .repeatSprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  |#", 13)
       .sprites("#_ ,  ,  ,  ,  ,  ,  ,  ,  ,  _#")
       .sprites("WW #| ,  ,  ,  ,  ,  ,  ,  |# WW")
       .sprites("~  #| ,  ,  ,  ,  ,  ,  ,  |# ~")
       .sprites("~  #_ ,  ,  ,  ,  ,  ,  ,  _# ~")
       .sprites("~  WW #| ,  ,  ,  ,  ,  |# WW ~")
       .sprites("~  ~  #| ,  ,  ,  ,  ,  |# ~  ~")
       .sprites("~  ~  #| ,  ,  ,  ,  ,  |# ~  ~")
       .sprites("~  ~  #_ ,  ,  ,  ,  ,  _# ~  ~")
       .sprites("~  ~  WW #| ,  ,  ,  |# WW ~  ~")
       .sprites("~  ~  ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  #| ,  ,  ,  |# ~  ~  ~")
       .sprites("~  ~  ~  #_ __ __ __ _# ~  ~  ~")
       .sprites("~  W+ WW WW WW [] WW WW WW +W ~")
       .sprites("~  W| .  .  .  .  .  .  .  |W ~")
       .sprites("~  W| .  .  .  .  .  .  .  |W ~")
       .sprites("~  W| .  .  .  .  .  .  .  |W ~")
       .sprites("~  W| .  .  .  .  .  ^  .  |W ~")
       .sprites("~  WW WW WW WW WW WW WW WW WW ~");
  };

  return {
    init: init
  };

});