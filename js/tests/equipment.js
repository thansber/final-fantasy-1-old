$(document).ready(function() {
  module("Adding/equipping");
  test("adding/equipping weapons", function() {
    var char = Party.createNewChar("AAAA", CharacterClass.FIGHTER, 0);
    char.weapons().add("Short[S]").add("Rapier").equip("Rapier");
    equal(char.allWeapons.length, 2);
    equal(char.allWeapons[0].name, "Short[S]");
    equal(char.equippedWeaponIndex, 1);
    equal(char.equippedWeapon().name, "Rapier");
    
    char.equip("Short[S]");
    equal(char.equippedWeaponIndex, 0);
    equal(char.equippedWeapon().name, "Short[S]");
    
    char.unequip();
    equal(char.equippedWeaponIndex, -1);
    equal(char.equippedWeapon(), null);
  });
  
  test("adding/equipping armor", function() {
    var char = Party.createNewChar("AAAA", CharacterClass.RED_MAGE, 0);
    char.armor().add("Chain[A]").add("Silver[B]").equip("Silver[B]");
    
    equal(char.allArmor.length, 2);
    equal(char.allArmor[0].name, "Chain[A]");
    ok(char.equippedArmor["Silver[B]"]);
    
    char.equip("Chain[A]");
    ok(!char.isArmorEquipped("Silver[B]"));
    ok(char.isArmorEquipped("Chain[A]"));
  });
  
  test("armor resistances", function() {
    var char = Party.createNewChar("AAAA", CharacterClass.KNIGHT, 0);
    char.armor().add("Dragon[A]").add("Opal[A]").add("ProRing");
    char.equip("ProRing").equip("Dragon[A]").equip("Opal[A]");
    deepEqual(char.elementsProtectedFrom(), [Element.Death, Element.Lightning]);
  });
  
  test("armor weight", function() {
    var char = Party.createNewChar("AAAA", CharacterClass.KNIGHT, 0);
    char.armor().add("Steel[A]").add("Iron[H]").add("Iron[G]").equipAll();
    equal(char.armorWeight(), 43);
    
    char.equip("Opal[B]");
    equal(char.armorWeight(), 11);
  });
  
  module("Weapon allowed classes");
  test("check # of allowed classes for all weapons", function() {
    
    var numClassesPerWeapon = {
     "Wooden[N]" : 3
    ,"Small[K]" : 8
    ,"Wooden[R]" : 11
    ,"Rapier" : 6
    ,"Iron[H]" : 5
    ,"Short[S]" : 5
    ,"Hand[A]" : 3
    ,"Scimtar" : 6
    ,"Iron[N]" : 3
    ,"Large[K]" : 8
    ,"Iron[S]" : 5
    ,"Sabre" : 6
    ,"Long[S]" : 5
    ,"Great[A]" : 3
    ,"Falchon" : 6
    ,"Silver[K]" : 8
    ,"Silver[S]" : 5
    ,"Silver[H]" : 5
    ,"Silver[A]" : 3
    ,"Flame[S]" : 5
    ,"Ice[S]" : 5
    ,"Dragon[S]" : 6
    ,"Giant[S]" : 5
    ,"Sun[S]" : 5
    ,"Coral[S]" : 6
    ,"Were[S]" : 5
    ,"Rune[S]" : 6
    ,"Power[R]" : 9
    ,"Light[A]" : 3
    ,"Heal[R]" : 3
    ,"Mage[R]" : 3
    ,"Defense" : 3
    ,"Wizard[R]" : 1
    ,"Vorpal" : 3
    ,"CatClaw" : 4
    ,"Thor[H]" : 3
    ,"Bane[S]" : 3
    ,"Katana" : 1
    ,"Xcalber" : 1
    ,"Masmune" : 12};
  
    jQuery.each(numClassesPerWeapon, function(name, numClasses) {
      var weapon = Equipment.Weapon.lookup(name);
      equal(weapon.allowedClasses.length, numClasses, "Expected " + numClasses + " classes to be able to equip " + name + ", found " + weapon.allowedClasses.length);
    });
  });
  
  test("check # of allowed classes for all armor", function() {
    
    var numClassesPerArmor = {
      "Cloth" : 12
     ,"Wooden[A]" : 8
     ,"Chain[A]" : 5
     ,"Iron[A]" : 3
     ,"Steel[A]" : 2
     ,"Silver[A]" : 5
     ,"Flame[A]" : 3
     ,"Ice[A]" : 3
     ,"Opal[A]" : 1
     ,"Dragon[A]" : 1
     ,"Copper[B]" : 12
     ,"Silver[B]" : 12
     ,"Gold[B]" : 12
     ,"Opal[B]" : 12
     ,"White[R]" : 1
     ,"Black[R]" : 1
     ,"Wooden[S]" : 3
     ,"Iron[S]" : 3
     ,"Silver[S]" : 3
     ,"Flame[S]" : 3
     ,"Ice[S]" : 3
     ,"Opal[S]" : 1
     ,"Aegis[S]" : 1
     ,"Buckler" : 6
     ,"ProCape" : 10
     ,"Cap" : 12
     ,"Wooden[H]" : 3
     ,"Iron[H]" : 3
     ,"Silver[H]" : 3 
     ,"Opal[H]" : 1
     ,"Heal[H]" : 2
     ,"Ribbon" : 12
     ,"Gloves" : 12
     ,"Copper[G]" : 3
     ,"Iron[G]" : 3
     ,"Silver[G]" : 4
     ,"Zeus[G]" : 3
     ,"Power[G]" : 4
     ,"Opal[G]" : 1
     ,"ProRing" : 12};
    
    
    jQuery.each(numClassesPerArmor, function(name, numClasses) {
      var armor = Equipment.Armor.lookup(name);
      equal(armor.allowedClasses.length, numClasses, "Expected " + numClasses + " classes to be able to equip " + name + ", found " + armor.allowedClasses.length);
    });
    
  });
  
});