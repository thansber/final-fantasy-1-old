var Target = (function() {
  
  function Target() {};
  
  Target.prototype.addStatus = function(status) { alert("A sub-class of this needs to override the addStatus(status) method"); };
  Target.prototype.applyDamage = function(dmg) { alert("A sub-class of this needs to override the applyDamage(dmg) method"); };
  Target.prototype.attack = function() { alert("A sub-class of this needs to override the attack() method"); };
  Target.prototype.attacksWithElement = function(elem) { alert("A sub-class of this needs to override the attacksWithElement(elem) method"); };
  Target.prototype.canCastSpell = function(spell) { alert("A sub-class of this needs to override the canCastSpell(spell) method"); };
  Target.prototype.critical = function() { alert("A sub-class of this needs to override the critical() method"); };
  Target.prototype.evasion = function() { alert("A sub-class of this needs to override the evasion() method"); };
  Target.prototype.getMaxHitPoints = function() { alert("A sub-class of this needs to override the getMaxHitPoints() method"); };
  Target.prototype.getName = function() { alert("A sub-class of this needs to override the getName() method"); };
  Target.prototype.getStatusAttack = function() { alert("A sub-class of this needs to override the getStatusAttack() method"); };
  Target.prototype.hasStatus = function(status) { alert("A sub-class of this needs to override the hasStatus(status) method"); };
  Target.prototype.hitPercent = function() { alert("A sub-class of this needs to override the hitPercent() method"); };
  Target.prototype.isDead = function() { alert("A sub-class of this needs to override the isDead() method"); };
  Target.prototype.isMonsterType = function(type) { alert("A sub-class of this needs to override the isMonsterType(type) method"); };
  Target.prototype.isProtectedFrom = function(elem) { alert("A sub-class of this needs to override the isProtectedFrom(elem) method"); };
  Target.prototype.isStrongAgainstMonsterType = function(type) { alert("A sub-class of this needs to override the strongAgainstMonsterType(type) method"); }
  Target.prototype.isWeakToElement = function(elem) { alert("A sub-class of this needs to override the isWeakToElement(elem) method"); };
  Target.prototype.magicDefense = function() { alert("A sub-class of this needs to override the magicDefense() method"); };
  Target.prototype.numHits = function() { alert("A sub-class of this needs to override the numHits() method"); };
  Target.prototype.removeStatus = function(status) { alert("A sub-class of this needs to override the removeStatus(status) method"); };
  Target.prototype.useSpellCharge = function(spellLevel) { alert("A sub-class of this needs to override the useSpellCharge(spellLevel) method"); };
  
  this.create = function() { return new Target(); };
 
  return this;  
}).call({});