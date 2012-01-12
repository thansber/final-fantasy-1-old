define(
["battle-engine", "character-class", "party", "statuses"], 
function(BattleEngine, CharacterClass, Party, Status) {
  
  module("Battle Engine", {
    setup : function() { 
      Party.createTestChars();
    }
  });
  
  test("next char, everyone is alive", function() {
    equal(BattleEngine.determineNextChar(Party.getChar(0)).getName(), "BBBB");
    equal(BattleEngine.determineNextChar(Party.getChar(1)).getName(), "CCCC");
    equal(BattleEngine.determineNextChar(Party.getChar(2)).getName(), "DDDD");
    equal(BattleEngine.determineNextChar(Party.getChar(3)), null);
  });
  
  test("next char, skip a dead one", function() {
    Party.getChar(1).addStatus(Status.Dead);
    equal(BattleEngine.determineNextChar(Party.getChar(0)).getName(), "CCCC");
    equal(BattleEngine.determineNextChar(Party.getChar(2)).getName(), "DDDD");
    equal(BattleEngine.determineNextChar(Party.getChar(3)), null);
  });
  
  test("next char, skip an incapacitated one", function() {
    equal(BattleEngine.determineNextChar(Party.getChar(0)).getName(), "BBBB");
    Party.getChar(2).addStatus(Status.Sleep);
    equal(BattleEngine.determineNextChar(Party.getChar(1)).getName(), "DDDD");
    equal(BattleEngine.determineNextChar(Party.getChar(3)), null);
  });
  
  test("next char, skip multiple", function() {
    Party.getChar(1).addStatus(Status.Paralysis);
    Party.getChar(2).addStatus(Status.Sleep);
    equal(BattleEngine.determineNextChar(Party.getChar(0)).getName(), "DDDD");
    equal(BattleEngine.determineNextChar(Party.getChar(3)), null);
  });
  
  test("prev char, everyone is alive", function() {
    equal(BattleEngine.determinePrevChar(Party.getChar(3)).getName(), "CCCC");
    equal(BattleEngine.determinePrevChar(Party.getChar(2)).getName(), "BBBB");
    equal(BattleEngine.determinePrevChar(Party.getChar(1)).getName(), "AAAA");
    equal(BattleEngine.determinePrevChar(Party.getChar(0)).getName(), "AAAA");
  });
  
  test("prev char, skip a dead one", function() {
    Party.getChar(1).addStatus(Status.Dead);
    equal(BattleEngine.determinePrevChar(Party.getChar(3)).getName(), "CCCC");
    equal(BattleEngine.determinePrevChar(Party.getChar(2)).getName(), "AAAA");
    equal(BattleEngine.determinePrevChar(Party.getChar(0)).getName(), "AAAA");
  });
  
  test("prev char, skip an incapacitated one", function() {
    Party.getChar(2).addStatus(Status.Paralysis);
    equal(BattleEngine.determinePrevChar(Party.getChar(3)).getName(), "BBBB");
    equal(BattleEngine.determinePrevChar(Party.getChar(1)).getName(), "AAAA");
    equal(BattleEngine.determinePrevChar(Party.getChar(0)).getName(), "AAAA");
  });
  
  test("prev char, skip multiple", function() {
    Party.getChar(1).addStatus(Status.Paralysis);
    Party.getChar(0).addStatus(Status.Sleep);
    equal(BattleEngine.determinePrevChar(Party.getChar(3)).getName(), "CCCC");
    equal(BattleEngine.determinePrevChar(Party.getChar(2)).getName(), "CCCC");
  });
});