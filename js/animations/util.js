define(
/* AnimationUtil */ 
["jquery", "events", "messages"], 
function($, Event, Message) {
  return {
    CHAR_DIED_MSG : "Slain:",
    CRITICAL_HIT_MSG : "Critical hit!!",
    DAMAGE_MSG : "DMG",
    ENEMY_DIED_MSG : "Terminated",
    INEFFECTIVE_MSG : "Ineffective",
    MISSED_MSG : "Missed!",
    NUM_HITS_MSG : "Hits!",
    RUN_FAILURE : "Can't run",
    RUN_SUCCESS : "Close call::",
    SPLASH_ORDINALS : ["one", "two", "three"],
    STATUS_CURED : "Cured!",
    STATUS_SLEEP_CURED : "Woke up",
    VICTORY : "Monsters perished",
    VICTORY_EXP : "EXP up",
    VICTORY_GOLD : "GOLD",
     
    ORDINALS : ["first", "second", "third", "fourth"],
    RUN_DELAY : 300,
     
    autoStart : function(q, settings, doneAnimation, doneOpt) {
      if (settings.start) {
        $.when(q.start()).then(function() {
          Event.transmit(doneAnimation, doneOpt);
        });
      }
    },
    
    moveBattleWindow : function($battle, opt, left, top) {
      var leftChange = "-=" + (left * opt.numPixels) + "px";
      var topChange = "-=" + (top * opt.numPixels) + "px";
      $battle.animate({marginLeft:leftChange, marginTop:topChange}, opt.speed);
    },
  
    restoreCriticalStatus : function($char) {
      if ($char.is(".stillCritical")) {
        $char.removeClass("stillCritical").addClass("critical");
      }
    },
    
    suspendCriticalStatus : function($char) {
      if ($char.is(".critical")) {
        $char.removeClass("critical").addClass("stillCritical");
      }
    }
  };
});