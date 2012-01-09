define( /* Animation */ 
["jquery", "events", "logger", "rng"], 
function($, Event, Logger, RNG) { 
  return (function() {
    
    var self = this;
    
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
    
    
    /* ======================================================== */
    /* PUBLIC METHODS ----------------------------------------- */
    /* ======================================================== */
    
    
    
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