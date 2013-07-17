define(
["character-class", "data/elements", "monster", "constants/monster", "party"],
function(CharacterClass, Element, Monster, MonsterConstants, Party) {
  module("Targets - Attack elements");

  test("unequipped has no attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.MASTER, 0);
    $.each(Element.All, function(i, element) {
      ok(!char.attacksWithElement(element));
    });
  });

  test("Flame Sword attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapons().add("Flame[S]", 0).equip(0);
    ok(char.attacksWithElement(Element.Fire));
    ok(!char.attacksWithElement(Element.Ice));
  });

  test("Ice Sword attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapons().add("Ice[S]", 0).equip(0);
    ok(!char.attacksWithElement(Element.Time));
    ok(char.attacksWithElement(Element.Ice));
  });

  test("Xcalber attack elements", function() {
    var char = Party.createNewChar("A", CharacterClass.KNIGHT, 0).weapons().add("Xcalber", 0).equip(0);
    $.each(Element.All, function(i, element) {
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

  module("Targets - Weapon strong against monster types");

  test("Flame Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapons().add("Flame[S]", 0).equip(0);
    ok(char.isStrongAgainstMonsterType(MonsterConstants.Types.Undead));
    ok(char.isStrongAgainstMonsterType(MonsterConstants.Types.Regenerative));
    ok(!char.isStrongAgainstMonsterType(MonsterConstants.Types.Aquatic));
  });

  test("Dragon Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapons().add("Dragon[S]", 0).equip(0)
    ok(char.isStrongAgainstMonsterType(MonsterConstants.Types.Dragon));
    ok(!char.isStrongAgainstMonsterType(MonsterConstants.Types.Regenerative));
  });

  test("Coral Sword monster types", function() {
    var char = Party.createNewChar("A", CharacterClass.FIGHTER, 0).weapons().add("Coral[S]", 0).equip(0)
    ok(char.isStrongAgainstMonsterType(MonsterConstants.Types.Aquatic));
    ok(!char.isStrongAgainstMonsterType(MonsterConstants.Types.Mage));
  });

  test("Xcalber strong against all", function() {
    var char = Party.createNewChar("A", CharacterClass.KNIGHT, 0).weapons().add("Xcalber", 0).equip(0)
    $.each(MonsterConstants.Types, function(i, type) {
      ok(char.isStrongAgainstMonsterType(type));
    });
  });

  test("Monsters not strong against any monster types", function() {
    var monsters = ["IMP", "SORCERER", "ASTOS", "CHAOS"];
    $.each(monsters, function(m, monster) {
      $.each(MonsterConstants.Types, function(t, type) {
        ok(!Monster.lookup(monster).isStrongAgainstMonsterType(type));
      });
    });
  });

  module("Targets - Monster types");

  test("Giant-class monsters", function() {
    var monsters = ["IMP", "GrIMP", "GIANT", "FrGIANT"];
    $.each(monsters, function(m, monster) {
      ok(Monster.lookup(monster).isMonsterType(MonsterConstants.Types.Giant));
      ok(!Monster.lookup(monster).isMonsterType(MonsterConstants.Types.Mage));
    });
  });

  test("WrWOLF monster types", function() {
    var monster = Monster.lookup("WrWOLF");
    ok(monster.isMonsterType(MonsterConstants.Types.Were));
    ok(monster.isMonsterType(MonsterConstants.Types.Regenerative));
    ok(monster.isMonsterType(MonsterConstants.Types.Magical));
    ok(!monster.isMonsterType(MonsterConstants.Types.Giant));
  });

  test("CHAOS has no monster type", function() {
    var monster = Monster.lookup("CHAOS");
    $.each(MonsterConstants.Types, function(t, type) {
      ok(!monster.isMonsterType(type));
    });
  });
});