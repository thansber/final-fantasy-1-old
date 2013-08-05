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
    "." : Map.newTile({y:0, x:0}).desc("path").inside({y:4, x:1}).passableBy(Transport.Foot),
  };

  var init = function() {
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_1F)
       .tileMapping($.extend({"..": grassFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_2F)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_3F)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere();

    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B1)
       .tileMapping($.extend({"..": grassTile, "~": emptyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B2)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B3)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B4)
       .tileMapping($.extend({"..": grassFillerTile}, tiles)).battleEverywhere();
    Map.create(MapConstants.TEMPLE_OF_FIENDS_REV_B5)
       .tileMapping($.extend({"~~": skyFillerTile}, tiles)).battleEverywhere();

  };

  return { init: init };
});