define(
/* DebugBattleAnimations */
["jquery", "battle", "constants/battle", "./util", "events", "party", "rng", "spells"],
function($, Battle, BattleConstants, DebugUtil, Event, Party, RNG, Spell) {

  var getRandomSpell = function() {
    var spells = $.map(Spell.ALL, function(spell, index) {
      return spell.effect ? spell : null;
    });
    
    return RNG.randomArrayElement(spells);
  };
  
  var allCharAnimation = function(type, opt) {
    opt = opt || {};
    var $party = $("#battle .party");
    $.each(Party.getChars(), function(i, char) {
      opt.$char = $party.find(".char").eq(char.charIndex);
      Event.animate(type).using(opt).start();
    });
  };
  
  var run = function(success) {
    Event.animate(Event.Animations.MessageToggler).using({roundStarting:true}).start();
    Event.animate(Event.Animations.RunParty).using({command:{type:BattleConstants.Commands.Party, source:Party.getChar(0)}, success:success}).start(); 
  };
  
  var victory = function() {
    Event.animate(Event.Animations.MessageToggler).using({roundStarting:true}).start();
    Event.animate(Event.Animations.Victory).using({aliveChars:Party.getChars()}).start();
  };
  
  return {
    event : function($target) {
      DebugUtil.battleAnimationReset();
      if ($target.is(".move.char")) { allCharAnimation(Event.Animations.MoveChar); }
      else if ($target.is(".swing.weapon")) { allCharAnimation(Event.Animations.SwingWeapon); } 
      else if ($target.is(".spell.effect")) { allCharAnimation(Event.Animations.SpellEffect, {spell:getRandomSpell()}); } 
      else if ($target.is(".spell.background")) { Event.animate(Event.Animations.SpellBackgroundFlicker).using({spell:getRandomSpell()}).start(); }       
      else if ($target.is(".window.shake")) { Event.animate(Event.Animations.WindowShake).start(); }
      else if ($target.is(".char.flicker")) { allCharAnimation(Event.Animations.CharFlicker); } 
      else if ($target.is(".victory")) { victory(); } 
      else if ($target.is(".run.away.failure")) { run(false); }
      else if ($target.is(".run.away")) { run(true); }
    }
  };
});