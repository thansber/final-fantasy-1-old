define(
/* BattleConstants */
function() {
  
  var actions = {
    Attack : "attack"
   ,CastSpell : "spell"
   ,Drink : "drink"
   ,UseItem : "item"
   ,Run : "run"
   ,StatusHeal : "statusHeal"
  };
    
  var commands = {
    Party : "party"
   ,Enemy : "enemy"
  };
  
  var targets = {
    All : "all"
   ,Single : "single"
  };
  
  return {
    Actions : actions
   ,Commands : commands
   ,Targets : targets
   
   ,AmbushMessage : "Monsters strike first"
   ,PreemptiveMessage : "Chance to strike first"
  };
});