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
  
  return {
    Fire : ALL.Fire
   ,Ice : ALL.Ice
   ,Lightning : ALL.Lightning
   ,Earth : ALL.Earth
   ,Death : ALL.Death
   ,Time : ALL.Time
   ,PoisonStone : ALL.PoisonStone
   ,Status : ALL.Status
   ,AllElements : [ALL.Fire, ALL.Ice, ALL.Lightning, ALL.Earth, ALL.Death, ALL.Time, ALL.PoisonStone, ALL.Status]
  };
})();

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
  ALL[SLEEP] = {id:SLEEP, desc:"Asleep"};
  ALL[MUTE] = {id:MUTE, desc:"Silenced", battleText:"Mute", canTakeAction:true};
  ALL[CONFUSE] = {id:CONFUSE, desc:"Confused"}; // TODO: can a confused char select an action?
  
  var ALL_STATUSES = jQuery.map(ALL, function(status, id) { return status; });
  var ALL_EXCEPT_DEAD = jQuery.merge([], ALL_STATUSES); 
  ALL_EXCEPT_DEAD.shift();
  
  return {
    Dead : ALL[DEAD]
   ,Stone : ALL[STONE]
   ,Poison : ALL[POISON]
   ,Blind : ALL[BLIND]
   ,Paralysis : ALL[PARALYSIS] 
   ,Sleep : ALL[SLEEP]
   ,Mute : ALL[MUTE]
   ,Confuse : ALL[CONFUSE]
   ,AllStatuses : ALL_STATUSES
   ,AllExceptDead : ALL_EXCEPT_DEAD
   ,equals : function(status1, status2) { return status1.id == status2.id; }
   ,lookup : function(id) { return ALL[id]; }
  };
})();