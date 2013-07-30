define(/* CastleMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var mapOptions = function(opt) {
    return $.extend({
      exitOnOutOfBounds: true
    }, opt);
  };

  var Transport = MovementConstants.Transportation;
  var tiles = {
    "." : Map.newTile({y:0, x:4}).desc("road").passableBy(Transport.Foot),
    "WW": Map.newTile({y:1, x:4}).desc("wall"),
    "W+": Map.newTile({y:1, x:3}).desc("wall top left"),
    "+W": Map.newTile({y:1, x:5}).desc("wall top right"),
    "W|": Map.newTile({y:0, x:3}).desc("wall left"),
    "|W": Map.newTile({y:0, x:5}).desc("wall right"),
    "I" : Map.newTile({y:2, x:4}).desc("pillar"),
    "IT": Map.newTile({y:2, x:4}).desc("pillar transport").passableBy(Transport.Foot),
    "^" : Map.newTile({y:2, x:5}).desc("stairs up").passableBy(Transport.Foot),
    "v" : Map.newTile({y:3, x:5}).desc("stairs down").passableBy(Transport.Foot),
    "[]": Map.newTile({y:3, x:3}).desc("door").inside({y:3, x:4}).passableBy(Transport.Foot),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}).passableBy(Transport.Foot),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:5, x:4}).passableBy(Transport.Foot),
    "T-": Map.newTile({y:1, x:1}).desc("throne top left").inside({y:6, x:0}),
    "TT": Map.newTile({y:1, x:1}).desc("throne top").inside({y:6, x:1}),
    "-T": Map.newTile({y:1, x:1}).desc("throne top right").inside({y:6, x:2}),
    "T|": Map.newTile({y:1, x:1}).desc("throne bottom left").inside({y:7, x:0}),
    "tt": Map.newTile({y:1, x:1}).desc("throne bottom").inside({y:7, x:1}),
    "|T": Map.newTile({y:1, x:1}).desc("throne bottom right").inside({y:7, x:2}),
    "==": Map.newTile({y:1, x:1}).desc("bed top").inside({y:6, x:5}),
    "HH": Map.newTile({y:1, x:1}).desc("bed bottom").inside({y:7, x:5}),
    "FP": Map.newTile({y:1, x:1}).desc("fireplace").inside({y:4, x:4}),
    "s-": Map.newTile({y:1, x:1}).desc("stool left").inside({y:5, x:5}),
    "-s": Map.newTile({y:1, x:1}).desc("stool right").inside({y:5, x:3}),
    "T^": Map.newTile({y:1, x:1}).desc("table top").inside({y:6, x:3}),
    "Tv": Map.newTile({y:1, x:1}).desc("table bottom").inside({y:7, x:3}),
    "{" : Map.newTile({y:1, x:1}).desc("statue left").inside({y:4, x:5}),
    "}" : Map.newTile({y:1, x:1}).desc("statue right").inside({y:4, x:3})
  };

  var grassFillerTiles = $.extend({"..": Map.newTile({y:6, x:4}).desc("grass").passableBy(Transport.Foot).isFiller()}, tiles);
  var skyFillerTiles = $.extend({"~" : Map.newTile({y:7, x:4}).desc("sky").isFiller()}, tiles);

  var init = function() {

    Map.create(MapConstants.CONERIA_CASTLE, {start:{y:28, x:14}, exitOnOutOfBounds:true}).tileMapping(grassFillerTiles)
       .sprites("W+ WW WW WW WW WW WW WW WW WW WW WW WW +W .. W+ WW WW WW WW WW WW WW WW WW WW WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  W+ WW WW WW +W .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. W+ WW WW WW +W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW WW WW .  .  .  WW WW WW WW WW WW .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW +W #- -- -- -- -# #- -- -- -- -# W| .  .  .  |W .  |W")
       .sprites("W| .  WW W+ .  +W WW .  .  .  .  |W #| $  $  $  |# #| $  $  $  |# WW WW .  +W WW .  |W")
       .sprites("W| .  .. W| .  |W .  .  WW WW WW +W #| ,  ,  ,  |# #| ,  ,  ,  |# .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W #_ __ __ __ _# #_ __ __ __ _# .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W WW WW [] WW WW WW WW [] WW WW .  I  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  I  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  |W .  .  .  .  .  .  .  .  ^  .  .  .  .  .  .  .  WW WW WW +W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #- -- -- -- -# .  I  .  .  .  I  .  #- -- -- -- -# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| }  FP {  |# .  .  .  .  .  .  .  #| }  FP {  |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  == ,  |# .  I  .  .  .  I  .  #| -s T^ s- |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  HH -s |# .  .  .  .  .  .  .  #| -s Tv s- |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #| ,  ,  -s |# .  I  .  .  .  I  .  #| ,  ,  ,  |# .  .  |W .. .  |W")
       .sprites("W| .  .. W| .  .  #_ __ __ __ _# .  .  .  .  .  .  .  #_ __ __ __ _# .  .  |W .. .  |W")
       .sprites("W| .  W+ WW WW .  WW WW [] WW +W .  I  .  .  .  I  .  WW WW [] WW WW .  .  .  +W .  |W")
       .sprites("W| .  W| .  .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W WW WW WW WW WW .  .  .  .  .  WW WW WW WW WW W| .  .  .  |W .  |W")
       .sprites("W| .  W| .  .  .  |W .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. W| .  .  .  |W .  |W")
       .sprites("W| .  WW WW WW WW WW .. .. .. .. .. .  .  .  .  .  .. .. .. .. .. WW WW WW WW WW .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. WW WW .  WW WW .. .. .. .. .. .. .. .. .. .. .. .");

    Map.create(MapConstants.CONERIA_CASTLE_2F, {start:{y:16, x:13}}).tileMapping(skyFillerTiles)
       .sprites("~  ~  ~  ~  ~  ~  #- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  T- TT -T ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #| ,  ,  }  }  T| tt |T {  {  ,  ,  |# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  #_ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  __ _# ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  WW WW #| ,  ,  ,  ,  ,  ,  ,  |# WW WW ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  #_ __ __ __ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  WW W+ WW WW [] WW WW +W WW ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| I  .  I  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  W| .  .  .  |W ~  ~  ~  ~  W+ WW WW WW WW +W")
       .sprites("W| .  .  .  .  .  WW WW WW WW .  .  .  .  .  WW WW WW WW .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");



    Map.create(MapConstants.ELF_CASTLE, {exitOnOutOfBounds:true}).tileMapping(grassFillerTiles)
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .  .  .  .  ..")
       .sprites("W+ WW WW WW +W .. .. .. .. .. .. .. W+ WW WW WW +W .. .. .  #- -- -- -- -- -# .")
       .sprites("W| .  .  .  .  WW WW WW WW WW WW WW .  .  .  .  |W .. .  .  #| $  $  $  $  |# .")
       .sprites("W| .  I  .  .  .  .  .  .  .  .  .  .  .  I  .  |W .. .  .  #_ __ __ __ __ _# .")
       .sprites("W| .  .  .  |W #- -- -- -- -- -- -# W| .  .  .  |W .. .  .  WW [] WW WW WW WW .")
       .sprites("WW W+ .  +W #- ,  ,  }  FP {  ,  ,  -# W+ .  +W WW .. .. .  .  .  .  .  .  .  ..")
       .sprites(".. W| .  |W #| ,  ,  ,  == -s ,  ,  |# W| .  |W .. .. .. .. .  .  .  .  .  .. ..")
       .sprites(".. W| .  |W #| ,  ,  ,  HH ,  ,  ,  |# W| .  |W .. .. .. .. .. .. .. .. .. .. ..")
       .sprites(".. W| .  |W #| ,  ,  ,  ,  ,  ,  ,  |# W| .  |W .. .. .. .. .. W+ WW WW WW +W ..")
       .sprites(".. W| .  |W #| }  ,  ,  ,  ,  ,  {  |# W+ .  WW WW WW WW WW WW .  .  .  .  |W ..")
       .sprites(".. W| .  |W #_ __ __ __ __ __ __ __ _# W| .  .  .  .  .  .  .  .  .  I  .  |W ..")
       .sprites(".. W| .  |W WW WW WW WW [] WW WW WW +W WW WW WW WW WW WW .  WW W| .  .  .  |W ..")
       .sprites(".. W| .  |W .  .  .  I  .  I  .  .  |W .. .. .. .. .. .. .. .. WW W+ .  +W WW ..")
       .sprites("W+ WW .  WW +W .  .  .  .  .  .  .  |W .. .. .. .. .. .. .. .. .. W| .  |W .. ..")
       .sprites("W| .  .  .  .  WW .  WW W| .  .  WW WW WW WW WW WW WW WW WW WW WW .  .  |W .. ..")
       .sprites("W| .  I  .  .  .  .  .  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. ..")
       .sprites("W| .  .  .  |W WW WW WW W| .  |W WW WW WW +W .  .  .  W+ WW WW WW W| .  |W .. ..")
       .sprites("WW WW .  WW WW .. .. .. W| .  |W .  .  .  |W .  .  .  W| .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .  .  .  |W .  .  .  W| .  .  .  W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W WW WW WW WW .  .  .  WW WW WW WW W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. .. .  .  .  .. .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. I  .  .  .  I  .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. I  .  .  .  .  .  I  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .  .  .  .  .  .  .  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. I  .  .  .  .  .  I  .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. .. W| .  |W .. .. .. I  .  .  .  I  .. .. .. W| .  |W .. ..")
       .sprites(".. .. .. .. .. .. .. W+ WW .  WW +W .. .. .. .  .  .  .. .. .. W+ .  .  .  +W ..")
       .sprites(".. .. .. .. .. .. .. W| .  .  .  .  WW WW .. .  .  .  .. WW WW .  .  .  .  |W ..")
       .sprites(".. .. .. .. .. .. .. W| .  I  .  .  .  .  .. .  .  .  .. .  .  .  .  I  .  |W ..")
       .sprites(".. .. .. .. .. .. .. W| .  .  .  |W WW WW .. .  .  .  .. WW WW W| .  .  .  |W ..")
       .sprites(".. .. .. .. .. .. .. WW WW WW WW WW .. .. .. .  .  .  .. .. .. WW WW WW WW WW ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .  .  .  .. .. .. .. .. .. .. .. ..");

    Map.create(MapConstants.ASTOS_CASTLE, {exitOnOutOfBounds:true}).tileMapping(grassFillerTiles).battleEverywhere()
       .sprites(".. .. W+ WW +W .. .. W+ WW WW WW WW WW W+ WW WW WW +W .. .. .. .. .. .. .. .. W+ WW +W .. ..")
       .sprites(".. W+ .  .  .  +W .. W| .  .  .  .  .  .  .  .  .  |W WW WW WW +W .. .. .. W+ .  .  .  +W ..")
       .sprites("W+ .  .  .  .  .  WW W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW WW .  .  .  .  .  +W")
       .sprites("W| .  .. .. .  .  .  W| .  .  .  .  .  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW .. .. .  .  .  .  W| .  .  .  .  .  #- -- -- -- -# .  .  .  |W .  WW WW W| .  .  .  |W WW")
       .sprites(".. .. .  .  |W WW .  +W .  #- -- -- -- ,  T- TT -T ,  -- -- -- -# .. .. .. WW W| .  |W WW ..")
       .sprites(".. .. W+ .  +W .  .  |W .. #_ ,  ,  ,  }  T| tt |T {  ,  ,  ,  _# .. .. .. .. W+ .  +W .. ..")
       .sprites(".. .. W| .  .  .  .  |W .. WW #_ ,  }  ,  ,  ,  ,  ,  {  ,  _# WW WW WW WW .  W| .  |W .. ..")
       .sprites(".. .. .  .  .  .  .  |W .. .. WW #_ ,  }  ,  ,  ,  {  ,  _# +W .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W .  .  |W .. .. .. WW #_ ,  }  ,  {  ,  _# WW |W .  I  .  I  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W WW .  WW .. .. .. .. WW #_ __ __ __ _# WW .  .  .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. W| .  |W .  .  .  .  .  .  .  .  WW W+ [] +W WW .  .  |W .  I  .  I  .  .  .  .  .. ..")
       .sprites(".. .. W| .  |W .  .  #- -- -- -- -# .  .  W| .  |W .  .  .  |W .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. .. .  |W .  #- $  ,  ,  ,  $  -# .  W| .  |W WW .  WW +W .  I  .  I  .  W| .  .  .. ..")
       .sprites(".. .. .. .. |W .  #| ,  ,  $  ,  ,  |# .  W| .  |W .  .  .  |W .  .  .  .  .  W| .  |W .. ..")
       .sprites(".. .. W| .  |W .  #_ ,  ,  ,  ,  ,  _# .  W| .  .  .  .  .  |W .  I  .  I  .  .  .  |W .. ..")
       .sprites(".. .. W| .  |W .  WW #_ __ __ __ _# WW .  W| .  .  .  .  .  .  .  .  .  .  .  W| .  .  .. ..")
       .sprites(".. .. W+ .  +W .  .  WW WW [] WW WW .  .  W| .  |W .  .  .  .  .  I  .  I  .  W| .  |W .. ..")
       .sprites(".. W+ .  .  .  +W .  .  .  .  .  .  .  W+ .  .  .  +W .  .  .  .  .  .  .  W+ .  .  .  +W ..")
       .sprites("W+ .  .  .  .  .  +W WW WW .  WW WW W+ .  .  .  .  .  +W .  .  WW WW .  WW .  .  .  .  .  +W")
       .sprites("W| .  .  .  .  .  |W .  .  .  .  .  W| .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW W| .  .  .  |W WW WW .  .  .  WW WW W| .  .  .  |W WW WW W| .  |W WW WW W| .  .  .  |W WW")
       .sprites(".. WW W| .  |W WW .. .. .. .. .. .. .. WW W| .  |W WW .. .. W| .  |W .. .. WW W| .  |W WW ..")
       .sprites(".. .. WW .  WW .. .. .. .. .. .. .. .. .. WW WW WW .. .. .. W| .  |W .. .. .. WW .  WW .. ..")
       .sprites(".. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. WW .  WW .. .. .. .. .. .. .. ..");

    Map.create(MapConstants.CASTLE_ORDEALS_1F, {exitOnOutOfBounds:true}).tileMapping(grassFillerTiles).battleEverywhere()
       .sprites("#- -- -- -- -- -# .. .. .. .. .. .. .. .. .. .. .. .. .. #- -- -- -- -- -#")
       .sprites("#| T- TT -T ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#| T| tt |T ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("#_ __ __ __ __ _# .  .  .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ _#")
       .sprites("WW WW WW W+ [] WW .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW +W WW WW WW")
 .repeatSprites(".. .. .. W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W .. .. ..", 5)
       .sprites(".. .. .. W| .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  I  .  .  .  .  .  I  .  .  .  .  .  |W .. .. ..")
       .sprites(".. .. .. W| .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  |W .. .. ..")
 .repeatSprites(".. .. .. W| .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  |W .. .. ..", 4)
       .sprites("#- -- -- -- -- -# .  .  .  .  .  I  .  I  .  .  .  .  .  #- -- -- -- -- -#")
       .sprites("#| ,  ,  ,  ,  |# .  .  .  .  .  I  .  I  .  .  .  .  .  #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW I  .  I  WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  |# .. .. .. .. .. .. .. .. .. .. .. .. .. #| ,  ,  ,  ,  |#")
       .sprites("#_ __ __ __ __ _# .. .. .. .. .. .. .. .. .. .. .. .. .. #_ __ __ __ __ _#")
       .sprites("WW WW WW WW WW WW .. .. .. .. .. .. .. .. .. .. .. .. .. WW WW WW WW WW WW")

    Map.create(MapConstants.CASTLE_ORDEALS_2F).tileMapping(skyFillerTiles).battleEverywhere()
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -#")
       .sprites("W| IT .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  }  $  {  |#")
       .sprites("W| .  .  IT .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("W| .  .  .  .  |W WW +W WW WW WW WW WW WW WW WW WW WW WW #| ,  ,  ,  ,  |#")
       .sprites("W| .  .  .  .  |W .  |W .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ _#")
       .sprites("WW WW WW W+ WW WW .  |W .  WW WW WW WW WW WW WW WW WW .  WW [] +W WW WW WW")
       .sprites("~  ~  ~  W| .  .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W+ WW W+ WW +W .  .  .  W+ WW WW WW +W .  W+ .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| IT W| IT .  WW WW WW W| .  .  .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  .  .  W| .  IT .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| IT .  .  .  .  W| .  .  .  |W .  W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W+ WW WW WW #- -- -# WW WW .  +W .  W| IT |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  #| ,  |# .  .  .  |W .  WW WW +W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  WW WW #_ ,  _# WW WW WW +W .  .  IT |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  W+ [] WW .  .  .  |W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  IT .  W| .  .  .  .  IT |W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W| .  .  .  W| .  .  .  .  .  |W IT .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| .  W| .  W+ WW WW WW WW WW WW WW WW WW +W .  .  .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  W| I  W| .  W| I  .  .  .  .  .  .  .  .  |W .  .  .  |W ~  ~  ~ ")
       .sprites("W+ WW WW WW WW +W .  WW WW WW WW WW WW WW WW WW WW WW .  W+ WW WW WW WW +W")
       .sprites("W| .  .  .  IT |W .  .  .  .  .  .  .  .  .  .  .  .  .  W| ^  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("W| .  .  .  IT |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");

    Map.create(MapConstants.CASTLE_ORDEALS_3F).tileMapping(skyFillerTiles).battleEverywhere()
       .sprites("#- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -- -#")
       .sprites("#| $  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  $  ,  |#")
       .sprites("#| $  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  ,  |#")
       .sprites("#| $  ,  ,  ,  ,  -- -- -- -- -- -- -- -- -- -- -- -- -- ,  ,  ,  ,  ,  |#")
       .sprites("#_ __ __ ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ _#")
       .sprites("WW WW WW #| ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW W+ [] +W WW WW WW")
 .repeatSprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~  ~  ~ ", 9)
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("~  ~  ~  #| ,  |# ~  ~  ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |# W| .  |W ~  ~  ~ ")
       .sprites("#- -- -- ,  ,  ,  -- -- -- -- -- -- -- -- ,  ,  ,  ,  |# W| .  .  WW WW +W")
       .sprites("#| ,  ,  ,  ,  ,  __ __ __ __ __ __ __ __ __ __ __ __ _# W| .  .  .  .  |W")
       .sprites("#| ,  ,  ,  ,  |# WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  |W")
       .sprites("#| $  $  $  $  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  v  .  |W")
       .sprites("#_ __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");
  };

  return {
    init: init
  };
});