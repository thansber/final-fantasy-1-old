define( 
/* SkillData */
["jquery", "elements", "skills", "spells", "statuses", "../constants/spell"], 
function($, Element, Skill, Spell, Status, SpellConstants) {

  var init = function() {
    // --------------
    // Monster skills
    // --------------
    Skill.create({
      base:{name:"FROST", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:24, acc:32, element:Element.Ice}});
    Skill.create({
      base:{name:"HEAT", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:12, acc:32, element:Element.Fire}});
    Skill.create({
      base:{name:"GLANCE", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:5, element:Element.PoisonStone, status:Status.Stone}});
    Skill.create({
      base:{name:"GAZE", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:0, element:Element.Status, status:Status.Paralysis}});
    Skill.create({
      base:{name:"FLASH", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
    Skill.create({
      base:{name:"SCORCH", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:7, acc:32, element:Element.Fire}});
    Skill.create({
      base:{name:"CRACK", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:16, element:Element.Earth, status:Status.Dead}});
    Skill.create({
      base:{name:"SQUINT", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:0, element:Element.Death, status:Status.Dead}});
    Skill.create({
      base:{name:"STARE", target:SpellConstants.TargetType.Single, type:Spell.SpellType.Damage}
     ,stats:{eff:17, acc:24}});
    Skill.create({
      base:{name:"GLARE", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:16, element:Element.Time, status:Status.Dead}});
    Skill.create({
      base:{name:"BLIZZARD", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:50, acc:32, element:Element.Ice}});
    Skill.create({
      base:{name:"BLAZE", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:64, acc:32, element:Element.Fire}});
    Skill.create({
      base:{name:"INFERNO", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:96, acc:32, element:Element.Fire}});
    Skill.create({
      base:{name:"CREMATE", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:24, acc:32, element:Element.Fire}});
    Skill.create({
      base:{name:"POISON", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:5, element:Element.PoisonStone, status:Status.Stone}});
    Skill.create({
      base:{name:"TRANCE", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:0, status:Status.Paralysis}});
    Skill.create({
      base:{name:"POISON G", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:68, acc:32, element:Element.PoisonStone}});
    Skill.create({
      base:{name:"THUNDER", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:76, acc:32, element:Element.Lightning}});
    Skill.create({
      base:{name:"TOXIC", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:0, element:Element.Death, status:Status.Dead}
     ,ui:{message:"Poison smoke"}});
    Skill.create({
      base:{name:"SNORTING", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
    Skill.create({
      base:{name:"NUCLEAR", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:80, acc:48}});
    Skill.create({
      base:{name:"INK", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
    Skill.create({
      base:{name:"STINGER", target:SpellConstants.TargetType.All, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:0, element:Element.PoisonStone, status:Status.Poison}});
    Skill.create({
      base:{name:"DAZZLE", target:SpellConstants.TargetType.Single, type:Spell.SpellType.AddStatus}
     ,stats:{eff:0, acc:32, element:Element.Status, status:Status.Paralysis}});
    Skill.create({
      base:{name:"SWIRL", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:64, acc:32}});
    Skill.create({
      base:{name:"TORNADO", target:SpellConstants.TargetType.All, type:Spell.SpellType.Damage}
     ,stats:{eff:64, acc:32}});
  };
  
  return {
    init : init
  };
});