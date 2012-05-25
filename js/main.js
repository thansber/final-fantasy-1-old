require(
["jquery", "animations/init", "battle-engine", "cursors/init", "data/init", "debug/init", 
 "engine", "key-press-notifier", "logger", "maps/artist",
 "menus", "messages", "movement", "party", "resources", "rng", "shops"], 
function($, Animations, BattleEngine, CursorData, Data, Debug, 
         Engine, KeyPressNotifier, Logger, MapArtist,
         Menus, Message, Movement, Party, Resources, RNG, Shops) {
    $(document).ready(function() {
      Logger.enable().setLevel(Logger.DEBUG);
      RNG.useDefault();
   
      Resources.init();
      MapArtist.init();
      
      KeyPressNotifier.init();
      Movement.init();
      Message.init({messages:"#battle .messages"});
      Shops.init();
      Menus.init();
      
      Party.init();
      Engine.init();
      BattleEngine.init();
      
      Data.init();
      CursorData.init();
      Animations.startListening();
      
      Debug.init();
      
      //Party.createTestChars();
    });
  }
);