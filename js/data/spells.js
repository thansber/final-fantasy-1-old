// --------------
// Level 1 Spells
// --------------
Spell.create({
  base:{name:"CURE", level:1, target:Spell.TargetType.Single, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:16, acc:0}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"FOG", level:1, target:Spell.TargetType.Single, type:Spell.SpellType.StatUp}
 ,stats:{eff:8, acc:0, statChanged:"spellDef"}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HARM", level:1, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:20, acc:24}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]
 // TODO: add some way to specofy it only affects Undead
 });
Spell.create({
  base:{name:"RUSE", level:1, target:Spell.TargetType.Self, type:Spell.SpellType.StatUp}
 ,stats:{eff:80, acc:0, statChanged:"spellEvasion"}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"FIRE", level:1, target:Spell.TargetType.Single, type:Spell.SpellType.Damage}
 ,stats:{eff:10, acc:24, element:Element.Fire}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"LIT", level:1, target:Spell.TargetType.Single, type:Spell.SpellType.Damage}
 ,stats:{eff:10, acc:24, element:Element.Lightning}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"LOCK", level:1, target:Spell.TargetType.Single, type:Spell.SpellType.StatDown}
 ,stats:{eff:20, acc:64, statChanged:"spellEvasion"}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"SLEP", level:1, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Sleep}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 2 Spells
// --------------
Spell.create({
  base:{name:"ALIT", level:2, target:Spell.TargetType.All, type:Spell.SpellType.ResistElement}
 ,stats:{eff:0,acc:0, element:Element.Lightning},allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"INVS", level:2, target:Spell.TargetType.Single, type:Spell.SpellType.StatUp}
 ,stats:{eff:40, acc:0, statChanged:"spellEvasion"}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"LAMP", level:2, target:Spell.TargetType.Single, type:Spell.SpellType.RemoveStatus}
 ,stats:{eff:0, acc:0, element:Element.Status, status:Status.Blind}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"MUTE", level:2, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:64, status:Status.Mute}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"DARK", level:2, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"ICE", level:2, target:Spell.TargetType.Single, type:Spell.SpellType.Damage}
 ,stats:{eff:20, acc:24, element:Element.Ice}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"SLOW", level:2, target:Spell.TargetType.All, type:Spell.SpellType.HitMultiplierDown}
 ,stats:{eff:0, acc:64, element:Element.Status, hitMultiplierChange:-1}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"TMPR", level:2, target:Spell.TargetType.Single, type:Spell.SpellType.StatUp}
 ,stats:{eff:14, acc:0, statChanged:"spellAttack"}
 ,isAlreadyApplied:function() { return this.spellAttack > 0; }
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 3 Spells
// --------------
Spell.create({
  base:{name:"AFIR", level:3, target:Spell.TargetType.All, type:Spell.SpellType.ResistElement}
 ,stats:{eff:0,acc:0, element:Element.Fire}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"CUR2", level:3, target:Spell.TargetType.Single, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:33, acc:0}
 ,allowedClasses:[CharacterClass.KNIGHT, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HEAL", level:3, target:Spell.TargetType.All, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:12, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HRM2", level:3, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:40, acc:24}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]
 // TODO: add some way to specify it only affects Undead
 });
Spell.create({
  base:{name:"FIR2", level:3, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:30, acc:24, element:Element.Fire}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"HOLD", level:3, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:64, element:Element.Status, status:Status.Paralysis}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"LIT2", level:3, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:30, acc:24, element:Element.Lightning}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"LOK2", level:3, target:Spell.TargetType.All, type:Spell.SpellType.StatDown}
 ,stats:{eff:20, acc:40, statChanged:"spellEvasion"}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 4 Spells
// --------------
Spell.create({
  base:{name:"AICE", level:4, target:Spell.TargetType.All, type:Spell.SpellType.ResistElement}
 ,stats:{eff:0,acc:0, element:Element.Ice}
 ,allowedClasses:[CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"AMUT", level:4, target:Spell.TargetType.Single, type:Spell.SpellType.RemoveStatus}
 ,stats:{eff:0, acc:0, status:Status.Mute}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"FEAR", level:4, target:Spell.TargetType.All, type:Spell.SpellType.MoraleDown}
 ,stats:{eff:40, acc:24, element:Element.Status}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"PURE", level:4, target:Spell.TargetType.Single, type:Spell.SpellType.RemoveStatus}
 ,stats:{eff:0, acc:0, status:Status.Poison}
 ,allowedClasses:[CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"CONF", level:4, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:64, status:Status.Confuse}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"FAST", level:4, target:Spell.TargetType.Single, type:Spell.SpellType.HitMultiplierUp}
 ,stats:{eff:0, acc:0, hitMultiplierChange:1}
 ,isAlreadyApplied: function() { return this.hitMultiplier > 1; }
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"ICE2", level:4, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:40, acc:24, element:Element.Ice}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"SLP2", level:4, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:64, status:Status.Sleep}
 ,allowedClasses:[CharacterClass.NINJA, CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 5 Spells
// --------------
Spell.create({
  base:{name:"CUR3", level:5, target:Spell.TargetType.Single, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:66, acc:0}
 ,allowedClasses:[CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HEL2", level:5, target:Spell.TargetType.All, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:24, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HRM3", level:5, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:60, acc:24}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]
 // TODO: add some way to specify it only affects Undead
 });
Spell.create({
  base:{name:"LIFE", level:5, target:Spell.TargetType.Single, type:Spell.SpellType.NonBattle}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"BANE", level:5, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:40, element:Element.PoisonStone, status:Status.Dead}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"FIR3", level:5, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:50, acc:24, element:Element.Fire}
 ,allowedClasses:[CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"SLO2", level:5, target:Spell.TargetType.Single, type:Spell.SpellType.HitMultiplierDown}
 ,stats:{eff:0, acc:64, hitMultiplierChange:-1}
 ,allowedClasses:[CharacterClass.RED_MAGE, CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"WARP", level:5, target:Spell.TargetType.Single, type:Spell.SpellType.NonBattle}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 6 Spells
// --------------
Spell.create({
  base:{name:"EXIT", level:6, target:Spell.TargetType.Single, type:Spell.SpellType.NonBattle}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"FOG2", level:6, target:Spell.TargetType.All, type:Spell.SpellType.StatUp}
 ,stats:{eff:12, acc:0, statChanged:"spellDef"}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"INV2", level:6, target:Spell.TargetType.All, type:Spell.SpellType.StatUp}
 ,stats:{eff:40, acc:0, statChanged:"spellEvasion"}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"SOFT", level:6, target:Spell.TargetType.Single, type:Spell.SpellType.NonBattle}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"LIT3", level:6, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:60, acc:24, element:Element.Lightning}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"QAKE", level:6, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Earth, status:Status.Dead}
 ,allowedClasses:[CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"RUB", level:6, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Death, status:Status.Dead}
 ,allowedClasses:[CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"STUN", level:6, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus300Hp}
 ,stats:{eff:0, acc:0, element:Element.Status, status:Status.Paralysis}
 ,allowedClasses:[CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});

// --------------
// Level 7 Spells
// --------------
Spell.create({
  base:{name:"ARUB", level:7, target:Spell.TargetType.All, type:Spell.SpellType.ResistElement}
 ,stats:{eff:0, acc:0, element:[Element.Earth, Element.Status, Element.Death]}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"CUR4", level:7, target:Spell.TargetType.Single, type:Spell.SpellType.HpRecoveryFull}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HEL3", level:7, target:Spell.TargetType.All, type:Spell.SpellType.HpRecovery}
 ,stats:{eff:48, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"HRM4", level:7, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:80, acc:48}
 ,allowedClasses:[CharacterClass.WHITE_MAGE, CharacterClass.WHITE_WIZARD]
 // TODO: add some way to specify it only affects Undead
 });
Spell.create({
  base:{name:"BLND", level:7, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus300Hp}
 ,stats:{eff:0, acc:0, element:Element.Status, status:Status.Blind}
 ,allowedClasses:[CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"BRAK", level:7, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:64, element:Element.PoisonStone, status:Status.Stone}
 ,allowedClasses:[CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"ICE3", level:7, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:70, acc:24, element:Element.Ice}
 ,allowedClasses:[CharacterClass.RED_WIZARD, CharacterClass.BLACK_MAGE, CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"SABR", level:7, target:Spell.TargetType.Self, type:Spell.SpellType.StatUpMulti}
 ,stats:{eff:16, acc:40, statChanged:{eff:"spellAttack", acc:"spellHit"}}
 ,allowedClasses:[CharacterClass.BLACK_WIZARD]});

// --------------
// Level 8 Spells
// --------------
Spell.create({
  base:{name:"FADE", level:8, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:80, acc:107}
 ,allowedClasses:[CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"LIF2", level:8, target:Spell.TargetType.Single, type:Spell.SpellType.NonBattle}
 ,stats:{eff:0, acc:0}
 ,allowedClasses:[CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"WALL", level:8, target:Spell.TargetType.Single, type:Spell.SpellType.ResistElement}
 ,stats:{eff:0, acc:0, element:Element.AllElements}
 ,allowedClasses:[CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"XFER", level:8, target:Spell.TargetType.Single, type:Spell.SpellType.WeakToElement}
 ,stats:{eff:0, acc:107, element:Element.AllElements}
 ,allowedClasses:[CharacterClass.WHITE_WIZARD]});
Spell.create({
  base:{name:"NUKE", level:8, target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:100, acc:107}
 ,allowedClasses:[CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"STOP", level:8, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:48, element:Element.Time, status:Status.Paralysis}
 ,allowedClasses:[CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"XXXX", level:8, target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, element:Element.Death, status:Status.Dead}
 ,allowedClasses:[CharacterClass.BLACK_WIZARD]});
Spell.create({
  base:{name:"ZAP!", level:8, target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
   ,stats:{eff:0, acc:32, element:Element.Time, status:Status.Dead}
   ,allowedClasses:[CharacterClass.BLACK_WIZARD]});
 
  // --------------
// Monster skills
// --------------
Skill.create({
  base:{name:"FROST", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:24, acc:32, element:Element.Ice}});
Skill.create({
  base:{name:"HEAT", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:12, acc:32, element:Element.Fire}});
Skill.create({
  base:{name:"GLANCE", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:5, element:Element.PoisonStone, status:Status.Stone}});
Skill.create({
  base:{name:"GAZE", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, element:Element.Status, status:Status.Paralysis}});
Skill.create({
  base:{name:"FLASH", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
Skill.create({
  base:{name:"SCORCH", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:7, acc:32, element:Element.Fire}});
Skill.create({
  base:{name:"CRACK", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:16, element:Element.Earth, status:Status.Dead}});
Skill.create({
  base:{name:"SQUINT", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, element:Element.Death, status:Status.Dead}});
Skill.create({
  base:{name:"STARE", target:Spell.TargetType.Single, type:Spell.SpellType.Damage}
 ,stats:{eff:17, acc:24}});
Skill.create({
  base:{name:"GLARE", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:16, element:Element.Time, status:Status.Dead}});
Skill.create({
  base:{name:"BLIZZARD", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:50, acc:32, element:Element.Ice}});
Skill.create({
  base:{name:"BLAZE", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:64, acc:32, element:Element.Fire}});
Skill.create({
  base:{name:"INFERNO", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:96, acc:32, element:Element.Fire}});
Skill.create({
  base:{name:"CREMATE", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:24, acc:32, element:Element.Fire}});
Skill.create({
  base:{name:"POISON", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:5, element:Element.PoisonStone, status:Status.Stone}});
Skill.create({
  base:{name:"TRANCE", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, status:Status.Paralysis}});
Skill.create({
  base:{name:"POISON G", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:68, acc:32, element:Element.PoisonStone}});
Skill.create({
  base:{name:"THUNDER", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:76, acc:32, element:Element.Lightning}});
Skill.create({
  base:{name:"TOXIC", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, element:Element.Death, status:Status.Dead}});
Skill.create({
  base:{name:"SNORTING", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
Skill.create({
  base:{name:"NUCLEAR", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:80, acc:48}});
Skill.create({
  base:{name:"INK", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:24, element:Element.Status, status:Status.Blind}});
Skill.create({
  base:{name:"STINGER", target:Spell.TargetType.All, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:0, element:Element.PoisonStone, status:Status.Poison}});
Skill.create({
  base:{name:"DAZZLE", target:Spell.TargetType.Single, type:Spell.SpellType.AddStatus}
 ,stats:{eff:0, acc:32, element:Element.Status, status:Status.Paralysis}});
Skill.create({
  base:{name:"SWIRL", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:64, acc:32}});
Skill.create({
  base:{name:"TORNADO", target:Spell.TargetType.All, type:Spell.SpellType.Damage}
 ,stats:{eff:64, acc:32}});
