define( /* Animation */ 
["jquery", "events", "logger", "rng"], 
function($, Event, Logger, RNG) { 
  return (function() {
    
    var self = this;
    
    self.AMBUSH = "Monsters strike first";
    self.PREEMPTIVE = "Chance to strike first";
    
    
    
    /* ======================================================== */
    /* ACTION QUEUE object ------------------------------------ */ 
    /* ======================================================== */
    self.ActionQueue = function() {
      this.animationQueue = null;
      this.chain = null;
    };
    self.ActionQueue.prototype.add = function(animationQueue, chain) {
      if (this.animationQueue == null) {
        this.animationQueue = animationQueue;
        this.chain = this.animationQueue.chain;
      }
    };
    self.ActionQueue.prototype.kill = function() { 
      this.animationQueue.kill(); 
      if (this.animationQueue.chain) {
        this.animationQueue.chain.kill();
      }
    };
    self.ActionQueue.prototype.start = function() { return this.animationQueue.start(); };
    
    /* ======================================================== */
    /* PRIVATE METHODS ---------------------------------------- */
    /* ======================================================== */

    
    var castSpellResultMessages = function(command, result, queue) {
      var spell = Spell.lookup(command.spellId);
      var targetQueues = [];
      
      switch (command.targetType) {
        case BattleCommands.Party:
          for (var i = 0; i < result.target.length; i++) {
            castSpellOnPartyResultMessage(result, i, spell, result.target[i], queue);
          }
          break;
        case BattleCommands.Enemy:
          for (var i = 0; i < result.target.length; i++) {
            var target = result.target[i];
            var $target = (result.target.length == 1 ? Battle.getEnemyUI(target, command.targetIndex) : Battle.getEnemyUIByIndex(i));
            if (!($target.is(".dead"))) {
              castSpellOnEnemyResultMessage(result, i, spell, target, $target, queue);
            }
          }
          break;
      };
      
      hideMessages(queue, {hideAction:true, hideSource:true, initialPause:false});
      
      return queue;
    };
    
    var castSpellOnEnemyResultMessage = function(result, resultIndex, spell, target, $target, q) {
      var dmgShown = false, descShown = false;
      q.add(function() { Message.target(target.getName()); });
      self.splash($target, spell.splash, {overlay:spell.overlay, queue:q});
      
      var resultDamage = result.dmg[resultIndex];
      if (resultDamage != null) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.damage(resultDamage + DAMAGE_MSG); });
        dmgShown = true;
      }
      
      if (result.success.length > 0) {
        q.delay(Message.getQuickPause());
        if (!!result.success[resultIndex]) {
          spellMessages(q, spell);
        } else {
          q.add(function() { Message.desc(INEFFECTIVE_MSG); });
        }
        descShown = true;
      }
      
      if (!!result.died[resultIndex]) {
        q.delay(!!result.success[resultIndex] ? Message.getBattlePause() : Message.getQuickPause());
        q.add(function() { Message.desc(ENEMY_DIED_MSG); });
        q.add(function() { Battle.killEnemyUI($target); });
        descShown = true;
      }
      
      hideMessages(q, {hideDesc:descShown, hideDamage:dmgShown, hideTarget:true});
      
      return q;
    };
    
    var castSpellOnPartyResultMessage = function(result, resultIndex, spell, target, q) {
      var descShown = false, dmgShown = false;
      q.add(function() { Message.target(target.getName()); }, 0);
      self.charFlicker(target, {queue:q});
      
      var resultDamage = result.dmg[resultIndex];
      if (resultDamage != null && resultDamage > 0) {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.damage(resultDamage + DAMAGE_MSG); });
        dmgShown = true;
      }
      
      if (result.success.length > 0) {
        q.delay(Message.getQuickPause());
        if (!!result.success[resultIndex]) {
          spellMessages(q, spell);
        } else {
          q.add(function() { Message.desc(INEFFECTIVE_MSG); });
        }
        descShown = true;
      }
      
      if (!!result.died[resultIndex]) {
        q.delay(!!result.success[resultIndex] ? Message.getBattlePause() : Message.getQuickPause());
        q.add(function() { Message.desc(CHAR_DIED_MSG); });
        descShown = true;
      }
      q.add(function() {
        Battle.adjustCharStats({
          target: target
         ,targetHp: result.targetHp[resultIndex]
         ,died: result.died[resultIndex]
         ,status: result.status[resultIndex]
         ,clearStatuses: result.clearStatuses
        }); 
      });
      
      hideMessages(q, {hideDesc:descShown, hideDamage:dmgShown, hideTarget:true});
      
      return q;
    };
    
    
    var spellMessages = function(q, spell) {
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
    
    /* ======================================================== */
    /* PUBLIC METHODS ----------------------------------------- */
    /* ======================================================== */
    
    self.preBattleMessage = function(message, queue) {
      var q = queue || new Queue(this.Queues.PreBattleMessage);
      q.setChain(q);
      q.add(function() { Message.desc(message); });
      hideMessages(q, {hideDesc:true});
      return q;
    };
    
    self.reset = function() {
      $("#battle .enemies .splash").addClass("hidden");
    };
    
    self.statusHeal = function(command, result, queue) {
      var q = queue || new Queue(this.Queues.StatusHeal);
      var isParty = (command.type == BattleCommands.Party);
      
      q.setChain(q);
      q.delay(Message.getQuickPause());
      
      if (command.source) { 
        q.add(function() { Message.source(command.source.getName()); }); 
      }
      
      q.delay(Message.getQuickPause());
      q.add(function() { 
        var desc = result.statusCured.desc;
        if (result.success) {
          if (Status.equals(result.statusCured, Status.Sleep)) {
            desc = STATUS_SLEEP_CURED;
          } else {
            desc = STATUS_CURED;
          }
        }
        Message.desc(desc); 
      });
      if (isParty) {
        q.add(function() { Battle.adjustCharStats(result); });
      }
      q.delay(Message.getBattlePause());
      hideMessages(q, {hideDesc:true, hideSource:true, initialPause:false});
      
      return q;
    };
    
    return this;
  }).call({});
});