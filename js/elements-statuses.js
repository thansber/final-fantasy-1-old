var Element = (function() {
  
  var ALL = {
    Fire : "fire"
   ,Ice : "ice"
   ,Lightning : "lit"
   ,Earth : "earth"
   ,Death : "death"
   ,Time : "time"
   ,PoisonStone : "poison/stone"
   ,Status : "status"
  };
  
  this.Fire = ALL.Fire
  this.Ice = ALL.Ice
  this.Lightning = ALL.Lightning
  this.Earth = ALL.Earth
  this.Death = ALL.Death
  this.Time = ALL.Time
  this.PoisonStone = ALL.PoisonStone
  this.Status = ALL.Status
  this.AllElements = [ALL.Fire, ALL.Ice, ALL.Lightning, ALL.Earth, ALL.Death, ALL.Time, ALL.PoisonStone, ALL.Status]

  
  return this;
}).call({});

var Status = (function() {
  
  var DEAD = "dead";
  var STONE = "stone";
  var POISON = "poison";
  var BLIND = "blind";
  var PARALYSIS = "paralysis";
  var SLEEP = "sleep";
  var MUTE = "mute";
  var CONFUSE = "confuse";
  
  var ALL = {};
  ALL[DEAD] = {id:DEAD, desc:"dead"};
  ALL[STONE] = {id:STONE, desc:"Petrified", battleText:"stone", shrunkBattleText:true};
  ALL[POISON] = {id:POISON, desc:"Poisoned", critical:true, battleText:"poison", shrunkBattleText:true, canTakeAction:true};
  ALL[BLIND] = {id:BLIND, desc:"Darkness", battleText:"Dark", canTakeAction:true};
  ALL[PARALYSIS] = {id:PARALYSIS, desc:"Paralyzed", critical:true, battleText:"Stun"};
  ALL[SLEEP] = {id:SLEEP, desc:"Asleep", critical:true, battleText:"asleep", shrunkBattleText:true};
  ALL[MUTE] = {id:MUTE, desc:"Silenced", battleText:"Mute", canTakeAction:true};
  ALL[CONFUSE] = {id:CONFUSE, desc:"Confused"}; 
  
  var ALL_STATUSES = jQuery.map(ALL, function(status, id) { return status; });
  var ALL_EXCEPT_DEAD = jQuery.merge([], ALL_STATUSES); 
  ALL_EXCEPT_DEAD.shift();
  
  this.Dead = ALL[DEAD];
  this.Stone = ALL[STONE];
  this.Poison = ALL[POISON];
  this.Blind = ALL[BLIND];
  this.Paralysis = ALL[PARALYSIS]; 
  this.Sleep = ALL[SLEEP];
  this.Mute = ALL[MUTE];
  this.Confuse = ALL[CONFUSE];
  this.AllStatuses = ALL_STATUSES;
  this.AllExceptDead = ALL_EXCEPT_DEAD;
  
  this.equals = function(status1, status2) { return status1.id == status2.id; }
  this.lookup = function(id) { return ALL[id]; }
  
  return this;
}).call({});