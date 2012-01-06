define( 
/* Spell */ 
["jquery", "spells"], 
function($, Spell) { 

  return (function() {
    
    this.ALL = {};
    
    Skill.prototype = new Spell.SpellBase();
    function Skill(opt) {
      opt.base.level = 0;
      opt.base.isSkill = true;
      Spell.SpellBase.call(this, opt);
    };
    
    this.create = function(opt) { return new Skill(opt); };
    this.lookup = function(skillId) { return this.ALL[skillId]; };
    
    return this;
  }).call({});
});