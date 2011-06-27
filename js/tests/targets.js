$(document).ready(function() {
  module("Attack elements");

  test("unequipped has no attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.MASTER, 0).unequipWeapon();
    jQuery.each(Element.AllElements, function(i, element) {
      ok(!char.attacksWithElement(element));
    });
  });
  
  test("Flame Sword attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Flame[S]", true);
    ok(char.attacksWithElement(Element.Fire));
    ok(!char.attacksWithElement(Element.Ice));
  });
  
  test("Ice Sword attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Ice[S]", true);
    ok(!char.attacksWithElement(Element.Time));
    ok(char.attacksWithElement(Element.Ice));
  });
  
  test("Xcalber attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Xcalber", true);
    jQuery.each(Element.AllElements, function(i, element) {
      ok(char.attacksWithElement(element));
    });
  });
  
  test("Monster attack elements", function() {
    ok(!Monster.lookup("IMP").attacksWithElement(Element.Fire));
    ok(Monster.lookup("WRAITH").attacksWithElement(Element.Status));
    ok(!Monster.lookup("WRAITH").attacksWithElement(Element.Death));
    ok(Monster.lookup("MEDUSA").attacksWithElement(Element.PoisonStone));
    ok(!Monster.lookup("SORCERER").attacksWithElement(Element.Death));
  });

  module("Weapon strong against monster types");
  
  test("Flame Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Flame[S]", true);
    ok(char.isStrongAgainstMonsterType(Monster.Types.Undead));
    ok(char.isStrongAgainstMonsterType(Monster.Types.Regenerative));
    ok(!char.isStrongAgainstMonsterType(Monster.Types.Aquatic));
  });
  
  test("Dragon Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Dragon[S]", true);
    ok(char.isStrongAgainstMonsterType(Monster.Types.Dragon));
    ok(!char.isStrongAgainstMonsterType(Monster.Types.Regenerative));
  });
  
  test("Coral Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Coral[S]", true);
    ok(char.isStrongAgainstMonsterType(Monster.Types.Aquatic));
    ok(!char.isStrongAgainstMonsterType(Monster.Types.Mage));
  });
  
  test("Xcalber strong against all", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapon("Xcalber", true);
    jQuery.each(Monster.Types, function(i, type) {
      ok(char.isStrongAgainstMonsterType(type));
    });
  });
  
  test("Monsters not strong against any monster types", function() {
    var monsters = ["IMP", "SORCERER", "ASTOS", "CHAOS"];
    jQuery.each(monsters, function(m, monster) {
      jQuery.each(Monster.Types, function(t, type) {
        ok(!Monster.lookup(monster).isStrongAgainstMonsterType(type));
      });
    });
  });
  
  module("Monster types");
  
  test("Giant-class monsters", function() {
    var monsters = ["IMP", "GrIMP", "GIANT", "FrGIANT"];
    jQuery.each(monsters, function(m, monster) {
      ok(Monster.lookup(monster).isMonsterType(Monster.Types.Giant));
      ok(!Monster.lookup(monster).isMonsterType(Monster.Types.Mage));
    });
  });
  
  test("WrWOLF monster types", function() {
    var monster = Monster.lookup("WrWOLF"); 
    ok(monster.isMonsterType(Monster.Types.Were));
    ok(monster.isMonsterType(Monster.Types.Regenerative));
    ok(monster.isMonsterType(Monster.Types.Magical));
    ok(!monster.isMonsterType(Monster.Types.Giant));
  });
  
  test("CHAOS has no monster type", function() {
    var monster = Monster.lookup("CHAOS"); 
    jQuery.each(Monster.Types, function(t, type) {
      ok(!monster.isMonsterType(type));
    });
  });
  
});