define(
/* DebugBattleAnimations */
["jquery", "battle", "battle-commands", "events", "party", "rng", "spells"],
function($, Battle, BattleCommands, Event, Party, RNG, Spell) {

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
  
  var attack = function(source, target, isParty) {
    var command = {source:source, target:target, type:isParty ? BattleCommands.Party : BattleCommands.Enemy};
    var result = {target:target, hits:1, dmg:1, targetHp:target.hitPoints -= 1};
    Battle.inputMessageToggler(true);
    Event.animate(Event.Animations.Attack).using({command:command, result:result}).start();
  };
  
  var castSpell = function(source, target, spellId) {
    var command = {source:source, target:target, type:BattleCommands.Party};
    var result = {target:target, spell:Spell.lookup(spellId), dmg:12};
    Battle.inputMessageToggler(true);
    Event.animate(Event.Animations.CastSpell).using({command:command, result:result}).start();
  };
  
  var firstEnemy = function() {
    for (var name in Battle.getAllEnemies()) {
      return Battle.lookupEnemy(name);
    }
  };
  
  var run = function(success) {
    Battle.inputMessageToggler(true);
    Event.animate(Event.Animations.RunParty).using({command:{type:BattleCommands.Party, source:Party.getChar(0)}, success:success}).start(); 
  };
  
  return {
    event : function($target) {
      if ($target.is(".move.char")) { allCharAnimation(Event.Animations.MoveChar); }
      else if ($target.is(".swing.weapon")) { allCharAnimation(Event.Animations.SwingWeapon); } 
      else if ($target.is(".spell.effect")) { allCharAnimation(Event.Animations.SpellEffect, {spell:getRandomSpell()}); } 
      else if ($target.is(".spell.background")) { Event.animate(Event.Animations.SpellBackgroundFlicker).using({spell:getRandomSpell()}).start(); }       
      else if ($target.is(".window.shake")) { Event.animate(Event.Animations.WindowShake).start(); }
      else if ($target.is(".char.flicker")) { allCharAnimation(Event.Animations.CharFlicker); } 
      else if ($target.is(".victory")) { Battle.inputMessageToggler(true); Event.animate(Event.Animations.Victory).start(); } 
      else if ($target.is(".run.away.failure")) { run(false); }
      else if ($target.is(".run.away")) { run(true); }
      
      else if ($target.is(".char.attack")) { attack(Party.getChar(0), firstEnemy(), true); }
      else if ($target.is(".enemy.attack")) { attack(firstEnemy(), Party.getChar(0)); }
      else if ($target.is(".cast.spell")) { castSpell(Party.getChar(0), firstEnemy(), "FIRE"); }
    }
  };
});