define(
["jquery", "character-class", "party", "spells", "statuses"], 
function($, CharacterClass, Party, Spell, Status) {
  module("Character - Learning spells");
  test("can learn a spell", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var spell = Spell.lookup("FIRE");
    ok(char.canLearnSpell(spell), "A " + char.currentClass.name + " should be able to learn " + spell.spellId);
  });

  test("can not learn a spell because of wrong class", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var spell = Spell.lookup("CURE");
    ok(!char.canLearnSpell(spell), "A " + char.currentClass.name + " should not be able to learn " + spell.spellId);
  });
  
  test("can not learn a spell because of max limit reached", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    char.learnSpell(Spell.lookup("FIR2"));
    char.learnSpell(Spell.lookup("LIT2"));
    char.learnSpell(Spell.lookup("LOK2"));
    ok(!char.canLearnSpell(Spell.lookup("HOLD")), "A character cannot learn more than 3 spells");
  });
  
  test("learned a spell", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var spell = Spell.lookup("FIRE");
    ok(!char.knowsSpell(spell), "Should not yet know " + spell.spellId);
    char.learnSpell(spell);
    ok(char.knowsSpell(spell), "A " + char.currentClass.name + " should know " + spell.spellId + " after learning it");
    ok(char.canCastSpell(spell), "A " + char.currentClass.name + " should be able to cast " + spell.spellId + " after learning it");
  });

  // -----------------------------------------------------------------
  module("Character - Statuses");
  
  test("adding status", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var status = Status.Poison;
    char.addStatus(status);
    ok(!!char.currentStatuses[status.id]);
    
    var otherStatuses = $.map(Status.All, function(status) { return status.id; });
    otherStatuses.splice($.inArray(status.id, otherStatuses), 1);
    for (var s in otherStatuses) {
      ok(!char.currentStatuses[otherStatuses[s]]);
    }
  });
  
  test("remove status", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var status = Status.Poison;
    char.addStatus(status);
    char.removeStatus(status);
    ok(!char.currentStatuses[status.id]);
    
    var otherStatuses = $.map(Status.All, function(status) { return status.id; });
    otherStatuses.splice($.inArray(status.id, otherStatuses), 1);
    for (var s in otherStatuses) {
      ok(!char.currentStatuses[otherStatuses[s]]);
    }
  });
  
  test("has status", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var status = Status.Confuse;
    char.addStatus(status);
    ok(char.hasStatus(status));
  });
  
  test("is dead", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    var status = Status.Dead;
    char.addStatus(status);
    ok(char.hasStatus(status));
    ok(char.isDead());
  });
  
  test("is alive", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    char.addStatus(Status.Dead);
    ok(!char.isAlive());
    char.removeStatus(Status.Dead);
    ok(char.isAlive());
    char.addStatus(Status.Stone);
    ok(!char.isAlive());
  });
  
  test("has critical status", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    char.addStatus(Status.Dead);
    ok(!char.hasCriticalStatus());
    char.removeStatus(Status.Dead);
    char.addStatus(Status.Poison);
    ok(char.hasCriticalStatus());
    char.removeStatus(Status.Poison);
    char.addStatus(Status.Paralysis);
    ok(char.hasCriticalStatus());
  });
  
  test("battle status text", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    char.addStatus(Status.Dead);
    deepEqual(undefined, char.getBattleStatus().battleText);
    char.removeStatus(Status.Dead);
    char.addStatus(Status.Poison);
    equal(Status.Poison.battleText, char.getBattleStatus().battleText);
    char.addStatus(Status.Paralysis);
    equal(Status.Paralysis.battleText, char.getBattleStatus().battleText);
  });
  
  test("status preventing actions", function() {
    var char = Party.createNewChar("A", CharacterClass.BLACK_MAGE, 0);
    char.addStatus(Status.Dead);
    ok(!char.canTakeAction());
    char.removeStatus(Status.Dead);
    char.addStatus(Status.Poison);
    ok(char.canTakeAction());
    char.addStatus(Status.Sleep);
    ok(!char.canTakeAction());
  });
});