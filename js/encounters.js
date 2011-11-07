var Encounter = (function() {
 
  var self = this;
  var current = null;
  
  var ALL = {};
  
  var addEncounter = function(type, enemies) {
    if (!current[type]) {
      current[type] = [];
    }
    var encounterEnemies = [];
    for (var e in enemies) {
      var enemy = enemies[e];
      var min = 0;
      var max = 0;
      if (enemy.qty) {
        var qty = enemy.qty.split("-");
        if (qty.length > 1) {
          min = qty[0];
          max = qty[1];
        } else {
          min = enemy.qty;
          max = enemy.qty;
        }
      } else {
        min = enemy.min;
        max = enemy.max;
      }
    
      encounterEnemies.push({name:enemy.name, min:+min, max:+max});
    }
    
    current[type].push(encounterEnemies);
  };
   
  /* ============== */
  /* PUBLIC METHODS */
  /* ============== */
  self.create = function(mapId) {
    ALL[mapId] = {};
    current = ALL[mapId];
    return self;
  };
  
  self.area = function(areaId) {
    current[areaId] = {};
    current = current[areaId];
    return self;
  };
  
  self.common = function(enemies) {
    addEncounter("common", enemies);
    return self;
  };
  
  self.uncommon = function(enemies) {
    addEncounter("uncommon", enemies);
    return self;
  };
  
  self.rare = function(enemies) {
    addEncounter("rare", enemies);
    return self;
  };
  
  self.veryrare = function(enemies) {
    addEncounter("veryrare", enemies);
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
          s += "  " + jQuery.map(encounters[encType.name][e], enemyQtyToString).join(", ") + "\n";
        }
      }
    }
    
    return s;
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
    
    var enemies = [];
    for (var e in encounter) {
      var enemy = encounter[e];
      enemies.push({name:enemy.name, qty:RNG.randomUpTo(enemy.max, enemy.min)});
    }
    return enemies;
  };
  
  /*
   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Overworld (4,4)
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Formations (NES)                         Formations (PSX)
----------------                         ----------------

(12/64) 00-1 IMP       3-5               (12/64) 00-1 Goblin          3-5
(12/64) 00-1 IMP       3-5               (12/64) 00-1 Goblin          3-5
(12/64) 00-1 IMP       3-5               (12/64) 00-1 Goblin          3-5
(12/64) 00-1 IMP       3-5               (12/64) 00-1 Goblin          3-5
 (6/64) 02-2 GrIMP     1-3                (6/64) 02-2 Goblin Guard    1-3
 (6/64) 03-1 WOLF      1-2                (6/64) 03-1 Wolf            1-2
 (3/64) 06-1 MADPONY    1                 (3/64) 06-1 Crazy Horse      1
 (1/64) 00-2 IMP       3-6                (1/64) 00-2 Goblin          3-6
              GrIMP    0-4                             Goblin Guard   0-4

   */
  
  return this;
}).call({});