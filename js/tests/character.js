$(document).ready(function() {
  module("Learning spells");

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

});