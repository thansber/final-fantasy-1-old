define( 
/* SpellConstants */
["jquery"],
function($) {
  
  var effects = {
    Beam : "beam"
   ,Death : "death"
   ,Flame : "flame"
   ,Heal : "healing"
   ,Poof : "poof"
   ,Protect : "protect"
   ,Star : "star"
   ,Status : "status"
  };
  
  var groups = {
    Same:{id:"same"}
   ,Other:{id:"other"}
   ,None:{id:"none"}
  };
  
  var targets = {
    Single:{
      id : "single"
     ,apply : function(spell, caster, target) { spell.applyToTarget(caster, target); }
    }
   ,All:{
     id:"all"
    ,apply : function(spell, caster, targets) {
       var spellTargets = [];
       if (!$.isArray(targets)) {
         spellTargets = $.makeArray(targets);
       } else {
         spellTargets = $.merge([], targets);
       }
       $(spellTargets).each(function() {
         if (!this.isDead()) {
           spell.applyToTarget(caster, this);
         }
       });
     }
   }
   ,Self:{
      id:"self"
     ,apply : function(spell, caster) { spell.applyToTarget(caster, caster); }
    }
  };
  

  return {
    Effects : effects
   ,TargetGroup : groups
   ,TargetType : targets
  };
});