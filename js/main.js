require(
["jquery", "logger", "rng", "key-press-notifier", "movement", "messages", "menus", "shops", "party", "battle", "engine", 
 "data/init", "cursors/init", "animations/init", "debug/init"], 
function($, Logger, RNG, KeyPressNotifier, Movement, Message, Menus, Shops, Party, Battle, Engine, 
         Data, CursorData, Animations, Debug) {
    $(document).ready(function() {
      Logger.enable().setLevel(Logger.DEBUG);
      RNG.useDefault();
      
      KeyPressNotifier.init();
      Movement.init();
      Message.init({messages:"#battle .messages"});
      Shops.init();
      Menus.init();
      Battle.init();
      
      Party.init();
      Engine.init();
      
      Data.init();
      CursorData.init();
      Animations.startListening();
      
      Debug.init();
      
      Party.createTestChars();
    });
  }
);