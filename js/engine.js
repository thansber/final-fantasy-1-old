define(
/* Engine */
["jquery", "battle", "cursor", "events", "logger", "maps/artist", "maps/transition", "menus", "party", "shops", "util",
 "constants/cursor", "maps/map", "constants/map", "constants/movement", "constants/party"],
function($, Battle, Cursor, Event, Logger, MapArtist, MapTransition, Menus, Party, Shops, Util,
         CursorConstants, Map, MapConstants, MovementConstants, PartyConstants) {

  var areaTransition = function(transition) {
    Event.animate(Event.Animations.AreaTransition)
         .using({transition:transition})
         .afterwards(Event.Animations.AreaTransitionDone, function() { Event.transmit(Event.Types.MovingChange, false); })
         .start();
  };

  var cursorStartListening = function(cursorId, opt) {
    var cursor = opt && opt.cursor ? opt.cursor : Cursor.lookup(cursorId);
    cursor.startListening(opt);
  };

  var enterShop = function(shopType) {
    Event.transmit(Event.Types.MovementStop);
    $("#shop section").removeClass().addClass(shopType);
    var shop = Shops.lookup(shopType);
    Party.setCurrentShop(shop);
    shop.display(Party.getAliveChars(), Party.getChars(), Party.getMap(), Party.getGold());
    switchView(PartyConstants.Views.SHOP);
  };

  var exitShop = function() {
    Party.setCurrentShop(null);
    switchView(PartyConstants.Views.WORLD_MAP);
    Event.transmit(Event.Types.MovementStart);
  };

  var init = function() {
    Event.listen(Event.Types.AreaTransition, areaTransition);
    Event.listen(Event.Types.CharMenu, showCharMenu);
    Event.listen(Event.Types.CursorStart, cursorStartListening);
    Event.listen(Event.Types.JumpTo, jumpTo);
    Event.listen(Event.Types.ShopEnter, enterShop);
    Event.listen(Event.Types.ShopExit, exitShop);
    Event.listen(Event.Types.StartBattle, startBattle);
    Event.listen(Event.Types.StartGame, startGame);
    Event.listen(Event.Types.SwitchView, switchView);
  };

  var jumpTo = function(map, coords) {
    var $view = $("#view");
    var $player = $("#player");

    var currentMap = Party.getMap();

    // If leaving the world map, keep track of the last world map position
    if (currentMap && currentMap.is(MapConstants.WORLD_MAP)) {
      Party.storeWorldMapPosition();
    }

    Party.setCurrentMap(map).setPosition(coords);
    if (!currentMap) { // for starting out
      Party.storeWorldMapPosition();
    }
    switchMap(map, coords);

    Logger.debug("jumped to map [" + map + "], coords " + coords.toString());
  };

  var showCharMenu = function(listener) {
    Menus.Char.load(Party.getChars(), Party.getLitOrbs(), Party.getGold());
    switchView(PartyConstants.Views.MENU);
    cursorStartListening(CursorConstants.CHAR_MENU, {prevListener:listener});
  };

  var startBattle = function(encounter, background) {
    Logger.debug(encounter.toString());

    Event.transmit(Event.Types.MovementStop);
    var battle = Battle.create($.extend(true, {background: background}, encounter));

    switchView(PartyConstants.Views.BATTLE);
    Party.resetStepsUntilBattle();

    Event.transmit(Event.Types.BattleSetup, {battle:battle});
  };

  var startGame = function() {
    Party.setTransportation(MovementConstants.Transportation.Foot);
    switchView(PartyConstants.Views.WORLD_MAP);

    Event.animate(Event.Animations.AreaTransition)
         .using({transition:MapTransition.start(), hideFirst:false})
         .afterwards(Event.Animations.AreaTransitionDone, function() { Party.resetStepsUntilBattle(); })
         .start();
  };

  var switchMap = function(mapId, coords) {
    var $view = $("#view");
    var map = Map.lookup(mapId);
    $view.hide().data("map", mapId);
    MapArtist.drawMap(map, coords);
    $view.show();
  };

  var switchView = function(view) {
    $("body > .main").hide();
    $(view).show();
  };

  return {
   init : init
  };
});