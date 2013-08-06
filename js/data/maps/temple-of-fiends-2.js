define(/* TempleOfFiends2MapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var grassTile = Map.newTile({y:0, x:0}).desc("grass");
  var grassFillerTile = Map.newTile({y:0, x:0}).desc("grass").isFiller();
  var skyTile = Map.newTile({y:0, x:0}).desc("sky");
  var skyFillerTile = Map.newTile({y:0, x:0}).desc("sky").isFiller();
  var emptyTile = Map.newTile({y:0, x:0}).desc("nothing");
  var emptyFillerTile = Map.newTile({y:0, x:0}).desc("nothing").isFiller();

  var tiles = {
    "." : Map.newTile({y:1, x:1}).desc("path").inside({y:4, x:1}).passableBy(Transport.Foot),
    "W+": Map.newTile({y:0, x:0}).desc("wall top left").inside({y:3, x:0}),
    "WW": Map.newTile({y:0, x:1}).desc("wall").inside({y:3, x:1}),
    "+W": Map.newTile({y:0, x:2}).desc("wall top right").inside({y:3, x:2}),
    "W|": Map.newTile({y:1, x:0}).desc("wall left").inside({y:4, x:0}),
    "|W": Map.newTile({y:1, x:2}).desc("wall right").inside({y:4, x:2}),
    "I" : Map.newTile({y:2, x:0}).desc("pillar").inside({y:5, x:0}),
    "++": Map.newTile({y:1, x:1}).desc("square block").inside({y:4, x:1}),
    "^" : Map.newTile({y:2, x:1}).desc("stairs up").inside({y:5, x:1}).passableBy(Transport.Foot),
    "v" : Map.newTile({y:2, x:1}).desc("stairs down").inside({y:5, x:1}).passableBy(Transport.Foot),
    "#^": Map.newTile({y:2, x:1}).desc("ladder up").inside({y:5, x:1}).passableBy(Transport.Foot),
    "[]": Map.newTile({y:2, x:2}).desc("door").inside({y:5, x:2}).passableBy(Transport.Foot),
    "#-": Map.newTile({y:0, x:3}).desc("room wall top left").inside({y:3, x:3}),
    "--": Map.newTile({y:0, x:4}).desc("room wall top ").inside({y:3, x:4}),
    "-#": Map.newTile({y:0, x:5}).desc("room wall top right").inside({y:3, x:5}),
    "#|": Map.newTile({y:1, x:3}).desc("room wall left").inside({y:4, x:3}),
    "," : Map.newTile({y:1, x:4}).desc("room empty").inside({y:4, x:4}).passableBy(Transport.Foot),
    "|#": Map.newTile({y:1, x:5}).desc("room wall right").inside({y:4, x:5}),
    "#_": Map.newTile({y:2, x:3}).desc("room wall bottom left").inside({y:5, x:3}),
    "__": Map.newTile({y:2, x:4}).desc("room wall bottom").inside({y:5, x:4}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:5}).desc("room wall bottom right").inside({y:5, x:5}),
    "$" : Map.newTile({y:1, x:4}).desc("chest").inside({y:6, x:0}).passableBy(Transport.Foot),
    "-{": Map.newTile({y:1, x:4}).desc("snake statue left").inside({y:7, x:0}),
    "}-": Map.newTile({y:1, x:4}).desc("snake statue right").inside({y:7, x:2}),
    "S|": Map.newTile({y:1, x:4}).desc("statue left").inside({y:6, x:2}),
    "|S": Map.newTile({y:1, x:4}).desc("statue right").inside({y:6, x:3}),
    "AA": Map.newTile({y:1, x:1}).desc("tablet")
  };

  var init = function() {
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_1F)
       .tileMapping($.extend({"..": grassFillerTile}, tiles)).battleEverywhere()
       .sprites("W+ WW WW WW WW +W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W+ WW WW WW WW +W")
       .sprites("W| v  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  ^  |W")
       .sprites("W| .  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  WW .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. WW .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  WW WW WW WW WW WW WW WW WW +W .  .  .  .  .  .  .  W+ WW WW WW WW WW WW WW WW WW .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W I  .  .  .  .  .  I  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW W| .  .  |W WW WW WW WW WW WW WW W| .  .  WW WW I  ++ I  WW WW .  .  |W WW WW WW WW WW WW WW W| .  .  |W WW WW WW")
       .sprites(".. .. .. WW W| .  |W .  .  .  .  .  .  .  WW W| .  .  .  .  .  .  .  .  .  |W WW .  .  .  .  .  .  .  W| .  |W WW .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  WW WW WW WW I  ++ I  WW WW WW WW .  .  .  .  .  .  .  .  W| .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  .  WW .  .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  W+ .  .  .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  .  .  +W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W| .  .  .  |W .. .. .. ..")
       .sprites(".. .. .. .. W+ WW W| .  |W .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  W| .  |W WW +W .. .. .. ..")
       .sprites(".. .. .. .. .  I  W| .  |W .  .  .  .  .  .  #- -- -- -- -- -- -- -- -- -- -# .  .  .  .  .  .  W| .  |W I  .  .. .. .. ..")
       .sprites(".. .. .. .. .  .  WW ++ +W .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  WW ++ WW .  .  .. .. .. ..")
       .sprites(".. .. .. .. .  .  I  .  I  .  I  .  I  .  I  #| ,  ,  ,  S| ,  |S ,  ,  ,  |# I  .  I  .  I  .  I  .  I  .  .  .. .. .. ..")
       .sprites(".. .. .. .. .  .  ++ .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  ++ .  .  .  .  .. .. .. ..")
       .sprites(".. .. .. .. .  .  I  .  I  .  I  .  I  .  I  #| ,  ,  ,  S| ,  |S ,  ,  ,  |# I  .  I  .  I  .  I  .  I  .  .  .. .. .. ..")
       .sprites(".. .. .. .. .  .  W+ .  +W .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  W+ .  +W .  .  .. .. .. ..")
       .sprites(".. .. .. .. .  I  W| .  |W .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  W| .  |W I  .  .. .. .. ..")
       .sprites(".. .. .. .. W+ WW .  .  |W .  .  .  .  .  .  #_ __ __ __ __ __ __ __ __ __ _# .  .  .  .  .  .  W| .  .  WW +W .. .. .. ..")
       .sprites(".. .. .. .. W| .  .  |W WW .  .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  .  W| .  .  .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W WW .  .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  WW W| .  .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW W| .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  .  .  W| .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W| .  |W .. .. .. ..")
       .sprites(".. .. .. .. W| .  |W .  .  .  .  .  .  .  .  W+ WW WW WW I  .  I  WW WW WW +W .  .  .  .  .  .  .  .  W| .  |W .. .. .. ..")
       .sprites(".. .. .. W+ .  .  |W .  .  .  .  .  .  .  W+ .  .  .  .  .  .  .  .  .  .  .  +W .  .  .  .  .  .  .  W| .  .  +W .. .. ..")
       .sprites("W+ WW WW .  .  .  .  WW WW WW WW WW WW WW .  .  |W WW WW I  ++ I  WW WW W| .  .  WW WW WW WW WW WW WW .  .  .  .  WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W I  .  .  .  .  .  I  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. WW W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  .  |W")
       .sprites("W| v  .  .  .  |W .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. W| .  .  .  ^  |W")
       .sprites("WW WW WW WW WW WW .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. WW WW WW WW WW WW");

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_2F)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere()
       .sprites("W+ WW WW WW WW +W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W+ WW WW WW WW +W")
       .sprites("W| .  v  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  +W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W+ .  +W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W+ .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW W| .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  |W WW WW WW")
       .sprites("~~ ~~ ~~ WW W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W WW ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  #- -- -- -- -- -- -- -# .  .  .  I  .  I  .  .  .  #- -- -- -- -- -- -- -# .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  I  .  I  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  #_ __ __ __ __ __ __ _# .  .  .  I  .  I  .  .  .  #_ __ __ __ __ __ __ _# .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  WW WW WW [] WW WW WW W+ WW WW WW WW WW WW WW WW WW +W WW WW WW [] WW WW WW .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  .  .  .  .  .  .  .  W| v  .  .  .  .  .  .  .  ^  |W .  .  .  .  .  .  .  .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ W+ .  .  .  .  I  .  I  .  I  .  I  W| .  .  .  .  .  .  .  .  .  |W I  .  I  .  I  .  I  .  .  .  .  +W ~~ ~~ ~~")
       .sprites("~~ ~~ W+ .  .  .  .  .  .  .  .  .  .  .  .  W| .  .  #- -- -- -- -# .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  +W ~~ ~~")
       .sprites("~~ ~~ W| .  .  .  .  .  .  .  .  .  .  .  .  W| .  .  #| ,  #^ ,  |# .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  |W ~~ ~~")
       .sprites("~~ ~~ WW .  .  .  .  .  .  .  .  .  .  .  .  W| .  .  #_ __ __ __ _# .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  WW ~~ ~~")
       .sprites("~~ ~~ ~~ W+ .  .  .  .  I  .  I  .  I  .  I  W| .  .  WW +W [] W+ WW .  .  |W I  .  I  .  I  .  I  .  .  .  .  +W ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  .  .  .  .  .  .  .  W| .  .  .  |W .  W| .  .  .  |W .  .  .  .  .  .  .  .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  #- -- -- -- -- -- -- -# WW WW WW WW .  WW WW WW WW #- -- -- -- -- -- -- -# .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  I  .  I  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  #| ,  ,  ,  ,  ,  ,  |# .  .  .  I  .  I  .  .  .  #| ,  ,  ,  ,  ,  ,  |# .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  #_ __ __ __ __ __ __ _# .  .  .  .  .  .  .  .  .  #_ __ __ __ __ __ __ _# .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  WW WW WW [] WW WW WW WW .  .  .  I  .  I  .  .  .  WW WW WW WW [] WW WW WW .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ W+ .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  +W ~~ ~~ ~~")
       .sprites("W+ WW WW .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW +W .  .  .  W+ WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ +W .  W+ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW WW WW WW WW WW");

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_3F)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere()
       .sprites("W+ WW WW WW WW +W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W+ WW WW WW WW +W")
       .sprites("W| v  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  +W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W+ .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW W| .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  |W WW WW WW")
       .sprites("~~ ~~ ~~ WW W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W WW ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  W+ WW WW WW WW WW WW +W .  .  .  I  .  I  .  .  .  W+ WW WW WW WW WW WW +W .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  W| .  .  .  .  .  .  |W .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  W| .  .  .  .  .  .  |W .  .  .  I  .  I  .  .  .  W| .  .  .  .  .  .  |W .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  W| .  .  .  .  .  .  |W .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  W| .  .  .  .  .  .  |W .  .  .  I  .  I  .  .  .  W| .  .  .  .  .  .  |W .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  WW WW WW .  WW WW WW #- -- -- -- -- -- -- -- -- -- -# WW WW WW .  WW WW WW .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  .  .  .  .  .  .  .  #| ,  $  ,  ,  ** ,  ,  $  ,  |# .  .  .  .  .  .  .  .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  I  .  I  .  I  .  I  #| ,  ,  ,  -{ #v }- ,  ,  ,  |# I  .  I  .  I  .  I  .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  .  .  .  .  .  .  .  #| ,  ,  S| ,  ,  ,  |S ,  ,  |# .  .  .  .  .  .  .  .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  S| ,  |S ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  S| ,  |S ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  I  .  I  .  I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  .  I  .  I  .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  .  .  .  .  .  .  .  #_ __ __ __ __ __ __ __ __ __ _# .  .  .  .  .  .  .  .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  W+ WW WW WW WW WW WW +W WW WW WW WW [] WW WW WW WW W+ WW WW WW WW WW WW +W .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  W| .  .  .  .  .  .  |W .  .  .  I  .  I  .  .  .  W| .  .  .  .  .  .  |W .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  W| .  .  .  .  .  .  |W .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  W| .  .  .  .  .  .  |W .  .  .  I  .  I  .  .  .  W| .  .  .  .  .  .  |W .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  .  .  W| .  .  .  .  .  .  |W .  .  .  .  .  .  .  .  .  W| .  .  .  .  .  .  |W .  .  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  WW WW WW .  WW WW WW WW .  .  .  I  .  I  .  .  .  WW WW WW WW .  WW WW WW .  I  .  |W ~~ ~~ ~~ ~~")
       .sprites("~~ ~~ ~~ W+ .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  +W ~~ ~~ ~~")
       .sprites("W+ WW WW .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  I  .  I  .  I  .  I  .  I  .  I  .  I  .  .  .  WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("W| .  .  .  .  |W ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ ~~ WW WW WW WW WW WW");


    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B1)
       .tileMapping($.extend({"..": grassTile, "~": emptyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B2)
       .tileMapping($.extend({"~~": skyTile, "~": emptyFillerTile}, tiles)).battleEverywhere()
       .sprites("#- -- -- -- -- -- -- -- -- -- -- -- -- -# WW WW #- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W+ WW +W ,  ,  ,  W+ WW +W ,  ,  |W .  .  #| ,  ,  W+ WW +W ,  ,  ,  W+ WW +W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  ,  -- -- ,  ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  ,  ,  ,  ,  ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  -- -- -- ,  ,  ,  -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- ,  ,  ,  -- -- -- ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W+ WW +W ,  ,  ,  W+ WW +W ,  ,  ,  __ __ ,  ,  ,  W+ WW +W ,  ,  ,  W+ WW +W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  |# WW WW #| ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  |# .  .  #| ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  WW WW WW S| ,  |S WW WW WW ,  ,  |# .  .  #| ,  ,  WW WW WW S| ,  |S WW WW WW ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#_ __ __ __ __ -{ ,  }- __ __ __ __ __ _# .  .  #_ __ __ __ __ __ -{ ,  }- __ __ __ __ _# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")")
       .sprites("W+ WW WW WW WW WW [] WW WW WW WW WW WW WW .  .  WW WW WW WW WW WW WW [] WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  I  .  .  I  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  I  .  .  .  .  I  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W+ WW WW WW WW WW WW .  +W W+ WW WW WW WW WW WW WW +W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  I  .  I  .  I  .  .  #- -- -# W+ WW +W W+ WW +W #- -- -# .  .  I  .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  W| ,  |W W| ^  |W W| v  |W #| ,  |# .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  W_ __ _W W| .  |W W| .  |W #_ __ _# .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  I  .  I  .  I  .  .  WW WW WW WW .  +W W+ .  WW WW WW WW .  .  I  .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW .  WW WW WW WW WW WW WW .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  I  .  .  .  .  I  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  I  .  .  I  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#- -- -- -- -- -- -- -- -- -- -- -- -- -# .  .  #- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  AA $  AA ,  ,  ,  S| |# .  .  #| |S ,  ,  ,  AA $  AA ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  __ __ _# .  .  #_ __ __ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W+ +W ,  ,  W+ +W ,  ,  W+ +W ,  W+ [] WW .  .  WW [] +W ,  W+ +W ,  ,  W+ +W ,  ,  W+ +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| |W ,  ,  W| |W ,  ,  W| |W ,  W| .  .  .  .  .  .  |W ,  W| |W ,  ,  W| |W ,  ,  W| |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #- -- -- -- -#")
       .sprites("W| |W ,  ,  W| |W ,  ,  W| |W ,  -- -- -- -# #- -- -- -- ,  W| |W ,  ,  W| |W ,  ,  W| |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  #| -{ $  }- |#")
       .sprites("#- -- ,  ,  -- -- ,  ,  -- -- ,  ,  ,  ,  |# #| ,  ,  ,  ,  -- -- ,  ,  -- -- ,  ,  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  #| ,  ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  #_ __ ,  __ _#")
       .sprites("W+ [] +W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W+ WW [] WW WW WW WW WW WW WW WW WW [] WW +W")
       .sprites("W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW")
 .repeatSprites("W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~", 6)
       .sprites("W| .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  |W WW WW WW WW WW W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ ~~ ~~ ~~ ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ #- -- -# ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ #| $  |# ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ #_ __ _# ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ #| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ WW WW WW WW W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ ~~ ~~ ~~ ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW WW WW WW WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B3)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B4)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B5)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere();

  };

  return { init: init };
});