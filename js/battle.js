define( /* Battle */
["jquery", "logger", "monster", "party", "rng"],
function($, Logger, Monster, Party, RNG) {

  var restrictions = {small:9, large:4, fiend:1, chaos:1, mixed:{small:6, large:2, fiend:0, chaos:0}};
  
  var calculateSurprise = function(battle) {
    
    if (!battle.runnable) {
      Logger.debug("encounter is not runnable, normal battle");
      return;
    }
    
    var leader = null; 
    $.each(Party.getChars(), function(i, char) { 
      if (char.isAlive()) { 
        leader = char;
        return false;
      } 
    });
    var leaderQuickness = Math.floor((leader.agility + leader.luck) / 8);
    var r = RNG.randomUpTo(100, leaderQuickness);
    var result = r + leaderQuickness - battle.surprise;
    if (result < 0) {
      result = 0;
    }
    
    Logger.info("SURPRISE = (leader quick + random - surprise) " + leaderQuickness + " + " + r + " - " + battle.surprise + " = " + result);
        
    return result;    
  };
  
  var isSetupValid = function(battle) {
    var enemiesBySize = battle.enemiesBySize;
    if (battle.isMixedSize()) {
      var isValid = 
        enemiesBySize.small.enemies.length <= restrictions.mixed.small && 
        enemiesBySize.large.enemies.length <= restrictions.mixed.large &&
        enemiesBySize.fiend.enemies.length <= restrictions.mixed.fiend;
      if (!isValid) {
        alert("Mixed enemies found, must have less than " + restrictions.mixed.small + " small, " + restrictions.mixed.large + " large, and " + restrictions.mixed.fiend + " enemies");
      }
      return isValid;
    }
    
    for (var s in enemiesBySize) {
      if (enemiesBySize[s].enemies.length > restrictions[s]) {
        alert("Too many " + s  + " enemies [" + enemiesBySize[s].enemies.length + "], must be less than [" + restrictions[s] + "]");
        return false;
      }
    }
    return true;
  };
  
  var setupEnemiesByName = function(enemyQuantities) {
    if (!enemyQuantities || $.isEmptyObject(enemyQuantities)) {
      return false;
    }
    
    var enemiesByName = {};
    $.each(enemyQuantities, function(i, enemyObj) {
      var enemy = Monster.lookup(enemyObj.name);
      var enemyQty = enemyObj.qty == null ? 1 : enemyObj.qty;
      
      if (!enemiesByName[enemy.getName()]) {
        enemiesByName[enemy.getName()] = [];
      }
      
      for (var i = 0; i < enemyQty; i++) {
        enemiesByName[enemy.getName()].push(Monster.createForBattle(enemy));
      }
    });
    
    return enemiesByName;
  };
  
  var setupEnemiesBySize = function(enemyQuantities) {
    if (!enemyQuantities || $.isEmptyObject(enemyQuantities)) {
      return false;
    }
    var sizeCounts = {chaos:{enemies:[]}, fiend:{enemies:[]}, large:{enemies:[]}, small:{enemies:[]}};
    $.each(enemyQuantities, function(i, enemyObj) {
      var enemy = Monster.lookup(enemyObj.name);
      var enemyQty = enemyObj.qty == null ? 1 : enemyObj.qty;
      for (var i = 0; i < enemyQty; i++) {
        sizeCounts[enemy.size].enemies.push(enemyObj.name);
      }
    });
    
    return sizeCounts;
  };
  
  var Battle = function(opt) {
    opt = opt || {};
    this.party = opt.party || {};
    this.enemiesBySize = setupEnemiesBySize(opt.enemies) || {};
    this.enemiesByName = setupEnemiesByName(opt.enemies) || {};
    this.commands = [];
    this.background = opt.background;
    this.ambush = false;
    this.preemptive = false;
    this.surprise = opt.surprise == null ? 0 : opt.surprise;
    this.isStarted = false;
    this.runnable = opt.runnable == null ? true : opt.runnable;
    this.moveFirstChar = !opt.doNotMove;
    
    var surpriseResult = calculateSurprise(this);
    if (surpriseResult <= 10) {
      this.ambush = true;
    } else if (surpriseResult >= 90) {
      this.preemptive = true;
    }
    
    if (!isSetupValid(this)) {
      return null;
    }
  };
  
  Battle.prototype.getRestrictions = function() { return this.isMixedSize() ? restrictions.mixed : restrictions; };
  Battle.prototype.isAmbush = function() { return !this.isStarted && this.ambush; };
  Battle.prototype.isPreemptive = function() { return !this.isStarted && this.preemptive; };
  
  Battle.prototype.isMixedSize = function() {
    var numSizes = 0;
    if (this.enemiesBySize.small.enemies.length > 0) { numSizes++; } 
    if (this.enemiesBySize.large.enemies.length > 0) { numSizes++; }
    if (this.enemiesBySize.fiend.enemies.length > 0) { numSizes++; }
    return numSizes > 1;
  };
  
  Battle.prototype.lookupEnemy = function(name, index) {
    var enemies = this.enemiesByName[name];
    if (enemies) {
      return enemies[index == null ? 0 : index];
    }
    return null;
  };
  Battle.prototype.started = function() { this.isStarted = true; };
  
  return {
    create : function(opt) { return new Battle(opt); }
  };
});