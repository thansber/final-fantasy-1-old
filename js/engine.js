define(
/* Engine */
["jquery", "battle", "cursor", "events", "logger", "map-coords-absolute", "map-transition", "menus", "party", "shops", "util", 
 "constants/cursor", "constants/map", "constants/movement", "constants/party"],
function($, Battle, Cursor, Event, Logger, MapCoordsAbsolute, MapTransition, Menus, Party, Shops, Util, 
         CursorConstants, MapConstants, MovementConstants, PartyConstants) {
  
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
    Event.listen(Event.Types.SwitchMap, switchMap);
    Event.listen(Event.Types.SwitchView, switchView);
  };
  
  var jumpTo = function(map, coords) {
    var $view = $("#view");
    var $player = $("#player");
    
    var oldCss = $view.attr("class").split(" ");
    $view.removeClass().hide();
    
    var currentMap = Party.getMap();
    // If leaving the world map, keep track of the last world map position
    if (currentMap && currentMap.is(MapConstants.WORLD_MAP)) {
      Party.storeWorldMapPosition();
    }
    
    Party.setCurrentMap(map).setPosition(coords);
    switchMap(map);

    Logger.debug("jumped to map [" + map + "], coords " + coords.toString());
    
    var playerTop = Util.cssNumericValue($player.css("marginTop"));
    var playerLeft = Util.cssNumericValue($player.css("marginLeft"));
    var top = -1 * ((coords.y * MapConstants.TILE_SIZE) - playerTop);
    var left = -1 * ((coords.x * MapConstants.TILE_SIZE) - playerLeft);
    $view.css({backgroundPosition:left + "px " + top + "px"}).addClass(oldCss).show();
  };
  
  var showCharMenu = function(listener) {
    Menus.Char.load(Party.getChars(), Party.getLitOrbs(), Party.getGold());
    switchView(PartyConstants.Views.MENU);
    cursorStartListening(CursorConstants.CHAR_MENU, {prevListener:listener});
  };
  
  var startBattle = function(encounter, background) {
    Logger.debug(encounter.toString());
    
    Event.transmit(Event.Types.MovementStop);
    Battle.setup($.extend(true, {background: background}, encounter));

    switchView(PartyConstants.Views.BATTLE);
    Party.resetStepsUntilBattle();
  };
   
  var startGame = function() {
    Party.setTransportation(MovementConstants.Transportation.Foot);
    switchView(PartyConstants.Views.WORLD_MAP);
    
    var startTransition = MapTransition.lookup("start", MapCoordsAbsolute.create(0, 0));
    Event.animate(Event.Animations.AreaTransition)
         .using({transition:startTransition, hideFirst:false})
         .afterwards(Event.Animations.AreaTransitionDone, function() { Party.resetStepsUntilBattle(); })
         .start();
  };
   
  var switchMap = function(map) {
    $("#map").hide().removeClass().addClass(map).addClass("town main").show();
  };
   
  var switchView = function(view) {
    $("body > .main").hide();
    $(view).show();
  };
   
  return {
   init : init
  };
});