define(
/* AnimationAction */
["jquery", "./battle", "animation-queue", "./util", "battle", "battle-commands", "events", "messages", "party", "rng"],
function ($, AnimationBattle, AnimationQueue, AnimationUtil, Battle, BattleCommands, Event, Message, Party, RNG) {
  
  return {
    attack : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {command:null, result:null};
      var settings = $.extend({}, defaults, opt);
      var command = settings.command;
      var result = settings.result;
      var isParty = (command.type == BattleCommands.Party);
      
      q.delay(Message.getQuickPause());
      
      if (command.source) { 
        q.add(function() { Message.source(command.source.getName()); }); 
      }
      if (command.target) { 
        q.delay(Message.getQuickPause());
        q.add(function() { Message.target(command.target.getName()); }); 
      }
      
      if (isParty) {
        // Char doing the attacking
        var $char = Battle.getCharUI(command.source);
        var $enemy = Battle.getEnemyUI(command.target, command.targetIndex);
        // unequipped chars using their fists get a gold splash effect
        var weaponSplash = (command.source.equippedWeapon() ? command.source.equippedWeapon().splash : "gold"); 
        
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:false});
        q.addAll(AnimationBattle.swingWeapon, {$char:$char});
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:true});
        
        if (!result.wasDead) {
          q.addAll(AnimationBattle.splash, {$enemy:$enemy, splashColors:weaponSplash});
        }
      } else {
        q.addAll(AnimationBattle.windowShake);
        q.addAll(AnimationBattle.charFlicker, {$char:Battle.getCharUI(command.target)});
      }
  
      // Show messages from attack result
      if (result.status) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.desc(result.status.desc); });
        q.delay(Message.getBattlePause());
        q.hideMessages({hideDesc:true, initialPause:false});
      }
      
      if (result.hits && result.hits > 1) { 
        q.add(function() { Message.action(result.hits + AnimationUtil.NUM_HITS_MSG); });
      }
      
      if (result.dmg != null) {
        if (result.dmg == 0) {
          q.add(function() { Message.damage(AnimationUtil.MISSED_MSG); });
        } else {
          q.delay(Message.getQuickPause());
          q.add(function() { Message.damage(result.dmg + AnimationUtil.DAMAGE_MSG); });
        }
      }
      
      if (result.crit) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.desc(AnimationUtil.CRITICAL_HIT_MSG); });
      }
      
      if (result.died) {
        q.delay(result.crit || result.status ? Message.getBattlePause() : Message.getQuickPause());
        if (isParty) {
          q.add(function() { Message.desc(AnimationUtil.ENEMY_DIED_MSG); });
          q.add(function() { Battle.killEnemyUI(command.target, command.targetIndex); });
        } else {
          q.add(function() { Message.desc(AnimationUtil.CHAR_DIED_MSG); });
          q.delay(Message.getQuickPause());
        }
      }
      
      if (result.wasDead) {
        q.add(function() { Message.desc(AnimationUtil.INEFFECTIVE_MSG); });
      }
      
      if (!isParty) {
        q.add(function() { Battle.adjustCharStats(result); });
      }

      q.hideMessages({
        hideDesc: result.crit || result.status || result.died || result.wasDead
       ,hideDamage: result.dmg != null
       ,hideTarget: true
       ,hideAction: result.hits && result.hits > 1
       ,hideSource: true
      });
      
      AnimationUtil.autoStart(q, settings, Event.Animations.AttackDone);
      
      return q;
    },
    
    castSpell : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {command:null, result:null};
      var settings = $.extend({}, defaults, opt);
      var command = settings.command;
      var result = settings.result;
      var isParty = (command.type == BattleCommands.Party);
      
      q.delay(Message.getQuickPause());
  
      if (command.source) { 
        q.add(function() { Message.source(command.source.getName()); }); 
      }
      
      if (result.spell) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.action(result.spell.spellId); });
      }
  
      if (isParty) {
        var $char = Battle.getCharUI(command.source);
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:false});
        // We want the background flicker to run simultaneously, not queued with the rest of the spell action stuff
        q.add(function() { Event.animate(Event.Animations.SpellBackgroundFlicker).using({spell:result.spell}).start(); });
        q.addAll(AnimationBattle.spellEffect, {$char:$char, spell:result.spell});
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:true});
      } 
      //castSpellResultMessages(command, result, q);
      
      AnimationUtil.autoStart(q, settings, Event.Animations.CastSpellDone);
      
      return q;
    }
  };
});