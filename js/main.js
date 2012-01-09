require(
["jquery", "animations/init", "battle-engine", "cursors/init", "data/init", "debug/init", 
 "engine", "key-press-notifier", "logger", "menus", "messages", "movement", "party", "rng", "shops",  
], 
function($, Animations, BattleEngine, CursorData, Data, Debug, 
         Engine, KeyPressNotifier, Logger, Menus, Message, Movement, Party, RNG, Shops) {
    $(document).ready(function() {
      Logger.enable().setLevel(Logger.DEBUG);
      RNG.useDefault();
      
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
      
      Party.createTestChars();
    });
  }
);