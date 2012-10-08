require(
["jquery", "engine", "events", "key-press-notifier", "logger", "maps/map", "maps/artist", "constants/map", 
 "movement", "constants/movement", "party", "resources", "data/maps/towns"], 
function($, Engine, Event, KeyPressNotifier, Logger, Map, MapArtist, MapConstants, 
         Movement, MovementConstants, Party, Resources, TownMaps) {
  Logger.enable().setLevel(Logger.DEBUG);
 
  Resources.init();
  MapArtist.init();
  TownMaps.init();
  
  KeyPressNotifier.init();
  Movement.init();
  Party.init();
  Engine.init();
  
  Event.transmit(Event.Types.MovementStart);
  Party.setTransportation(MovementConstants.Transportation.Foot);
  
  var map = Map.lookup(MapConstants.CONERIA);
  Event.transmit(Event.Types.JumpTo, map.id, map.start);
  
  MapArtist.resize(16, 14, MapConstants.TILE_SIZE);
  var img = map.resource.image;
  var mapping = map.mapping;
  
  var upperLeftX = map.start.x - 7;
  var upperLeftY = map.start.y - 7;
  var img = map.resource.image;
  
  for (var y = 0; y < 16; y++) { // for now, treat y like x, even though y uses halves
    for (var x = 0; x < 16; x++) {
      var tileX = upperLeftX + x;
      var tileY = upperLeftY + y;
      var tile = map.getTile(tileY, tileX);
      MapArtist.drawTile(img, {x:tile.x, y:tile.y}, {x:x, y:y});
    }
  }

  
});