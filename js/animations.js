var Animation = (function() {
  
  var self = this;
  
  this.Queues = {
    AreaTransition : "areaTransition"
   ,Attack : "attack"
   ,BattleWalk : "walkInBattle"
   ,CastSpell : "castSpell"
   ,CharFlicker : "charFlicker"
   ,Defeat : "defeat"
   ,PreBattleMessage : "message"
   ,RunAway : "running"
   ,ShowSplash : "showSplash"
   ,SlideChar : "slideChar"
   ,SpellBackground : "spellBackground"
   ,SpellEffect : "spellEffect"
   ,StatusHeal : "statusHeal"
   ,SwingWeapon : "swingWeapon"
   ,Victory : "victory"
   ,WindowShake : "windowShake"
  };
  
  self.AMBUSH = "Monsters strike first";
  self.PREEMPTIVE = "Chance to strike first";
  
  var CHAR_DIED_MSG = "Slain:";
  var CRITICAL_HIT_MSG = "Critical hit!!";
  var DAMAGE_MSG = "DMG";
  var ENEMY_DIED_MSG = "Terminated";
  var INEFFECTIVE_MSG = "Ineffective";
  var MISSED_MSG = "Missed!";
  var NUM_HITS_MSG = "Hits!";
  var RUN_FAILURE = "Can't run";
  var RUN_SUCCESS = "Close call::"
  var SPLASH_ORDINALS = ["one", "two", "three"];
  var STATUS_CURED = "Cured!";
  var VICTORY = "Monsters perished";
  var VICTORY_EXP = "EXP up";
  var VICTORY_GOLD = "GOLD";
  
  var RUN_DELAY = 300;
  
  /* ======================================================== */
  /* QUEUE object ------------------------------------------- */ 
  /* ======================================================== */
  var Queue = function(name) {
    this.theQueue = $({});
    this.name = name + (+new Date());
    this.chain = null;
  };
  
  Queue.prototype.add = function(f) {
    if (f && typeof f === "function") {
      this.theQueue.queue(this.name, function(next) { 
        f();
        next(); 
      });
    }
  };
  Queue.prototype.addToChain = function(f) { this.chain.add(f); };
  Queue.prototype.delay = function(delayTime) { this.theQueue.delay(delayTime, this.name); };
  Queue.prototype.getPromise = function() { return this.theQueue.promise(this.name); };
  Queue.prototype.kill = function() { return this.theQueue.clearQueue(this.name); };
  Queue.prototype.moveChar = function(char, chain, opt) {
    this.setChain(chain || self.walkInBattle(char, opt));
    var queueChain = this.chain;
    if (chain) {
      this.addToChain(function() { self.slideChar(char, opt).start(); });
      self.walkInBattle(char, jQuery.extend({}, opt, {queue:queueChain}));
    } else {
      this.add(function() { queueChain.start(); });
      this.add(function() { self.slideChar(char, opt).start(); });
    }
  };
  Queue.prototype.setChain = function(chain) { this.chain = chain; };
  Queue.prototype.start = function() { this.theQueue.dequeue(this.name); return this.getPromise(); };
  Queue.prototype.toString = function() { return this.name + " has " + this.theQueue.queue(this.name).length + " elements"; };
  
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
  var attackResultMessages = function(command, result, q) {
    var isParty = (command.type == BattleCommands.Party);

    if (result.status) {
      q.delay(Message.getQuickPause());
      q.add(function() { Message.desc(result.status.desc); });
      q.delay(Message.getBattlePause());
      hideMessages(q, {hideDesc:true, initialPause:false});
    }
    
    if (result.hits && result.hits > 1) { 
      q.add(function() { Message.action(result.hits + NUM_HITS_MSG); });
    }
    
    if (result.dmg != null) {
      if (result.dmg == 0) {
        q.add(function() { Message.damage(MISSED_MSG); });
      } else {
        q.delay(Message.getQuickPause());
        q.add(function() { Message.damage(result.dmg + DAMAGE_MSG); });
      }
    }
    
    if (result.crit) {
      q.delay(Message.getQuickPause());
      q.add(function() { Message.desc(CRITICAL_HIT_MSG); });
    }
    
    if (result.died) {
      q.delay(result.crit || result.status ? Message.getBattlePause() : Message.getQuickPause());
      if (isParty) {
        q.add(function() { Message.desc(ENEMY_DIED_MSG); });
        q.add(function() { Battle.killEnemyUI(command.target, command.targetIndex); });
      } else {
        q.add(function() { Message.desc(CHAR_DIED_MSG); });
        q.delay(Message.getQuickPause());
      }
    }
    
    if (result.wasDead) {
      q.add(function() { Message.desc(INEFFECTIVE_MSG); });
    }
    
    if (!isParty) {
      q.add(function() { Battle.adjustCharStats(result); });
    }

    hideMessages(q, {
      hideDesc: result.crit || result.status || result.died || result.wasDead
     ,hideDamage: result.dmg != null
     ,hideTarget: true
     ,hideAction: result.hits && result.hits > 1
     ,hideSource: true
    });
    
    return q;
  };
  
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
  
  var hideMessages = function(q, opt) {
    var defaults = {all:false, hideDesc:false, hideDamage:false, hideTarget:false, hideAction:false, hideSource:false, initialPause:true};
    var settings = jQuery.extend({}, defaults, opt);
    
    if (settings.initialPause) {
      q.delay(Message.getBattlePause());
    }
    
    if (settings.all || settings.hideDesc) {
      q.add(function() { Message.desc({show:false}); });
      q.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideDamage) {
      q.add(function() { Message.damage({show:false}); });
      q.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideTarget) {
      q.add(function() { Message.target({show:false}); });
      q.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideAction) { 
      q.add(function() { Message.action({show:false}); });
      q.delay(Message.getQuickPause());
    }
    if (settings.all || settings.hideSource) { 
      q.add(function() { Message.source({show:false}); });
    }
  };
  
  var moveBattleWindow = function($battle, opt, left, top) {
    $battle.animate({
      marginLeft : "-=" + (left * opt.numPixels) + "px"
     ,marginTop : "-=" + (top * opt.numPixels) + "px"
    }, opt.speed);
  };
  
  var spellBackgroundFlicker = function(spell, opt) {
    var settings = jQuery.extend({}, {numAnimations:4, flickerPause:50}, opt);
    var $background = $("#battle .main .border, .stats .border");
    var q = new Queue(self.Queues.SpellBackground);
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $background.css("backgroundColor", Spell.lookup(spell.spellId).backgroundColor); });
      q.delay(settings.flickerPause);
      q.add(function() { $background.css("backgroundColor", "black"); });
      q.delay(settings.flickerPause);
    }
    
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
  self.areaTransition = function(displayToggle, queue) {
    var q = queue || new Queue(this.Queues.AreaTransition);
    q.add(function() { $("#map .transition").toggleClass("displayed", displayToggle); });
    return q;    
  };
  
  self.attack = function(command, result, queue) {
    var q = queue || new Queue(this.Queues.Attack);
    var isParty = (command.type == BattleCommands.Party);
    
    q.setChain(q);
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
      var $enemy = Battle.getEnemyUI(command.target, command.targetIndex);
      // unequipped chars using their fists get a gold splash effect
      var weaponSplash = (command.source.equippedWeapon() ? command.source.equippedWeapon().splash : "gold"); 
      
      self.attackAnimation(command.source, q);
      if (!result.wasDead) {
        self.splash($enemy, weaponSplash, {queue:q});
      }
    } else {
      self.windowShake({queue:q});
      self.charFlicker(command.target, {queue:q}); 
    }

    attackResultMessages(command, result, q);

    return q;
  };
  
  self.attackAnimation = function(char, queue) {
    var q = queue || new Queue(this.Queues.Attack);
    var chain = queue || q.chain;
    q.moveChar(char, chain);
    self.swingWeapon(char, {queue:q.chain});
    self.slideChar(char, {queue:q.chain, direction:"backward"});
    self.walkInBattle(char, {queue:q.chain});
    q.addToChain(function() { Battle.restoreCriticalStatus(Battle.getCharUI(char)); });
    return q;
  };
  
  self.castSpell = function(command, result, queue) {
    var q = queue || new Queue(this.Queues.CastSpell);
    var isParty = (command.type == BattleCommands.Party);
    q.setChain(q);
    q.delay(Message.getQuickPause());

    if (command.source) { 
      q.add(function() { Message.source(command.source.getName()); }); 
    }
    
    if (result.spell) {
      q.delay(Message.getQuickPause());
      q.add(function() { Message.action(result.spell.spellId); });
    }

    if (isParty) {
      self.castSpellAnimation(command.source, result.spell, q);
    } 
    castSpellResultMessages(command, result, q);
    
    return q;
  };
  
  self.castSpellAnimation = function(char, spell, queue) {
    var q = queue || new Queue(this.Queues.CastSpell);
    var chain = queue || q.chain;
    q.moveChar(char, chain);
    q.addToChain(function() { spellBackgroundFlicker(spell).start(); });
    self.spellEffect(char, spell, {queue:q.chain});
    self.slideChar(char, {queue:q.chain, direction:"backward"});
    self.walkInBattle(char, {queue:q.chain});
    q.addToChain(function() { Battle.restoreCriticalStatus(Battle.getCharUI(char)); });
    return q;
  };
  
  self.charFlicker = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, flickerPause:60, initialPause:200, queue:null}, opt);
    var $char = Battle.getCharUI(char);
    var q = settings.queue || new Queue(this.Queues.CharFlicker);
    
    q.delay(settings.initialPause);
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.animate({opacity:0}, 0); });
      q.delay(settings.flickerPause);
      q.add(function() { $char.animate({opacity:1}, 0); });
      q.delay(settings.flickerPause);
    }
    q.delay(settings.initialPause);
    
    return q;
  };
  
  self.defeat = function(queue) {
    var q = queue || new Queue(this.Queues.Defeat);
    var firstChar = Party.getChar(0);
    q.delay(Message.getQuickPause());
    q.add(function() { Message.desc(firstChar.getName() + " party perished"); });
    return q;
  };
  
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
  
  self.run = function(command, result, queue) {
    var q = queue || new Queue(this.Queues.RunAway);
    var isParty = (command.type == BattleCommands.Party);
    
    q.setChain(q);
    
    if (command.source) { 
      q.add(function() { Message.source(command.source.getName()); });
      q.delay(Message.getQuickPause());
    }
    
    if (result.success) {
      q.add(function() { Message.desc(RUN_SUCCESS); });
      q.delay(Message.getBattlePause());
      jQuery.each(Party.getChars(), function(i, char) {
        if (char.isAlive()) {
          q.add(function() {
            var $char = Battle.getCharUI(char);
            $char.addClass("running");
            if (!($char.hasClass("critical"))) {
              $char.addClass("away");
            }
          });
          q.delay(RUN_DELAY);
        }
      });
    } else {
      q.add(function() { Message.desc(RUN_FAILURE); })
      q.delay(Message.getBattlePause());
    }
    
    hideMessages(q, {hideDesc:true, hideSource:true, initialPause:false});
    
    return q;
  }
  
  self.slideChar = function(char, opt) {
    var settings = jQuery.extend({}, {direction:"forward", queue:null}, opt);
    var $char = Battle.getCharUI(char);
    var q = settings.queue || new Queue(this.Queues.SlideChar);
    
    q.add(function() { $char.toggleClass("advance", settings.direction == "forward"); });
    
    return q;
  };
  
  self.spellEffect = function(char, spell, opt) {
    var settings = jQuery.extend({}, {numAnimations:4, pause:100, queue:null, $char:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var $spell = Battle.createSpellUI(spell);
    var q = settings.queue || new Queue(this.Queues.SpellEffect);
    
    q.add(function() { $char.append($spell); $char.addClass("casting arms up"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.delay(settings.pause);
      q.add(function() { $spell.toggleClass("animate"); });
    }
    
    q.add(function() { $(".spell", $char).remove(); $char.removeClass("casting arms up"); });
    
    return q;
  };
  
  self.splash = function($enemy, splashColors, opt) {
    var settings = jQuery.extend({}, {pause:80, overlay:false, queue:null}, opt);
    if (!settings.numAnimations) {
      var $parent = $enemy.parent();
      
      if ($parent.is(".small")) { settings.numAnimations = RNG.randomUpTo(5, 3); } 
      else if ($parent.is(".large")) { settings.numAnimations = RNG.randomUpTo(6, 4); } 
      else if ($parent.is(".fiend,.chaos")) { settings.numAnimations = RNG.randomUpTo(7, 5); } 
    }
    var q = settings.queue || new Queue(this.Queues.ShowSplash);
    
    for (var n = 0; n < settings.numAnimations; n++) {
      q.add(function() { 
        $("#battle .enemies .splash:not(.overlay)").each(function(i) {
          var $splash = $(this);
          var randomSplashIndex = RNG.randomArrayElement(SPLASH_ORDINALS);
          $splash.removeClass().addClass("splash hidden").addClass(randomSplashIndex).addClass(splashColors);
          
          var splashX = RNG.randomUpTo($enemy.width() - 20, 0);
          var splashY = RNG.randomUpTo(Math.floor($enemy.height() - ($enemy.height() * 0.33)), 0);
          var enemyPos = $enemy.position();
          
          $splash.css({
            left : enemyPos.left + splashX
           ,top : enemyPos.top + splashY
          });
          
          if (settings.overlay) {
            var $overlay = $splash.siblings(".overlay").eq(i);
            $overlay.css({
              left : enemyPos.left + splashX
             ,top : enemyPos.top + splashY
            });
            $overlay.removeClass().addClass("splash overlay").addClass(randomSplashIndex);
          }
          
          $splash.removeClass("hidden");
        });
      });
      q.delay(settings.pause);
      q.add(function() { $("#battle .enemies .splash").addClass("hidden"); });
    }
    
    return q;
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
    q.add(function() { Message.desc(result.success ? STATUS_CURED : result.statusCured.desc); });
    if (isParty) {
      q.add(function() { Battle.adjustCharStats(result); });
    }
    q.delay(Message.getBattlePause());
    hideMessages(q, {hideDesc:true, hideSource:true, initialPause:false});
    
    return q;
  };
  
  self.swingWeapon = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:60, queue:null, $char:null}, opt);
    var $char = settings.$char ? settings.$char : Battle.getCharUI(char);
    var q = settings.queue || new Queue(this.Queues.SwingWeapon);

    q.add(function() { $char.addClass("attack swing"); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.removeClass("forward").addClass("back"); });
      q.delay(settings.pause);
      q.add(function() { $char.removeClass("back").addClass("forward"); });
      q.delay(settings.pause);
    }

    q.add(function() { $char.removeClass("attack swing forward back"); });

    return q;
  };
  
  self.victory = function(opt) {
    var settings = jQuery.extend({}, {numAnimations:4, pause:250, queue:null}, opt);
    var q = settings.queue || new Queue(this.Queues.Victory);
    
    q.add(function() { 
      jQuery.each(Party.getChars(), function(i, char) {
        if (char.isAlive()) {
          Battle.suspendCriticalStatus(Battle.getCharUI(char));
        }
      });
    });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { 
        jQuery.each(Party.getChars(), function(i, char) {
          if (char.isAlive()) {
            Battle.getCharUI(char).addClass("victory arms up");
          }
        }); 
      });
      q.delay(settings.pause);
      q.add(function() { 
        jQuery.each(Party.getChars(), function(i, char) { 
          if (char.isAlive()) {
            Battle.getCharUI(char).removeClass("victory arms up");
          }
        }); 
      });
      q.delay(settings.pause);
    }
    
    q.add(function() { 
      jQuery.each(Party.getChars(), function(i, char) {
        if (char.isAlive()) {
          Battle.restoreCriticalStatus(Battle.getCharUI(char));
        }
      });
    });

    var rewards = Battle.calculateRewards();
    jQuery.each(rewards.aliveChars, function(i, char) { char.addExperience(rewards.exp); });
    Party.addGold(rewards.gold);
    
    q.add(function() { Message.desc(VICTORY); });
    q.delay(Message.getBattlePause());
    q.add(function() { Message.desc({show:false}); });
    
    q.add(function() { Message.source(VICTORY_EXP); });
    q.delay(Message.getQuickPause());
    q.add(function() { Message.action(rewards.exp + "P"); });
    q.delay(Message.getQuickPause());
    q.add(function() { Message.target(VICTORY_GOLD); });
    q.delay(Message.getQuickPause());
    q.add(function() { Message.damage(rewards.gold + "G"); });
    
    hideMessages(q, {
      hideDamage: true
     ,hideTarget: true
     ,hideAction: true
     ,hideSource: true
    });
    
    return q;
  };
  
  self.walkInBattle = function(char, opt) {
    var settings = jQuery.extend({}, {numAnimations:3, pause:70, queue:null}, opt);
    var $char = Battle.getCharUI(char);
    var q = settings.queue || new Queue(this.Queues.BattleWalk);
    
    q.add(function() { Battle.suspendCriticalStatus($char); });
    
    for (var i = 0; i < settings.numAnimations; i++) {
      q.add(function() { $char.addClass("swing forward"); });
      q.delay(settings.pause);
      q.add(function() { $char.removeClass("swing forward"); });
      q.delay(settings.pause);
    }
    
    return q;
  };
  
  this.walkAndMoveInBattle = function(char, opt) {
    var settings = jQuery.extend({}, {queue:null}, opt);
    var q = settings.queue || new Queue(this.Queues.BattleWalk);
    q.moveChar(char, q.chain, opt);
    q.addToChain(function() { Battle.restoreCriticalStatus(Battle.getCharUI(char)); });
    return q;
  };
  
  this.windowShake = function(opt) {
    var settings = jQuery.extend({}, {numPixels:3, speed:30, pause:50, queue:null}, opt);
    var $battle = $("#battle");
    var q = settings.queue || new Queue(this.Queues.WindowShake);
    
    q.add(function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, 0), 1); });
    q.delay(settings.pause);
    q.add(function() { moveBattleWindow($battle, settings, RNG.randomUpTo(1, -1), RNG.randomUpTo(1, 0)); });
    q.delay(settings.pause);
    q.add(function() { $battle.animate({marginLeft:0, marginTop:0}, 0); });
    
    return q;
  };
  
  return this;
}).call({});