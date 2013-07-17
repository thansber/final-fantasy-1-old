define( /* Status */ ["jquery"], function($) {
  
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
  
  var ALL_STATUSES = $.map(ALL, function(status, id) { return status; });
  var ALL_EXCEPT_DEAD = $.merge([], ALL_STATUSES); 
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
   ,All : ALL_STATUSES
   ,AllExceptDead : ALL_EXCEPT_DEAD
  
   ,equals : function(status1, status2) { return status1.id == status2.id; }
   ,lookup : function(id) { return ALL[id]; }
  }
});