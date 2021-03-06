define(/* TempleOfFiendsMapData */
["maps/map", "constants/map", "constants/movement"],
function(Map, MapConstants, MovementConstants) {

  var Transport = MovementConstants.Transportation;
  var tiles = {
    "~" : Map.newTile({y:4, x:4}).desc("nothing").isFiller(),
    "." : Map.newTile({y:1, x:1}).desc("path").inside({y:4, x:1}).passableBy(Transport.Foot),
    "W+": Map.newTile({y:0, x:0}).desc("wall top left").inside({y:3, x:0}),
    "WW": Map.newTile({y:0, x:1}).desc("wall").inside({y:3, x:1}),
    "+W": Map.newTile({y:0, x:2}).desc("wall top right").inside({y:3, x:2}),
    "W|": Map.newTile({y:1, x:0}).desc("wall left").inside({y:4, x:0}),
    "|W": Map.newTile({y:1, x:2}).desc("wall right").inside({y:4, x:2}),
    "I" : Map.newTile({y:2, x:0}).desc("pillar").inside({y:5, x:0}),
    "^" : Map.newTile({y:2, x:1}).desc("stairs up").inside({y:5, x:1}).passableBy(Transport.Foot),
    "[]": Map.newTile({y:2, x:2}).desc("door").inside({y:5, x:2}).passableBy(Transport.Foot).roomEntry(),
    "#-": Map.newTile({y:0, x:3}).desc("room wall top left").inside({y:3, x:3}),
    "--": Map.newTile({y:0, x:4}).desc("room wall top ").inside({y:3, x:4}),
    "-#": Map.newTile({y:0, x:5}).desc("room wall top right").inside({y:3, x:5}),
    "#|": Map.newTile({y:1, x:3}).desc("room wall left").inside({y:4, x:3}),
    "," : Map.newTile({y:1, x:4}).desc("room empty").inside({y:4, x:4}).passableBy(Transport.Foot),
    "|#": Map.newTile({y:1, x:5}).desc("room wall right").inside({y:4, x:5}),
    "#_": Map.newTile({y:2, x:3}).desc("room wall bottom left").inside({y:5, x:3}).passableBy(Transport.Foot),
    "__": Map.newTile({y:2, x:4}).desc("room wall bottom").inside({y:5, x:4}).passableBy(Transport.Foot),
    "_#": Map.newTile({y:2, x:5}).desc("room wall bottom right").inside({y:5, x:5}).passableBy(Transport.Foot),
    "$" : Map.newTile({y:1, x:4}).desc("chest").inside({y:6, x:0}).passableBy(Transport.Foot),
    "-{": Map.newTile({y:1, x:4}).desc("snake statue left").inside({y:7, x:0}),
    "}-": Map.newTile({y:1, x:4}).desc("snake statue right").inside({y:7, x:2}),
    "S|": Map.newTile({y:1, x:4}).desc("statue left").inside({y:6, x:2}),
    "|S": Map.newTile({y:1, x:4}).desc("statue right").inside({y:6, x:3}),
    "OO": Map.newTile({y:1, x:4}).desc("black orb top").inside({y:6, x:1}),
    "UU": Map.newTile({y:1, x:4}).desc("black orb botom").inside({y:7, x:1})
  };

  var init = function() {
    Map.create(MapConstants.TEMPLE_OF_FIENDS).tileMapping(tiles).battleEverywhere()
       .sprites("W+ WW WW WW WW +W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W+ WW WW WW WW +W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("W| #- -- -- -# |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| #- -- -- -# |W")
       .sprites("W| #| $  $  |# |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| #| $  $  |# |W")
       .sprites("W| #_ __ __ _# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW .  #_ __ __ _# |W")
       .sprites("W| WW WW [] WW .  .  WW WW WW WW WW WW WW WW WW +W WW WW WW WW WW WW WW W+ WW WW WW WW WW WW WW WW WW WW .  .  WW [] WW WW |W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W I  .  .  .  .  .  I  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("WW WW WW W| .  .  |W WW WW WW WW WW WW WW W| .  .  WW WW I  .  I  WW WW .  .  |W WW WW WW WW WW WW WW W| .  .  |W WW WW WW WW")
       .sprites("~  ~  ~  WW W| .  |W .  .  .  .  .  .  .  WW W| .  .  .  .  .  .  .  .  .  |W WW .  .  .  .  .  .  .  W| .  |W WW ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  WW WW WW WW I  .  I  WW WW WW WW .  .  .  .  .  .  .  .  W| .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  WW .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  WW .  .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  W+ .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  .  +W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W| .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ WW W| .  |W .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  W| .  |W WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| I  W| .  |W .  .  .  .  .  .  #- -- -- -- -- -- -- -- -- -- -# .  .  .  .  .  .  W| .  |W I  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  WW .  +W .  .  .  .  .  .  #| S| ,  ,  ,  ,  ,  ,  ,  |S |# .  .  .  .  .  .  WW .  WW .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  I  .  I  .  I  .  I  .  #- ,  ,  S| ,  ,  OO ,  ,  |S ,  ,  -# .  I  .  I  .  I  .  I  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  .  .  .  .  .  .  .  #| ,  ,  ,  S| -{ UU }- |S ,  ,  ,  |# .  .  .  .  .  .  .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  I  .  I  .  I  .  I  .  #| ,  ,  S| ,  ,  ,  ,  ,  |S ,  ,  |# .  I  .  I  .  I  .  I  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  W+ .  +W .  .  .  .  .  #_ ,  S| ,  ,  ,  ,  ,  ,  ,  |S ,  _# .  .  .  .  .  W+ .  +W .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| I  W| .  |W .  .  .  .  .  WW #| ,  ,  ,  ,  ,  ,  ,  ,  ,  |# WW .  .  .  .  .  W| .  |W I  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W+ WW .  .  |W .  .  .  .  .  .  #_ __ __ __ -{ ,  }- __ __ __ _# .  .  .  .  .  .  W| .  .  WW +W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  .  |W WW .  .  .  .  .  .  WW WW WW WW #| ,  |# WW WW WW WW .  .  .  .  .  .  W| .  .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W WW .  .  .  .  .  .  .  .  .  .  .  #_ __ _# .  .  .  .  .  .  .  .  .  .  WW W| .  .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  WW [] WW .  .  .  .  .  .  .  .  .  .  .  WW W| .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  I  .  I  .  .  .  .  .  .  .  .  .  .  .  .  W| .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  W| .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  ~  W| .  |W .  .  .  .  .  .  .  .  W+ WW WW WW I  .  I  WW WW WW +W .  .  .  .  .  .  .  .  W| .  |W ~  ~  ~  ~  ~")
       .sprites("~  ~  ~  W+ .  .  |W .  .  .  .  .  .  .  W+ .  .  .  .  .  .  .  .  .  .  .  +W .  .  .  .  .  .  .  W| .  .  +W ~  ~  ~  ~")
       .sprites("W+ WW WW .  .  .  .  WW WW WW WW WW WW WW .  .  |W WW WW I  .  I  WW WW W| .  .  WW WW WW WW WW WW WW .  .  .  .  WW WW WW +W")
       .sprites("W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W I  .  .  ^  .  .  I  W| .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  |W")
       .sprites("W| #- -- -# .  .  |W WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW WW W| .  .  #- -- -# |W")
       .sprites("W| #| $  |# .  |W WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW W| .  #| $  |# |W")
       .sprites("W| #_ __ _# .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  #_ __ _# |W")
       .sprites("W| WW [] WW .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  WW [] WW |W")
       .sprites("W| .  .  .  .  |W ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  W| .  .  .  .  |W")
       .sprites("WW WW WW WW WW WW ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  ~  WW WW WW WW WW WW");
  };

  return { init: init };
});