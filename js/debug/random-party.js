define( /* RandomParty */
["jquery", "character-class", "party", "rng"],
function($, CharacterClass, Party, RNG) {

  return {
    create: function(opt) {
      opt = opt || {};
      var defaults = {equip:false, addSpells:false, addConsumables:false};
      var settings = $.extend(defaults, opt);
      var names = ["AAAA", "BBBB", "CCCC", "DDDD"];

      Party.clearChars();
      for (var i = 0; i < 4; i++) {
        Party.addChar(Party.createNewChar(names[i], RNG.randomArrayElement(CharacterClass.startingClasses), i));
      }

      if (settings.equip) {
        // TODO: add starting weapons
        /*self.getChar(0)
      .weapons().add("Short[S]").equip("Short[S]")
      .armor().add("Wooden[A]").add("Wooden[S]").add("Wooden[H]").equipAll();
    self.getChar(1)
      .weapons().add("Rapier").equip("Rapier")
      .armor().add("Wooden[A]").equipAll();
    self.getChar(2)
      .weapons().add("Iron[H]").equip("Iron[H]")
      .armor().add("Cloth").equipAll()
      .learnSpell(Spell.lookup("CURE")).learnSpell(Spell.lookup("HARM"));
    self.getChar(3)
      .weapons().add("Small[K]").equip("Small[K]")
      .armor().add("Cloth").equipAll()
      .learnSpell(Spell.lookup("FIRE")).learnSpell(Spell.lookup("LIT")).learnSpell(Spell.lookup("LOCK"));
*/
      }

      if (settings.addSpells) {
        // TODO: add starting spells
      }

      if (settings.addConsumables) {
        // TODO: add some consumabbles
        /*
         * self.addConsumable("HealPotion", 23)
        .addConsumable("PurePotion", 7)
        .addConsumable("SoftPotion", 2)
        .addConsumable("Tent", 4)
        .addConsumable("Cabin", 1);
         */
      }
    }
  };
});