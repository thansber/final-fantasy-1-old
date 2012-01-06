define(
/* AnimationBattle */
["jquery", "animation-queue", "./util", "battle", "events", "messages", "party", "rng"],
function ($, AnimationQueue, AnimationUtil, Battle, Event, Message, Party, RNG) {
  
  return {
    charFlicker : function(opt, q) {
      q = q || AnimationQueue.create();

      var defaults = {numAnimations:3, flickerPause:60, initialPause:200, $char:null};
      var settings = jQuery.extend({}, defaults, opt);
      var $char = settings.$char;
      
      q.delay(settings.initialPause);
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { $char.animate({opacity:0}, 0); });
        q.delay(settings.flickerPause);
        q.add(function() { $char.animate({opacity:1}, 0); });
        q.delay(settings.flickerPause);
      }
      q.delay(settings.initialPause);
      
      AnimationUtil.autoStart(q, settings, Event.Animations.CharFlickerDone);
      
      return q;
    },
    
    defeat : function(opt, q) {
      q = q || AnimationQueue.create();
      q.delay(Message.getQuickPause());
      q.add(function() { Message.desc(Party.getChar(0).getName() + " party perished"); });
      AnimationUtil.autoStart(q, settings, Event.Animations.DefeatDone);
      return q;
    },
   
    moveChar : function(opt, q) {
      q = q || AnimationQueue.create();
     
      var defaults = {$char:null, numAnimations:3, pause:70, restoreStatus:true};
      var settings = jQuery.extend({}, defaults, opt);
      var $char = settings.$char;
     
      q.add(function() { Battle.suspendCriticalStatus($char); });
      q.add(function() { $char.toggleClass("advance"); });
          
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { $char.addClass("swing forward"); });
        q.delay(settings.pause);
        q.add(function() { $char.removeClass("swing forward"); });
        q.delay(settings.pause);
      }
     
      if (settings.restoreStatus) {
        q.add(function() { Battle.restoreCriticalStatus($char); });
      }
     
      AnimationUtil.autoStart(q, settings, Event.Animations.MoveCharDone);
     
      return q;
    },
   
    runParty : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {command:null, pause:AnimationUtil.RUN_DELAY, success:false};
      var settings = jQuery.extend({}, defaults, opt);
      //var isParty = (settings.command.type == BattleCommands.Party);
      
      if (settings.command && settings.command.source) { 
        q.add(function() { Message.source(settings.command.source.getName()); });
        q.delay(Message.getQuickPause());
      }
      
      if (settings.success) {
        q.add(function() { Message.desc(AnimationUtil.RUN_SUCCESS); });
        q.delay(Message.getBattlePause());
        jQuery.each(Party.getAliveChars(), function(i, char) {
          q.add(function() {
            var $char = Battle.getCharUI(char);
            $char.addClass("running");
            if (!($char.hasClass("critical"))) {
              $char.addClass("away");
            }
          });
          q.delay(settings.pause);
        });
      } else {
        q.add(function() { Message.desc(AnimationUtil.RUN_FAILURE); })
        q.delay(Message.getBattlePause());
      }
      
      q.hideMessages({hideDesc:true, hideSource:true, initialPause:false});
      
      AnimationUtil.autoStart(q, settings, Event.Animations.RunPartyDone);
 
      return q;
    },
    
    spellBackgroundFlicker : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {spell:null, numAnimations:4, flickerPause:50};
      var settings = jQuery.extend({}, defaults, opt);
      var $background = $("#battle .main .border, .stats .border");
      
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { $background.css("backgroundColor", settings.spell.backgroundColor); });
        q.delay(settings.flickerPause);
        q.add(function() { $background.css("backgroundColor", "black"); });
        q.delay(settings.flickerPause);
      }
      
      AnimationUtil.autoStart(q, settings, Event.Animations.SpellBackgroundFlickerDone);
      
      return q;
    },
    
    spellEffect : function(opt, q) {
      q = q || AnimationQueue.create();

      var defaults = {$char:null, spell:null, numAnimations:4, pause:100, start:false};
      var settings = $.extend({}, defaults, opt);
      var $char = opt.$char;
      var $spell = Battle.createSpellUI(opt.spell);
      var charAnimationClasses = "casting arms up";
      
      q.add(function() { $char.append($spell); $char.addClass(charAnimationClasses); });
      
      for (var i = 0; i < settings.numAnimations; i++) {
        q.delay(settings.pause)
        q.add(function() { $spell.toggleClass("animate"); });
      }
      
      q.add(function() { $char.find(".spell").remove(); $char.removeClass(charAnimationClasses); });
      
      AnimationUtil.autoStart(q, settings, Event.Animations.SpellEffectDone);
      return q;
    },
    
    splash : function(opt, q) {
      q = q || AnimationQueue.create();
      
      var defaults = {pause:80, numAnimations:null, overlay:false, $enemy:null, splashColors:""};
      var settings = jQuery.extend({}, defaults, opt);
      var $enemy = settings.$enemy;
      
      if (!settings.numAnimations) {
        var $parent = $enemy.parent();
        
        if ($parent.is(".small")) { settings.numAnimations = RNG.randomUpTo(5, 3); } 
        else if ($parent.is(".large")) { settings.numAnimations = RNG.randomUpTo(6, 4); } 
        else if ($parent.is(".fiend,.chaos")) { settings.numAnimations = RNG.randomUpTo(7, 5); } 
      }
      
      for (var n = 0; n < settings.numAnimations; n++) {
        q.add(function() { 
          $("#battle .enemies .splash:not(.overlay)").each(function(i) {
            var $splash = $(this);
            var randomSplashIndex = RNG.randomArrayElement(AnimationUtil.SPLASH_ORDINALS);
            $splash.removeClass().addClass("splash hidden").addClass(randomSplashIndex).addClass(settings.splashColors);
            
            var splashX = RNG.randomUpTo($enemy.width() - 20, 0);
            var splashY = RNG.randomUpTo(Math.floor($enemy.height() - ($enemy.height() * 0.33)), 0);
            var enemyPos = $enemy.position();
            var splashPos = {
              left : enemyPos.left + splashX
             ,top : enemyPos.top + splashY
            };
            
            $splash.css(splashPos);
            
            if (settings.overlay) {
              var $overlay = $splash.siblings(".overlay").eq(i);
              $overlay.css(splashPos).removeClass().addClass("splash overlay").addClass(randomSplashIndex);
            }
            
            $splash.removeClass("hidden");
          });
        });
        q.delay(settings.pause);
        q.add(function() { $("#battle .enemies .splash").addClass("hidden"); });
      }
      AnimationUtil.autoStart(q, settings, Event.Animations.SplashDone);
      return q;
    },
    
    swingWeapon : function(opt, q) {
      q = q || AnimationQueue.create();
      var defaults = {numAnimations:3, pause:60, start:false, $char:null};
      var settings = $.extend({}, defaults, opt);
      var $char = settings.$char;
  
      q.add(function() { $char.addClass("attack swing"); });
      
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { $char.removeClass("forward").addClass("back"); });
        q.delay(settings.pause);
        q.add(function() { $char.removeClass("back").addClass("forward"); });
        q.delay(settings.pause);
      }
  
      q.add(function() { $char.removeClass("attack swing forward back"); });
  
      AnimationUtil.autoStart(q, settings, Event.Animations.SwingWeaponDone);

      return q;
    },
    
    victory : function(opt, q) {
      q = q || AnimationQueue.create();
      var defaults = {numAnimations:4, pause:250};
      var settings = $.extend({}, defaults, opt);
      var aliveChars = Party.getAliveChars();
      var $aliveChars = [];
      
      q.add(function() { 
        $.each(aliveChars, function(i, char) {
          var $char = Battle.getCharUI(char);
          $aliveChars.push($char);
          Battle.suspendCriticalStatus($char);
        });
      });
      
      for (var i = 0; i < settings.numAnimations; i++) {
        q.add(function() { 
          $.each($aliveChars, function() { $(this).addClass("victory arms up"); }); 
        });
        q.delay(settings.pause);
        q.add(function() { 
          $.each($aliveChars, function() { $(this).removeClass("victory arms up"); }); 
        });
        q.delay(settings.pause);
      }
      
      q.add(function() { 
        $.each($aliveChars, function() { Battle.restoreCriticalStatus($(this)); }); 
      });
  
      var rewards = Battle.calculateRewards();
      $.each(aliveChars, function(i, char) { char.addExperience(rewards.exp); });
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
    },
    
    windowShake : function(opt, q) {
      q = q || AnimationQueue.create();
      var defaults = {numPixels:3, speed:30, pause:50};
      var settings = jQuery.extend({}, defaults, opt);
      var $battle = $("#battle");
      
      q.add(function() { AnimationUtil.moveBattleWindow($battle, settings, RNG.randomUpTo(1, 0), 1); });
      q.delay(settings.pause);
      q.add(function() { AnimationUtil.moveBattleWindow($battle, settings, RNG.randomUpTo(1, -1), RNG.randomUpTo(1, 0)); });
      q.delay(settings.pause);
      q.add(function() { $battle.animate({marginLeft:0, marginTop:0}, 0); });
      
      AnimationUtil.autoStart(q, settings, Event.Animations.WindowShakeDone);
      
      return q;
    }
  };
});