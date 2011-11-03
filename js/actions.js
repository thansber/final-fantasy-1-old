var Action = (function() {

  /* ========= */
  /* CONSTANTS */
  /* ========= */
  this.AUTO_HIT = 1;
  this.AUTO_MISS = 201;

  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var healParalysis = function(source, type) { return (type == BattleCommands.Party) ? RNG.percent(25) : RNG.percent(9.8); };
  
  /* ======================================================== */
  /* PUBLIC METHODS ----------------------------------------- */
  /* ======================================================== */
  this.attack = function(source, target) {
    
    var baseChanceToHit = 168;
    var numHits = source.numHits();
    var numConnectedHits = 0;
    var hitSuccess = false;
    var critSuccess = false;
    var anyHitCritical = false;
    var totalDamage = 0;
    var statusApplied = null;
    
    var baseResult = {type:"A", source:source, target:target};
    
    if (source.isDead()) {
      return null;
    }
    
    if (target.isDead()) {
      return jQuery.extend({}, baseResult, {wasDead:true});
    }
    
    if (source.hasStatus(Status.Blind)) {
      baseChanceToHit -= 40;
    }

    if (target.hasStatus(Status.Blind)) {
      baseChanceToHit += 40;
    }

    var isTargetWeakToSourceAttack = false;
    
    // See if the source attacks using an element the target is weak to 
    jQuery.each(Element.AllElements, function(i, element) {
      if (source.attacksWithElement(element) && target.isWeakToElement(element)) {
        isTargetWeakToSourceAttack = true;
        return false;
      }
    });
    
    jQuery.each(Monster.Types, function(i, type) {
      if (source.isStrongAgainstMonsterType(type) && target.isMonsterType(type)) {
        isTargetWeakToSourceAttack = true;
        return false;
      }
    });

    if (isTargetWeakToSourceAttack) {
      baseChanceToHit += 40;
    }
    
    // if target is asleep/paralyzed, ignore evasion
    var chanceToHit = baseChanceToHit + source.hitPercent();
    var hitPercentLog = baseChanceToHit + "+" + source.hitPercent();
    if (!target.hasStatus(Status.Sleep) && !target.hasStatus(Status.Paralysis)) {
      chanceToHit -= target.evasion();
      hitPercentLog += "-" + target.evasion();
    }
    
    for (var i = 0; i < numHits; i++) {
      var attackLog = "";
      var r = RNG.randomUpTo(this.AUTO_MISS);
      if (r == this.AUTO_HIT) {
        hitSuccess = true;
        critSuccess = true;
      } else if (r == this.AUTO_MISS) {
        hitSuccess = false;
        critSuccess = false;
      } else {
        hitSuccess = (r <= chanceToHit);
        critSuccess = (r <= source.critical());
      }
      
      attackLog = source.getName() + " attack #" + (i + 1) + " - "
        + (hitSuccess ? (critSuccess ? "CRITICAL " : "") + "HIT" : "MISS")
        + "=[hit%=" + chanceToHit + "(" + hitPercentLog + ")"
        + ",rnd=" + r + "]";
        
      if (hitSuccess) {
        numConnectedHits++;
        
        var sourceAttack = source.attack();
        if (isTargetWeakToSourceAttack) {
          sourceAttack += 4;
        }
        if (target.hasStatus(Status.Sleep) || target.hasStatus(Status.Paralysis)) {
          sourceAttack *= 1.25;
        }
        var a = RNG.randomUpTo(Math.floor(2 * sourceAttack), Math.floor(sourceAttack));
        var damage = a - target.defense();

        if (critSuccess) {
          anyHitCritical = true;
          damage += a;
        }
        damage = (damage <= 0 ? 1 : damage);
        totalDamage += damage;
        
        attackLog += " DMG=[" + damage + "(" + a + "-" + target.defense() + "),dmg range=" + Math.floor(sourceAttack) + "-" + Math.floor(2 * sourceAttack) + "]";
        
        // See if a status should be applied
        if (source.getStatusAttack() != null) {
          var statusLog = "";
          var baseStatusChance = 100;
          jQuery.each(Element.AllElements, function(i, element) {
            if (source.attacksWithElement(element) && target.isProtectedFrom(element)) {
              baseStatusChance = 0;
              return false;
            }
          });
          
          statusLog += " ST=[";
          var st = RNG.randomUpTo(this.AUTO_MISS);
          if (st <= (baseStatusChance - target.magicDefense())) {
            statusApplied = source.getStatusAttack();
            target.addStatus(source.getStatusAttack());
            statusLog += "HIT(" + st + "<=" + baseStatusChance + "-" + target.magicDefense() + ") " + statusApplied.desc;
          } else {
            statusLog += "MISS(" + st + "<=" + baseStatusChance + "-" + target.magicDefense() + ")";
          }
          statusLog += "]";
          attackLog += statusLog;
        }
      }
      
      console.log(attackLog);
    }
    
    totalDamage = Math.floor(totalDamage);
    target.applyDamage(totalDamage);
    var attackResult = {
      hits: numConnectedHits
     ,dmg: totalDamage
     ,crit: anyHitCritical
     ,died: target.isDead()
     ,status: statusApplied
     ,targetHp: target.hitPoints 
    };
    return jQuery.extend({}, baseResult, attackResult);
  };
  
  this.castSpell = function(source, spellId, target, opt) {
    
    if (source.isDead()) {
      return null;
    }
    
    opt = opt || {};
    var spell = jQuery.extend(true, {}, Spell.lookup(spellId));
    var usingItem = (opt.item != null);
    
    if (!usingItem && !source.canCastSpell(spell)) {
      return null;
    }
    
    var targets = (!jQuery.isArray(target) ? jQuery.makeArray(target) : jQuery.merge([], target));
    var spellTargets = [];
    jQuery(targets).each(function() { 
      if (!this.isDead()) {
        spellTargets.push(this);
      }
    });
    
    console.log("Casting " + spellId + (usingItem ? "(using " + opt.item.name + ")" : "") + " on " + targets.length + " target(s), " + spellTargets.length + " of which are valid");
    
    if (!usingItem) {
      source.useSpellCharge(spell.spellLevel);
    }
    // Anything that gets set on the spell.result needs to be reset here, otherwise
    // previous data gets carried over
    spell.result.dmg = [];
    spell.result.died = [];
    spell.result.targetHp = [];
    spell.result.status = [];
    spell.result.ineffective = false;
    spell.result.clearStatuses = false;
    spell.cast(source, target);
    
    // Spell was cast on a single dead person
    if (spellTargets.length == 0 && target != null) {
      spellTargets.push(target);
      spell.result.ineffective = true;
    }
    
    var baseSpellResult = {
      type:"S"
     ,source:source
     ,target:spellTargets
     ,spell:spell
     ,dmg:0
    };
    var spellAction = jQuery.extend(baseSpellResult, spell.result);
    if (usingItem) {
      spellAction.type = "I";
      spellAction.item = opt.item;
    }
    return spellAction; 
  };
  
  this.statusHeal = function(source, type) {
    var result = {type:"SH", source:source};
    if (source.hasStatus(Status.Paralysis)) {
      var success = (type == BattleCommands.Party) ? RNG.percent(25) : RNG.percent(9.8);
      result = jQuery.extend(result, {status:Status.Paralysis, success:success});
    } else if (source.hasStatus(Status.Confuse)) {
      result = jQuery.extend(result, {status:Status.Confuse, success:RNG.percent(25)});
    } else if (source.hasStatus(Status.Sleep)) {
      var success = source.getMaxHitPoints() > 80 || RNG.randomUpTo(80, 0) < source.getMaxHitPoints(); 
      result = jQuery.extend(result, {status:Status.Sleep, success:success});
    }
    
    if (result.success) {
      source.removeStatus(result.status);
    }
    
    if (result.status) {
      console.log(source.getName() + " is trying to be healed from [" + result.status.id + "] - " + (result.success ? "SUCCESS" : "FAIL"));
    }
    
    // if the source was already healed, return null
    return result.status ? result : null;
  };
  
  return this;
}).call({});