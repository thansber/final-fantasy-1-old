var Encounter = (function() {
 
  var self = this;
  var currentMap = null;
  var currentArea = null;
  
  var ALL = {};
  var FORMATIONS = {};
  var DEFAULT_SURPRISE = 4;
  
  var addEncounter = function(type, formations) {
    if (!currentArea[type]) {
      currentArea[type] = [];
    }
    if (!jQuery.isArray(formations)) {
      formations = [formations];
    }
    
    for (var f in formations) {
      var formation = FORMATIONS[formations[f]];
      var encounter = parseFormation(formation);
      currentArea[type].push(encounter);
    }
  };
  
  var parseFormation = function(formation) {
    var encounter = {
      enemies: []
     ,surprise: formation.surprise
     ,runnable: formation.runnable
    };
    
    for (var e in formation.enemies) {
      var enemy = formation.enemies[e];
      var enemyQty = enemy.split(" ");
      var min = -1;
      var max = -1;
      var name = "";
      if (enemyQty.length == 1) { // e.g. ANKYLO
        name = enemy;
        min = 1;
        max = 1;
      } else {
        var qtyRange = enemyQty[enemyQty.length - 1].split("-");
        if (qtyRange.length == 1) {
          if (isNaN(qtyRange[0])) { // e.g. Sand W
            min = 1;
            max = 1;
            name = enemyQty.join(" ");
          } else { // e.g. PIRATE 9
            min = qtyRange[0];
            max = qtyRange[0];
            name = enemyQty.slice(0, -1).join(" ");
          }
        } else { // e.g. Blue D 2-4
          min = qtyRange[0];
          max = qtyRange[1];
          name = enemyQty.slice(0, -1).join(" ");
        }
      }
      encounter.enemies.push({name:name, min:+min, max:+max});
    }
    
    return encounter;
  };
    

  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.Formation = function(id, enemies, opt) {
    if (!id || !enemies) {
      return;
    }
    opt = opt || {};
    this.id = id;
    this.enemies = enemies;
    this.surprise = +opt.surprise || DEFAULT_SURPRISE;
    this.runnable = opt.runnable === undefined ? true : opt.runnable;
    
    FORMATIONS[id] = this;
  };
  
  self.lookupFormation = function(id) {
    return FORMATIONS[id];
  };
  
  self.Steps = {};
  self.Steps["world-map"] = {min:3, max:7}; //{min:11, max:40};
  self.Steps["ocean"] = {min:30, max:124};
  self.Steps["dungeon"] = {min:11, max:46};
  
  // Encounter Table creation functions
  self.create = function(mapId) {
    ALL[mapId] = {};
    currentMap = ALL[mapId];
    return self;
  };
  
  self.area = function(areaId) {
    currentMap[areaId] = {};
    currentArea = currentMap[areaId];
    return self;
  };
  
  self.common = function(formations) {
    addEncounter("common", formations);
    return self;
  };
  
  self.uncommon = function(formations) {
    addEncounter("uncommon", formations);
    return self;
  };
  
  self.rare = function(formations) {
    addEncounter("rare", formations);
    return self;
  };
  
  self.veryrare = function(formations) {
    addEncounter("veryrare", formations);
    return self;
  };
  
  self.toString = function(map, area) {
    var s = "";
    s += map + " - " + area;
    
    var encounters = ALL[map][area];
    
    if (!encounters) {
      s += " - NOT FOUND";
    } else {
      var enemyQtyToString = function(val) {
        return val.name + " x" + val.min + (val.max == val.min ? "" : "-" + val.max);
      };
      
      var encounterTypes = [
       {name:"common", chance:"12"}
      ,{name:"uncommon", chance:"6"}
      ,{name:"rare", chance:"3"}
      ,{name:"veryrare", chance:"1"}
      ];
      
      s += "\n";
      for (var i in encounterTypes) {
        var encType = encounterTypes[i];
        s += encType.name + " encounters (" + encType.chance + "/64):\n";
        for (var e in encounters[encType.name]) {
          var encounter = encounters[encType.name][e];
          s += "  " 
            + jQuery.map(encounter.enemies, enemyQtyToString).join(", ") 
            + (encounter.runnable ? "" : " unrunnable")
            + (encounter.surprise > DEFAULT_SURPRISE ? ", surprise=" + encounter.surprise : "")
            + "\n";
        }
      }
    }
    
    return s;
  };

  self.formationToEncounter = function(formation) {
    return self.generateEnemies(parseFormation(formation));
  };
  
  self.generateEnemies = function(encounter) {
    var enemies = [];
    for (var e in encounter.enemies) {
      var enemy = encounter.enemies[e];
      enemies.push({name:enemy.name, qty:RNG.randomUpTo(enemy.max, enemy.min)});
    }
    return {enemies:enemies, surprise:encounter.surprise, runnable:encounter.runnable};
  };
  
  self.random = function(map, area) {
    var encounters = ALL[map][area];
    var r = RNG.randomUpTo(64);
    var encounter = null;
    
    if (r == 64) {
      encounter = encounters.veryrare[0];
    } else if (r > 60) {
      encounter = encounters.rare[0];
    } else if (r > 48) {
      encounter = encounters.uncommon[Math.floor((r - 1) % 48 / 6)];
    } else {
      encounter = encounters.common[Math.floor((r - 1) / 12)];
    }
    
    return self.generateEnemies(encounter);
  };
  
  return this;
}).call({});