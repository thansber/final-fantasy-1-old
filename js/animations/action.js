define(
/* AnimationAction */
["jquery", "./battle", "animation-queue", "./util", "constants/battle", "events", "messages", "party", "rng"],
function ($, AnimationBattle, AnimationQueue, AnimationUtil, BattleConstants, Event, Message, Party, RNG) {
  
  var $party = null;
  var $enemies = null;
  
  var adjustCharStats = function(opt) {
    var result = opt.result;
    var char = result.target;
    var $char = getCharUI(char);
    var $charStats = $("#battle").find(".stats").find(".charStats." + AnimationUtil.ORDINALS[char.charIndex]);
      
    if (result.targetHp) {
      // Updates the HP for the character
      $("div.hp", $charStats).empty().append(Message.create(result.targetHp + ""));
    }
    
    $char.removeClass("swing forward back arms up");

    if (result.died) {
      $char.addClass("dead");
      $("label.hp", $charStats).empty().append(Message.create("HP"));
      $("div.hp", $charStats).empty().append(Message.create("0"));
      return;
    }
    
    if (result.status) {
      if (result.status.battleText) {
        var $statusText = null;
        if (result.status.shrunkBattleText) {
          $statusText = Message.create(null, "shrunk " + result.status.battleText);
        } else {
          $statusText = Message.create(result.status.battleText);
        }
        $("label.hp", $charStats).empty().append($statusText);
      }
      
      if (result.status.critical) {
        $char.addClass("critical");
      }
      
      if (Status.equals(result.status, Status.Stone)) {
        $char.addClass("stone");
      }
    } else {
      if (result.clearStatuses) {
        $char.removeClass("stone").removeClass("critical");
        $("label.hp", $charStats).empty().append(Message.create("HP"));
      } else if (result.targetHp) {
        $char.toggleClass("critical", char.isCritical(result.targetHp));
      }
    }
  };
  
  var getCharUI = function(char) { return char == null ? null : $party.find(".char").eq(char.charIndex); };
  var getEnemyUI = function(monster, index) { return monster == null ? null : $enemies.find(".enemy." + monster.cssClass).eq(index == null ? 0 : index); };
  var getEnemyUIByIndex = function(index) { return $enemies.find(".enemy:not(.dead)").eq(index == null ? 0 : index); };
  var killEnemyUI = function(monster, index) {
    var $enemy = (index == null ? monster : getEnemyUI(monster, index));
    $enemy.addClass("dead");    
  };
  
  var spellMessages = function(opt, q) {
    var spell = opt.spell;
    if (spell.message) { 
      var afterFirstMessage = false;
      var messages = jQuery.isArray(spell.message) ? spell.message : [spell.message];
      for (var m in messages) {
        if (afterFirstMessage) {
          q.delay(Message.getBattlePause());
        }
        q.add(function(message) { 
          return function() { 
            Message.desc(message); 
          }; 
        }(messages[m]));
        afterFirstMessage = true;
      }
    }
  };
  
  return {
    attack : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {command:null, result:null};
      var settings = $.extend({}, defaults, opt);
      var command = settings.command;
      var result = settings.result;
      var isParty = (command.type == BattleConstants.Commands.Party);
      
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
        var $char = getCharUI(command.source);
        var $enemy = getEnemyUI(command.target, command.targetIndex);
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
        q.addAll(AnimationBattle.charFlicker, {$char:getCharUI(command.target)});
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
          q.add(function() { killEnemyUI(command.target, command.targetIndex); });
        } else {
          q.add(function() { Message.desc(AnimationUtil.CHAR_DIED_MSG); });
          q.delay(Message.getQuickPause());
        }
      }
      
      if (result.wasDead) {
        q.add(function() { Message.desc(AnimationUtil.INEFFECTIVE_MSG); });
      }
      
      if (!isParty) {
        q.add(function() { adjustCharStats({result:result}); });
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
      var isParty = (command.type == BattleConstants.Commands.Party);
      
      q.delay(Message.getQuickPause());
  
      if (command.source) { 
        q.add(function() { Message.source(command.source.getName()); }); 
      }
      
      if (result.spell) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.action(result.spell.spellId); });
      }
  
      if (isParty) {
        var $char = getCharUI(command.source);
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:false});
        // We want the background flicker to run simultaneously, not queued with the rest of the spell action stuff
        q.add(function() { Event.animate(Event.Animations.SpellBackgroundFlicker).using({spell:result.spell}).start(); });
        q.addAll(AnimationBattle.spellEffect, {$char:$char, spell:result.spell});
        q.addAll(AnimationBattle.moveChar, {$char:$char, restoreStatus:true});
      } 
      
      // Spell result messages
      if (command.targetType == BattleConstants.Commands.Party) {
        //Spell is being cast on party
        for (var i = 0; i < result.target.length; i++) {
          var target = result.target[i];
          var $target = getCharUI(target);
          var descShown = false;
          var dmgShown = false;
          
          q.add(function() { Message.target(target.getName()); }, 0);
          q.addAll(AnimationBattle.charFlicker, {$char:$target});
          
          var resultDamage = result.dmg[i];
          if (resultDamage != null && resultDamage > 0) {
            q.delay(Message.getQuickPause());
            q.add(function() { Message.damage(resultDamage + AnimationUtil.DAMAGE_MSG); });
            dmgShown = true;
          }
          
          if (result.success.length > 0) {
            q.delay(Message.getQuickPause());
            if (!!result.success[i]) {
              q.addAll(spellMessages, {spell:spell});
            } else {
              q.add(function() { Message.desc(AnimationUtil.INEFFECTIVE_MSG); });
            }
            descShown = true;
          }
          
          if (!!result.died[i]) {
            q.delay(!!result.success[i] ? Message.getBattlePause() : Message.getQuickPause());
            q.add(function() { Message.desc(AnimationUtil.CHAR_DIED_MSG); });
            descShown = true;
          }
          q.add(function() {
            adjustCharStats({result:{
              target: target
             ,targetHp: result.targetHp[i]
             ,died: result.died[i]
             ,status: result.status[i]
             ,clearStatuses: result.clearStatuses
            }}); 
          });
          
          q.hideMessages({hideDesc:descShown, hideDamage:dmgShown, hideTarget:true});
        }
      } else {
        // Spell is being cast on enemies
        for (var i = 0; i < result.target.length; i++) {
          var target = result.target[i];
          var $target = (result.target.length == 1 ? getEnemyUI(target, command.targetIndex) : getEnemyUIByIndex(i));
          if (!($target.is(".dead"))) {
            // TODO: add this back
            //castSpellOnEnemyResultMessage(result, i, spell, target, $target, queue);

            var dmgShown = false, descShown = false;
            q.add(function() { Message.target(target.getName()); });
            q.addAll(AnimationBattle.splash, {$enemy:$target, splashColors:spell.splash, overlay:spell.overlay});
            
            var resultDamage = result.dmg[i];
            if (resultDamage != null) {
              q.delay(Message.getQuickPause());
              q.add(function() { Message.damage(resultDamage + AnimationUtil.DAMAGE_MSG); });
              dmgShown = true;
            }
            
            if (result.success.length > 0) {
              q.delay(Message.getQuickPause());
              if (!!result.success[i]) {
                q.addAll(spellMessages, {spell:spell});
              } else {
                q.add(function() { Message.desc(AnimationUtil.INEFFECTIVE_MSG); });
              }
              descShown = true;
            }
            
            if (!!result.died[i]) {
              q.delay(!!result.success[i] ? Message.getBattlePause() : Message.getQuickPause());
              q.add(function() { Message.desc(AnimationUtil.ENEMY_DIED_MSG); });
              q.add(function() { Battle.killEnemyUI($target); });
              descShown = true;
            }
            
            q.hideMessages({hideDesc:descShown, hideDamage:dmgShown, hideTarget:true});
          }
        }
      }
      
      q.hideMessages({hideAction:true, hideSource:true, initialPause:false});
      
      AnimationUtil.autoStart(q, settings, Event.Animations.CastSpellDone);
      
      return q;
    },
    
    defeat : function(opt, q) {
      q = q || AnimationQueue.create();
      q.delay(Message.getQuickPause());
      q.add(function() { Message.desc(Party.getChar(0).getName() + " party perished"); });
      AnimationUtil.autoStart(q, settings, Event.Animations.DefeatDone);
      return q;
    },
  
    init : function() {
      var $battle = $("#battle");
      
      $party = $battle.find(".party");
      $enemies = $battle.find(".enemies");
      Event.listen(Event.Types.AdjustCharStats, adjustCharStats);
    },
    
    victory : function(opt, q) {
      q = q || AnimationQueue.create();
      var defaults = {aliveChars:[], numAnimations:4, pause:250};
      var settings = $.extend(true, defaults, opt);
      var $aliveChars = [];
      
      $.each(settings.aliveChars, function(i, char) { $aliveChars.push(getCharUI(char)); });
      
      q.add(function() { 
        $.each($aliveChars, function(i, $char) { AnimationUtil.suspendCriticalStatus($char); });
      });
      
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { 
          $.each($aliveChars, function(i, $char) { $char.addClass("victory arms up"); }); 
        });
        q.delay(settings.pause);
        q.add(function() { 
          $.each($aliveChars, function(i, $char) { $char.removeClass("victory arms up"); }); 
        });
        q.delay(settings.pause);
      }
      
      q.add(function() { 
        $.each($aliveChars, function(i, $char) { AnimationUtil.restoreCriticalStatus($char); }); 
      });
  
      var rewards = Battle.calculateRewards();
      $.each(settings.aliveChars, function(i, char) { char.addExperience(rewards.exp); });
      Party.addGold(rewards.gold);
      
      q.add(function() { Message.desc(AnimationUtil.VICTORY); });
      q.delay(Message.getBattlePause());
      q.add(function() { Message.desc({show:false}); });
      
      q.add(function() { Message.source(AnimationUtil.VICTORY_EXP); });
      q.delay(Message.getQuickPause());
      q.add(function() { Message.action(rewards.exp + "P"); });
      q.delay(Message.getQuickPause());
      q.add(function() { Message.target(AnimationUtil.VICTORY_GOLD); });
      q.delay(Message.getQuickPause());
      q.add(function() { Message.damage(rewards.gold + "G"); });
      q.hideMessages({hideDamage:true, hideTarget:true, hideAction:true, hideSource:true});
      
      AnimationUtil.autoStart(q, settings, Event.Animations.VictoryDone);
      
      return q;
    }
  };
});