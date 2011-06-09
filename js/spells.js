var Spell = (function() {
  
  var ALL = {};
  
  var TargetType = {
    Single:{
      apply : function(spell, caster, target) { 
        spell.applyToTarget(caster, target);   
      }
    }
   ,All:{
     apply : function(spell, caster, targets) {
       var spellTargets = [];
       if (!jQuery.isArray(targets)) {
         spellTargets = jQuery.makeArray(targets);
       } else {
         spellTargets = jQuery.merge([], targets);
       }
       jQuery(spellTargets).each(function() {
         if (!this.isDead()) {
           spell.applyToTarget(caster, this);
         }
       });
     }
   }
   ,Self:{
     apply : function(spell, caster) {
       spell.applyToTarget(caster, caster);
     }
   }
  };
  
  var TargetGroup = {Same:{}, Other:{}, None:{}};
  var SpellType = {
    HpRecovery : {
      targetGroup : TargetGroup.Same
     ,apply : function(spell, caster, target) {
        if (target.isDead()) {
          return;
        }
        var hpUp = RNG.randomUpTo(2 * spell.effectivity, spell.effectivity);
        hpUp = (hpUp > 255 ? 255 : hpUp);

        spell.result.dmg = hpUp;
        target.applyDamage(hpUp * -1);
      }
   }
   ,HpRecoveryFull : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) {
       if (target.isDead()) {
         return;
       }
       target.hitPoints = target.maxHitPoints;
       for (var s in Status.AllExceptDead) {
         target.removeStatus(Status.AllExceptDead[s]);
       }
     }
   }
   ,Damage : {
     targetGroup : TargetGroup.Other
    ,apply : function(spell, caster, target) {
       var maxDmg = 2 * spell.effectivity;
       var minDmg = spell.effectivity;
       
       if (spell.element) {
         if (target.isProtectedFrom(spell.element)) {
           maxDmg = spell.effectivity; // halved
           minDmg = spell.effectivity * 0.5; // halved
         } else if (target.isWeakTo(spell.element)) {
           maxDmg = Math.floor(maxDmg * 1.5);
           minDmg = Math.floor(minDmg * 1.5);
         }
       }
       
       var dmg = RNG.randomUpTo(maxDmg, minDmg);
       var doubled = false;
       if (spellSuccess(spell, caster, target)) {
         dmg *= 2;
         doubled = true;
       }
       var dmgLog = "    dmg=" + dmg + (doubled ? " (DOUBLED)" : "") + " out of " + (doubled ? minDmg * 2 : minDmg) + "-" + (doubled ? maxDmg * 2 : maxDmg);

       Output.log(dmgLog);
       
       spell.result.dmg.push(dmg);
       target.applyDamage(dmg);
       spell.result.died.push(target.isDead());
     }
   }
   ,StatUp : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) { target[spell.statChanged] += spell.effectivity; }
   }
   ,StatUpMulti : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) {
       target[spell.statChanged.eff] += spell.effectivity;
       target[spell.statChanged.acc] += spell.accuracy;
     }
   }
   ,StatDown : {
     targetGroup:TargetGroup.Other
    ,apply : function(spell, caster, target) {
       var statChangeSuccess = spellSuccess(spell, caster, target);
       if (statChangeSuccess) {
         target[spell.statChanged] -= spell.effectivity;
       }
       spell.result.success.push(statChangeSuccess);
     }
   }
   ,AddStatus : {
     targetGroup : TargetGroup.Other
    ,apply : function(spell, caster, target) {
       var statusSuccess = spellSuccess(spell, caster, target);
       if (statusSuccess) {
         target.addStatus(spell.status);
       }
       spell.result.success.push(statusSuccess);
     }
   }
   ,AddStatus300Hp : {
     targetGroup : TargetGroup.Other
    ,apply : function(spell, caster, target) {
      var statusSuccess = false;
      if (target.hitPoints <= 300 && !target.isProtectedFrom(spell.element)) {
        target.addStatus(spell.status);
        statusSuccess = true;
      }
      spell.result.success.push(statusSuccess);
     }
   }
   ,RemoveStatus : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) {
       var statusSuccess = target.hasStatus(spell.status);
       target.removeStatus(spell.status);
       spell.result.success.push(statusSuccess);
     }
   }
   ,ResistElement : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) {
       var elementsResisted = [];
       if (jQuery.isArray(spell.element)) {
         jQuery.merge(elementsResisted, spell.element);
       } else {
         elementsResisted.push(spell.element);
       }
       
       jQuery(elementsResisted).each(function() { target.protectFrom(this); });
     }
   }
   ,WeakToElement : {
     targetGroup:TargetGroup.Other
    ,apply : function(spell, caster, target) {
       var elementsWeakTo = [];
       if (jQuery.isArray(spell.element)) {
         jQuery.merge(elementsWeakTo, spell.element);
       } else {
         elementsWeakTo.push(spell.element);
       }
       
       jQuery(elementsWeakTo).each(function() { target.weakTo(this, true); });
     }
   }
   ,HitMultiplierUp : {
     targetGroup : TargetGroup.Same
    ,apply : function(spell, caster, target) {
       target.hitMultiplier += parseInt(spell.hitMultiplierChange, 10);
       if (target.hitMultiplier > 2) {
         target.hitMultiplier = 2;
       }
     }
   } 
   ,HitMultiplierDown : {
     targetGroup:TargetGroup.Other
    ,apply : function(spell, caster, target) {
      var success = spellSuccess(spell, caster, target);
      if (success) {
        target.hitMultiplier += parseInt(spell.hitMultiplierChange, 10);
        if (target.hitMultiplier < 0) {
          target.hitMultiplier = 0;
        }
      }
      spell.result.success.push(success);
    }
   }
   ,MoraleDown : {
     targetGroup:TargetGroup.Other
    ,apply : function(spell, caster, target) { alert("This spell does not work yet [" + spell.spellId + "]"); }
   }
   ,NonBattle : {
     targetGroup:TargetGroup.None
    ,apply : function(spell, caster, target) { alert("This spell cannot be cast in battle [" + spell.spellId + "]"); }
   }
  };
  
  var spellSuccess = function(spell, caster, target) {
    var baseChance = 148;
    if (spell.element) {
      if (target.isProtectedFrom(spell.element)) {
        baseChance = 0;
      }
      if (target.isWeakTo(spell.element)) {
        baseChance += 40;
      }
    }
    
    var success = false; 
    var r = RNG.randomUpTo(Action.AUTO_MISS);
    var logMsg = caster.charName + " casting " + spell.spellId + " - ";
    
    if (r == Action.AUTO_HIT) {
      logMsg += "HIT-AUTO";
      success = true;
    } else if (r == Action.AUTO_MISS) {
      logMsg += ",MIS-AUTO";
      success = false;
    } else {
      success = (r <= baseChance + spell.accuracy - target.magicDef);
      logMsg += success ? "HIT" : "MISS";
    }

    logMsg += "=[to hit=" + (baseChance + spell.accuracy - target.magicDef) + "(" + baseChance + "+" + spell.accuracy + "-" + target.magicDef + ")" + ",rnd=" + r + "]";

    Output.log(logMsg);
      
    return success;
  };
  
  function Spell(opt) {
    if (!opt) {
      return;
    }
    var base = opt.base || {};
    var stats = opt.stats || {};
    var allowedClasses = opt.allowedClasses || [];
    
    this.spellLevel = base.level;
    this.spellId = base.name.toUpperCase();
    this.spellType = base.type;
    this.targetType = base.target;
    this.isSkill = base.isSkill;

    this.effectivity = stats.eff;
    this.accuracy = stats.acc;
    this.statChanged = stats.statChanged;
    this.element = stats.element;
    this.status = stats.status;
    this.hitMultiplierChange = stats.hitMultiplierChange;

    this.allowedClasses = jQuery.merge([],allowedClasses);
    
    this.isAlreadyApplied = opt.isAlreadyApplied; // function

    this.result = {};
    this.result.success = [];
    
    ALL[this.spellId] = this;
  };
  
  Spell.prototype.cast = function(source, target) { this.targetType.apply(this, source, target); }
  Spell.prototype.applyToTarget = function(caster, target) { this.spellType.apply(this, caster, target); };
  
  var create = function(opt) {
    return new Spell(opt);
  };
  
  return {
     ALL : ALL
    ,TargetType : TargetType
    ,TargetGroup : TargetGroup
    ,SpellType : SpellType
    ,Spell : Spell
    
    ,create : create
    ,lookup : function(spellId) { return ALL[spellId]; }
  };
})();

var Skill = (function() {
  
  var ALL = {};
  
  Skill.prototype = new Spell.Spell();
  function Skill(opt) {
    opt.base.level = 0;
    opt.base.isSkill = true;
    Spell.Spell.call(this, opt);
  };
  
  var create = function(opt) {
    return new Skill(opt);
  };
  
  return {
    ALL : ALL
   
   ,create : create
   ,lookup : function(skillId) { return ALL[skillId]; }
 };
})();