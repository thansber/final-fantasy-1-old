require(
["jquery", "engine", "events", "key-press-notifier", "logger", "maps/map", "maps/artist", "constants/map",
 "movement", "constants/movement", "party", "resources", "shims", "data/maps/towns"],
function($, Engine, Event, KeyPressNotifier, Logger, Map, MapArtist, MapConstants,
         Movement, MovementConstants, Party, Resources, Shims, TownMaps) {
  Shims.init();
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

  MapArtist.drawMap(map, map.start);
});