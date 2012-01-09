define(
/* DebugBattleMessages */ 
["jquery", "events", "messages"], 
function($, Event, Message) {  
  return { 
    event : function($target) {  
      var $container = $target.closest(".container");
      if ($target.is(".show")) {
        var input = {};
        input.source = $(".source.message", $container).val();
        input.target = $(".target.message", $container).val();
        input.action = $(".action.message", $container).val();
        input.damage = $(".damage.message", $container).val();
        input.desc = $(".desc.message", $container).val();
        
        Event.transmit(Event.Types.BattleMessageToggle, {roundStarting:true});
        
        Message.source({text:input.source, show:!!input.source});
        Message.target({text:input.target, show:!!input.target});
        Message.action({text:input.action, show:!!input.action});
        Message.damage({text:input.damage, show:!!input.damage});
        Message.desc({text:input.desc, show:!!input.desc});
      }
    }
  };
});