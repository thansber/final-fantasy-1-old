define(
/* DebugBattleAnimations */
["jquery", "battle", "constants/battle", "events", "party", "rng", "spells"],
function($, Battle, BattleConstants, Event, Party, RNG, Spell) {

  var getRandomSpell = function() {
    var spells = $.map(Spell.ALL, function(spell, index) {
      return spell.effect ? spell : null;
    });
    
    return RNG.randomArrayElement(spells);
  };
  
  var allCharAnimation = function(type, opt) {
    opt = opt || {};
    $.each(Party.getChars(), function(i, char) {
      opt.$char = Battle.getCharUI(char);
      Event.animate(type).using(opt).start();
    });
  };
  
  var firstEnemy = function() {
    for (var name in Battle.getAllEnemies()) {
      return Battle.lookupEnemy(name);
    }
  };
  
  var run = function(success) {
    Event.transmit(Event.Types.BattleMessageToggle, {roundStarting:true});
    Event.animate(Event.Animations.RunParty).using({command:{type:BattleConstants.Commands.Party, source:Party.getChar(0)}, success:success}).start(); 
  };
  
  var victory = function() {
    Event.transmit(Event.Types.BattleMessageToggle, {roundStarting:true}); 
    Event.animate(Event.Animations.Victory).start();
  };
  
  return {
    event : function($target) {
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