define(
/* Spell */
["jquery", "logger", "rng", "constants/rng", "constants/spell", "data/statuses"],
function($, Logger, RNG, RngConstants, SpellConstants, Status) {
  return (function() {

    var self = this;
    self.ALL = {};

    var spellSuccess = function(spell, caster, target) {
      var baseChance = 148;
      if (spell.element) {
        if (target.isProtectedFrom(spell.element)) {
          baseChance = 0;
        }
        if (target.isWeakToElement(spell.element)) {
          baseChance += 40;
        }
      }

      var success = false;
      var r = RNG.randomUpTo(RngConstants.AUTO_MISS);
      var logMsg = caster.getName() + " casting " + spell.spellId + " - ";

      if (r == RngConstants.AUTO_HIT) {
        logMsg += "HIT-AUTO";
        success = true;
      } else if (r == RngConstants.AUTO_MISS) {
        logMsg += ",MISS-AUTO";
        success = false;
      } else {
        success = (r <= baseChance + spell.accuracy - target.magicDef);
        logMsg += success ? "HIT" : "MISS";
      }

      logMsg += "=[to hit=" + (baseChance + spell.accuracy - target.magicDef) + "(" + baseChance + "+" + spell.accuracy + "-" + target.magicDef + ")" + ",rnd=" + r + "]";

      Logger.debug(logMsg);

      return success;
    };

    self.SpellType = {
      HpRecovery : {
        targetGroup : SpellConstants.TargetGroup.Same
       ,apply : function(spell, caster, target) {
          if (target.isDead()) {
            return;
          }
          var hpUp = RNG.randomUpTo(2 * spell.effectivity, spell.effectivity);
          hpUp = (hpUp > 255 ? 255 : hpUp);

          target.applyDamage(hpUp * -1);

          spell.result.dmg.push(hpUp * -1);
          spell.result.success.push(true);
          spell.result.targetHp.push(target.hitPoints);
       }
     }
     ,HpRecoveryFull : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         if (target.isDead()) {
           return;
         }
         target.hitPoints = target.maxHitPoints;
         for (var s in Status.AllExceptDead) {
           target.removeStatus(Status.AllExceptDead[s]);
         }

         spell.result.clearStatuses = true;
         spell.result.targetHp.push(target.hitPoints);
         spell.result.success.push(true);
       }
     }
     ,Resurrect : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         if (!target.isDead()) {
           return;
         }
         target.resurrect();
         if (spell.effectivity > 1) {
           target.applyDamage(-1 * spell.effectivity);
         }
      }
     }
     ,Damage : {
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) {

         if (!spell.affectsTarget(target)) {
           spell.result.success.push(false);
           Logger.debug("INEFFECTIVE - spell only affects [" + spell.affects.join(",") + "], target has types [" + target.types.join(",") + "]");
           return;
         }

         var maxDmg = 2 * spell.effectivity;
         var minDmg = spell.effectivity;

         if (spell.element) {
           if (target.isProtectedFrom(spell.element)) {
             maxDmg = spell.effectivity; // halved
             minDmg = spell.effectivity * 0.5; // halved
           } else if (target.isWeakToElement(spell.element)) {
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

         Logger.debug(dmgLog);

         target.applyDamage(dmg);

         spell.result.dmg.push(dmg);
         spell.result.targetHp.push(target.hitPoints);
         spell.result.success.push(true);
         spell.result.died.push(target.isDead());
       }
     }
     ,StatUp : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         target[spell.statChanged] += spell.effectivity;
         spell.result.success.push(true);
       }
     }
     ,StatUpMulti : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         target[spell.statChanged.eff] += spell.effectivity;
         target[spell.statChanged.acc] += spell.accuracy;
         spell.result.success.push(true);
       }
     }
     ,StatDown : {
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) {
         var statChangeSuccess = spellSuccess(spell, caster, target);
         if (statChangeSuccess) {
           target[spell.statChanged] -= spell.effectivity;
         }
         spell.result.success.push(statChangeSuccess);
       }
     }
     ,AddStatus : {
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) {
         var statusSuccess = spellSuccess(spell, caster, target);
         if (statusSuccess) {
           target.addStatus(spell.status);
         }
         spell.result.status.push(statusSuccess ? spell.status : null);
         spell.result.died.push(statusSuccess && (Status.equals(spell.status, Status.Dead) || Status.equals(spell.status, Status.Stone)));
         spell.result.success.push(statusSuccess);
       }
     }
     ,AddStatus300Hp : {
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) {
        var statusSuccess = false;
        if (target.hitPoints <= 300 && !target.isProtectedFrom(spell.element)) {
          target.addStatus(spell.status);
          statusSuccess = true;
        }
        spell.result.success.push(statusSuccess);
        spell.result.status.push(statusSuccess ? spell.status : null);
       }
     }
     ,RemoveStatus : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         var statusSuccess = target.hasStatus(spell.status);
         target.removeStatus(spell.status);
         spell.result.success.push(statusSuccess);

         if (statusSuccess) {
           var remainingStatuses =  target.getStatuses();
           if (remainingStatuses.length == 0) {
             spell.result.clearStatuses = true;
           } else {
             spell.result.status.push(Status.lookup(remainingStatuses[remainingStatuses.length - 1]));
           }
         }
       }
     }
     ,ResistElement : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         var elementsResisted = [];
         if ($.isArray(spell.element)) {
           $.merge(elementsResisted, spell.element);
         } else {
           elementsResisted.push(spell.element);
         }

         $(elementsResisted).each(function() { target.protectFrom(this); });
       }
     }
     ,WeakToElement : {
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) {
         var elementsWeakTo = [];
         if ($.isArray(spell.element)) {
           $.merge(elementsWeakTo, spell.element);
         } else {
           elementsWeakTo.push(spell.element);
         }

         $(elementsWeakTo).each(function() { target.weakTo(this, true); });
       }
     }
     ,HitMultiplierUp : {
       targetGroup : SpellConstants.TargetGroup.Same
      ,apply : function(spell, caster, target) {
         target.hitMultiplier += parseInt(spell.hitMultiplierChange, 10);
         if (target.hitMultiplier > 2) {
           target.hitMultiplier = 2;
         }
         spell.result.success.push(true);
       }
     }
     ,HitMultiplierDown : {
       targetGroup : SpellConstants.TargetGroup.Other
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
       targetGroup : SpellConstants.TargetGroup.Other
      ,apply : function(spell, caster, target) { alert("This spell does not work yet [" + spell.spellId + "]"); }
     }
     ,Teleport : {
       targetGroup : SpellConstants.TargetGroup.None
      ,apply : function(spell, caster, target) { alert("This spell does not work yet [" + spell.spellId + "]"); }
     }
    };

    self.SpellBase = function(opt) {
      if (!opt) {
        return;
      }
      var base = opt.base || {};
      var stats = opt.stats || {};
      var allowedClasses = opt.allowedClasses || [];
      var ui = $.extend({effect:"", backgroundColor:"black", splash:""}, opt.ui);
      var affects = opt.affects || [];

      this.spellLevel = base.level;
      this.spellId = base.name.toUpperCase();
      this.spellType = base.type;
      this.targetType = base.target;
      this.isSkill = base.isSkill;
      this.price = base.price;

      this.effectivity = stats.eff;
      this.accuracy = stats.acc;
      this.statChanged = stats.statChanged;
      this.element = stats.element;
      this.status = stats.status;
      this.hitMultiplierChange = stats.hitMultiplierChange;

      this.allowedClasses = $.merge([],allowedClasses);

      this.isAlreadyApplied = opt.isAlreadyApplied; // function

      this.result = {};
      this.result.success = [];

      this.effect = ui.effect;
      this.backgroundColor = ui.bgColor;
      this.splash = ui.splash;
      this.message = ui.message;
      this.overlay = !!ui.overlay;

      this.affects = $.merge([], affects);

      self.ALL[this.spellId] = this;
    };

    self.SpellBase.prototype.cast = function(source, target) { this.targetType.apply(this, source, target); }
    self.SpellBase.prototype.applyToTarget = function(caster, target) { this.spellType.apply(this, caster, target); };
    self.SpellBase.prototype.isSingleTarget = function() { return this.targetType.id == "single"; };
    self.SpellBase.prototype.isAllTarget = function() { return this.targetType.id == "all"; };
    self.SpellBase.prototype.isSelfTarget = function() { return this.targetType.id == "self"; };
    self.SpellBase.prototype.isSameTargetGroup = function() { return this.spellType.targetGroup.id == "same"; };
    self.SpellBase.prototype.isOtherTargetGroup = function() { return this.spellType.targetGroup.id == "other"; };
    self.SpellBase.prototype.affectsTarget = function(target) {
      // If the spell does not have any affects defined, assume the target can be affected
      if (!this.affects || this.affects.length == 0) {
        return true;
      }
      // The spell affects something specific, but the target does not have a type,
      // assume the target will NOT be affected
      if (!target.types || target.types.length == 0) {
        return false;
      }

      for (var i = 0; i < target.types.length; i++) {
        for (var j = 0; j < this.affects.length; j++) {
          if (this.affects[j] == target.types[i]) {
            return true;
          }
        }
      }

      return false;
    };

    self.create = function(opt) { return new self.SpellBase(opt); };
    self.lookup = function(spellId) { return self.ALL[spellId]; };

    return self;
  }).call({});
});