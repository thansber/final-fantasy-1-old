define(/* TempleOfFiends2MapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var grassTile = Map.newTile({y:6, x:0}).desc("grass");
  var grassFillerTile = Map.newTile({y:6, x:0}).desc("grass").isFiller();
  var skyTile = Map.newTile({y:6, x:1}).desc("sky");
  var skyFillerTile = Map.newTile({y:6, x:1}).desc("sky").isFiller();
  var emptyTile = Map.newTile({y:4, x:1}).desc("nothing");
  var emptyFillerTile = Map.newTile({y:4, x:1}).desc("nothing").isFiller();

  var tiles = {
    "." : Map.newTile({y:1, x:4}).desc("path").passableBy(Transport.Foot),
    "W+": Map.newTile({y:0, x:3}).desc("wall top left"),
    "WW": Map.newTile({y:0, x:4}).desc("wall"),
    "+W": Map.newTile({y:0, x:5}).desc("wall top right"),
    "W|": Map.newTile({y:1, x:3}).desc("wall left"),
    "|W": Map.newTile({y:1, x:5}).desc("wall right"),
    "I" : Map.newTile({y:2, x:5}).desc("pillar"),
    "++": Map.newTile({y:2, x:4}).desc("square block"),
    "^" : Map.newTile({y:3, x:5}).desc("stairs up").passableBy(Transport.Foot),
    "v" : Map.newTile({y:4, x:5}).desc("stairs down").passableBy(Transport.Foot),
    "#v": Map.newTile({y:1, x:1}).desc("ladder down").inside({y:5, x:5}).passableBy(Transport.Foot),
    "#^": Map.newTile({y:1, x:1}).desc("ladder up").inside({y:6, x:5}).passableBy(Transport.Foot),
    "[]": Map.newTile({y:2, x:3}).desc("door").inside({y:5, x:3}).passableBy(Transport.Foot),
    "#-": Map.newTile({y:0, x:0}).desc("room wall top left").inside({y:3, x:0}),
    "--": Map.newTile({y:0, x:1}).desc("room wall top ").inside({y:3, x:1}),
    "-#": Map.newTile({y:0, x:2}).desc("room wall top right").inside({y:3, x:2}),
    "#|": Map.newTile({y:1, x:0}).desc("room wall left").inside({y:4, x:0}),
    "," : Map.newTile({y:1, x:1}).desc("room empty").inside({y:4, x:1}).passableBy(Transport.Foot),
    "|#": Map.newTile({y:1, x:2}).desc("room wall right").inside({y:4, x:2}),
    "#_": Map.newTile({y:2, x:0}).desc("room wall bottom left").inside({y:5, x:0}),
    "__": Map.newTile({y:2, x:1}).desc("room wall bottom").inside({y:5, x:1}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:2}).desc("room wall bottom right").inside({y:5, x:2}),
    "$" : Map.newTile({y:1, x:1}).desc("chest").inside({y:6, x:3}).passableBy(Transport.Foot),
    "-{": Map.newTile({y:1, x:1}).desc("snake statue left").inside({y:4, x:3}),
    "}-": Map.newTile({y:1, x:1}).desc("snake statue right").inside({y:4, x:4}),
    "S|": Map.newTile({y:1, x:1}).desc("statue left").inside({y:3, x:3}),
    "|S": Map.newTile({y:1, x:1}).desc("statue right").inside({y:3, x:4}),
    "AA": Map.newTile({y:1, x:1}).desc("tablet").inside({y:6, x:2}),
    "*" : Map.newTile({y:1, x:1}).desc("no idea").inside({y:6, x:4}),
    "O" : Map.newTile({y:1, x:1}).desc("orb altar").inside({y:5, x:4}),
    "F%": Map.newTile({y:1, x:1}).desc("fire").inside({y:4, x:1}),
    "A%": Map.newTile({y:1, x:1}).desc("air").inside({y:4, x:1}),
    "E%": Map.newTile({y:1, x:1}).desc("earth").inside({y:4, x:1}),
    "W%": Map.newTile({y:1, x:1}).desc("water").inside({y:4, x:1})
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
       .sprites("~~ ~~ ~~ ~~ W| .  I  .  .  .  .  .  .  .  .  #| ,  $  ,  ,  O  ,  ,  $  ,  |# .  .  .  .  .  .  .  .  I  .  |W ~~ ~~ ~~ ~~")
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
       .tileMapping($.extend({"..": grassTile, "~": emptyFillerTile}, tiles)).battleEverywhere()
       .sprites("W+ WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW +W")
       .sprites("W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W")
       .sprites("W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  |W")
       .sprites("W| .  .  .  .  WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW +W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W+ WW WW")
       .sprites("~  ~  ~  WW W| .  .  #- -- -- -- -- -- -- -- -- -- -# I  .  I  #- -- -- -- -- -- -- -- -- -- -# .  .  |W WW ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| S| ,  S| -{ *  }- |S ,  |S |# .  .  .  #| S| ,  S| -{ *  }- |S ,  |S |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ++ ++ ++ #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .. .. .. #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .. .. .. #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ++ ++ ++ #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# I  .  I  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  #_ __ __ __ __ __ __ __ __ __ _# .  .  .  #_ __ __ __ __ __ __ __ __ __ _# .  .  |W ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  .  W+ WW [] +W WW WW WW WW WW WW WW I  .  I  WW WW WW WW WW WW WW WW [] WW WW .  .  I  I  ~  ~  ~")
       .sprites("W+ WW WW .  .  .  .  W| ^  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  I  I  I  I")
       .sprites("W| .  .  .  .  .  .  W| .  .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  I  .  .  .  .  I")
       .sprites("W| .  .  .  .  .  W+ WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW I  .  .  .  .  I")
       .sprites("W| .  .  .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  I  I  ++ .  ++ I")
       .sprites("W| .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  I  .  v  .  I")
       .sprites("W| .  .  ^  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  I  ++ .  ++ I")
       .sprites("WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  I  I  I  I  I");

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B2)
       .tileMapping($.extend({"~~": skyTile, "~": emptyFillerTile}, tiles)).battleEverywhere()
       .sprites("#- -- -- -- -- -- -- -- -- -- -- -- -- -# WW WW #- -- -- -- -- -- -- -- -- -- -- -- -- -# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W+ WW +W ,  ,  ,  W+ WW +W ,  ,  |# .  .  #| ,  ,  W+ WW +W ,  ,  ,  W+ WW +W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  ,  -- -- ,  ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  ,  ,  ,  ,  ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  -- -- -- ,  ,  ,  -- -- -- ,  ,  ,  ,  ,  ,  ,  ,  -- -- -- ,  ,  ,  -- -- -- ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W+ WW +W ,  ,  ,  W+ WW +W ,  ,  ,  __ __ ,  ,  ,  W+ WW +W ,  ,  ,  W+ WW +W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  |# WW WW #| ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  W| .  |W ,  ,  ,  W| .  |W ,  ,  |# .  .  #| ,  ,  W| .  |W ,  ,  ,  W| .  |W ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  WW WW WW S| ,  |S WW WW WW ,  ,  |# .  .  #| ,  ,  WW WW WW S| ,  |S WW WW WW ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("#| ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  ,  |# .  .  #| ,  ,  ,  ,  ,  -{ ,  }- ,  ,  ,  ,  |# ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W+ WW WW WW WW WW [] WW WW WW WW WW WW WW .  .  WW WW WW WW WW WW WW [] WW WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  I  .  .  I  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  I  .  .  .  .  I  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W+ WW WW WW WW WW WW .  +W W+ WW WW WW WW WW WW WW +W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  W| .  .  .  .  .  .  .  |W W| .  .  .  .  .  .  .  |W .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  I  .  I  .  I  .  .  #- -- -# W+ WW +W W+ WW +W #- -- -# .  .  I  .  I  .  I  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  #| ,  |# W| ^  |W W| v  |W #| ,  |# .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("W| .  .  .  .  .  .  .  .  #_ __ _# W| .  |W W| .  |W #_ __ _# .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
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
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ W+ [] WW WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ W| .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ WW WW WW WW W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  |W ~~ ~~ ~~ ~~ ~~ W| .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  WW WW WW WW WW .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B3)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere()
       .sprites("W+ WW WW #- -- -- -- -- -- -# WW WW WW WW WW WW WW WW WW WW WW #- -- -- -- -- -- -# WW WW +W")
       .sprites("W| ^  .  #| ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  |# .  .  |W")
       .sprites("W| .  .  #_ __ __ __ __ __ _# .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ __ _# .  .  |W")
       .sprites("W| .  .  WW [] WW +W WW [] WW .  .  #- -- -- -- -- -- -# .  .  WW [] WW W+ WW [] WW .  .  |W")
       .sprites("W| .  .  .  .  .  |W .  .  .  .  .  #| S| -{ *  }- |S |# .  .  .  .  .  W| .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  |W .  .  .  .  .  #_ __ __ __ __ __ _# .  .  .  .  .  W| .  .  .  .  .  |W")
       .sprites("#- -- -- -- -- -- -- -- -- -# .  .  WW WW WW [] WW WW WW .  .  #- -- -- -- -- -- -- -- -- -#")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  .  .  .  .  .  .  .  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  |#")
       .sprites("#| ,  ,  __ __ __ __ __ __ _# .  .  .  .  .  .  .  .  .  .  .  #_ __ __ __ __ __ __ ,  ,  |#")
       .sprites("#| ,  |# WW WW WW WW WW [] WW I  .  I  .  I  .  I  .  I  .  I  WW [] WW WW WW WW WW #| ,  |#")
       .sprites("#| ,  |# .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  #| ,  |#")
       .sprites("#| ,  |# .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  #| ,  |#")
       .sprites("#| ,  |# #- -- -- -- -- -- -# .  .  #- -- -- -- -- -- -# .  .  #- -- -- -- -- -- -# #| ,  |#")
       .sprites("#| ,  |# #| ,  ,  ,  ,  ,  |# .  .  #| ,  AA ,  AA ,  |# .  .  #| ,  ,  ,  ,  ,  |# #| ,  |#")
       .sprites("#| ,  |# #| ,  ,  ,  ,  ,  ,  -- -- ,  ,  ,  AA ,  ,  ,  -- -- ,  ,  ,  ,  ,  ,  |# #| ,  |#")
       .sprites("#| ,  |# #| ,  ,  ,  ,  ,  ,  __ __ ,  ,  ,  ,  ,  ,  ,  __ __ ,  ,  ,  ,  ,  ,  |# #| ,  |#")
       .sprites("#| ,  |# #| ,  ,  ,  ,  ,  |# WW WW #| ,  ,  ,  ,  ,  |# WW WW #| ,  ,  ,  ,  ,  |# #| ,  |#")
       .sprites("#| ,  |# #_ __ __ __ __ __ _# .  .  #_ __ __ __ __ __ _# .  .  #_ __ __ __ __ __ _# #| ,  |#")
       .sprites("#| ,  |# WW WW WW [] WW WW WW .  .  WW WW WW [] WW WW WW .  .  WW WW WW [] WW WW WW #| ,  |#")
       .sprites("#| ,  |# .  .  .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  .  .  #| ,  |#")
       .sprites("#| ,  |# .  .  .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  .  .  #| ,  |#")
       .sprites("#| ,  ,  -- -- -- -- -- -- -# .  .  I  .  .  .  .  .  I  .  .  #- -- -- -- -- -- -- ,  ,  |#")
       .sprites("#| ,  ,  ,  ,  ,  ,  ,  ,  |# .  .  I  .  .  .  .  .  I  .  .  #| ,  ,  ,  ,  ,  ,  ,  ,  |#")
       .sprites("#_ __ __ __ __ __ __ __ __ _# .  .  I  .  .  ++ .  .  I  .  .  #_ __ __ __ __ __ __ __ __ _#")
       .sprites("WW WW WW W+ WW WW WW WW [] WW .  .  I  .  .  .  .  .  I  .  .  WW [] WW WW WW WW +W WW WW WW")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  W| .  .  .  .  .  .  .  .  .  I  .  .  .  I  .  .  .  .  .  .  .  .  .  |W ~  ~  ~")
       .sprites("W+ WW WW I  I  I  I  I  I  I  I  I  I  .  .  .  .  .  I  I  I  I  I  I  I  I  I  I  WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW WW WW WW WW WW WW WW .  v  |W")
       .sprites("WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW");

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B4)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere();

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B5)
       .tileMapping($.extend({"~": emptyFillerTile}, tiles)).battleEverywhere()
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  W+ WW WW .  .  .  .  |W .  W| .  .  .  .  WW WW +W ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  W+ WW .  .  .  .  |W WW WW WW .  WW WW WW W| .  .  .  .  WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ .  .  .  |W WW WW WW .  I  .  .  .  I  .  WW WW WW W| .  .  .  +W ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  |W WW WW .  .  .  I  .  .  .  .  .  I  .  .  .  WW WW W| .  .  +W ~  ~  ~")
       .sprites("~  ~  ~  W| .  |W WW .  .  .  .  .  I  .  I  .  I  .  I  .  .  .  .  .  WW W| .  |W ~  ~  ~")
       .sprites("~  ~  W+ .  .  |W .  .  .  .  .  I  .  .  I  ^  I  .  .  I  .  .  .  .  .  W| .  .  +W ~  ~")
       .sprites("~  ~  W| .  |W WW .  .  .  .  .  I  .  I  I  I  I  I  .  I  .  .  .  .  .  WW W| .  |W ~  ~")
       .sprites("~  ~  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W ~  ~")
       .sprites("~  W+ .  .  |W .  .  .  .  .  I  .  I  I  I  I  I  I  I  .  I  .  .  .  .  .  W| .  .  +W ~")
       .sprites("~  W| .  |W WW .  .  .  .  I  .  .  I  #- -- -- -- -# I  .  .  I  .  .  .  .  WW W| .  |W ~")
       .sprites("~  W| .  |W .  .  .  .  .  I  .  I  #- -{ *  *  *  }- -# I  .  I  .  .  .  .  .  W| .  |W ~")
       .sprites("W+ .  .  |W .  .  .  .  I  .  .  I  #| W% ,  ,  ,  A% |# I  .  .  I  .  .  .  .  W| .  .  +W")
       .sprites("W| .  |W WW .  .  .  .  I  .  I  #- ,  ,  S| ,  |S ,  ,  -# I  .  I  .  .  .  .  WW W| .  |W")
       .sprites("W| .  |W .  .  .  .  .  .  .  I  #| ,  ,  ,  AA ,  ,  ,  |# I  .  .  .  .  .  .  .  W| .  |W")
       .sprites("W| .  |W .  .  .  .  I  .  I  .  #| ,  ,  S| ,  |S ,  ,  |# .  I  .  I  .  .  .  .  W| .  |W")
       .sprites("W| .  |W .  .  .  I  .  .  .  I  #_ ,  E% -{ ,  }- F% ,  _# I  .  .  .  I  .  .  .  W| .  |W")
       .sprites("W| .  .  +W .  I  .  .  I  .  .  I  #| ,  -{ ,  }- ,  |# I  .  .  I  .  .  I  .  W+ .  .  |W")
       .sprites("WW W| .  |W .  I  .  I  .  I  .  I  #_ ,  -{ ,  }- ,  _# I  .  I  .  I  .  I  .  W| .  |W WW")
       .sprites("~  W| .  |W I  .  .  I  .  I  .  .  I  #_ __ __ __ _# I  .  .  I  .  I  .  .  I  W| .  |W ~")
       .sprites("~  W| .  .  +W .  I  I  I  I  I  .  I  I  WW [] WW I  I  .  I  I  I  I  I  .  W+ .  .  |W ~")
       .sprites("~  WW W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W WW ~")
       .sprites("~  ~  W| .  |W I  I  I  I  I  I  .  I  I  I  I  I  I  I  .  I  I  I  I  I  I  W| .  |W ~  ~")
       .sprites("~  ~  W| .  .  +W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W+ .  .  |W ~  ~")
       .sprites("~  ~  WW W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W| .  |W WW ~  ~")
       .sprites("~  ~  ~  W| .  .  +W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W+ .  .  |W ~  ~  ~")
       .sprites("~  ~  ~  WW W| .  .  WW +W .  .  .  .  .  .  .  .  .  .  .  .  .  W+ WW .  .  |W WW ~  ~  ~")
       .sprites("~  ~  ~  ~  WW W| .  .  .  WW WW +W .  .  .  .  .  .  .  W+ WW WW .  .  .  |W WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  WW WW W| .  .  .  .  WW WW WW .  WW WW WW .  .  .  .  |W WW WW ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  WW WW WW W| .  .  .  .  .  .  .  .  .  |W WW WW WW ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW W| .  .  .  |W WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~");

  };

  return { init: init };
});