define( 
/* Spell */ 
["jquery", "spells"], 
function($, Spell) { 
    
  var ALL = {};
    
  var Skill = function(opt) {
    opt.base.level = 0;
    opt.base.isSkill = true;
    Spell.SpellBase.call(this, opt);
    ALL[opt.base.name] = this;
  };
  Skill.prototype = new Spell.SpellBase();
    
  return {
    create : function(opt) { return new Skill(opt); }
   ,lookup : function(skillId) { return ALL[skillId]; }
  };
});