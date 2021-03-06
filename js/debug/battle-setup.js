define(
/* DebugBattleSetup */
["jquery", "battle", "character-class", "./util", "equipment", "events", "monster", "party", "rng", "data/statuses", "constants/map"],
function($, Battle, CharacterClass, DebugUtil, Equipment, Event, Monster, Party, RNG, Status, MapConstants) {

  var $debug = null;

  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var equipRandomWeapon = function(char) {
    var weaponArray = $.map(Equipment.Weapon.All, function(weapon, name) {
      return weapon;
    });
    weaponArray.unshift(null);

    char.weapons();

    var weapon = RNG.randomArrayElement(weaponArray);
    while (weapon != null && !char.canEquip(weapon.name, "weapon")) {
      weapon = RNG.randomArrayElement(weaponArray);
    }


    if (weapon == null) {
      char.unequip();
    } else {
      char.add(weapon.name).equip(0);
    }
  };

  var getMonstersBySize = function(size) {
    return $.map(Monster.All, function(monster) {
      return monster.size == size ? monster.name : null;
    }).sort(sortByNameIgnoreCase);
  };

  var initializeBackgroundSelector = function() {
    var $selector = $(".background .selector", $debug);
    $selector.append($("<option/>", {text:"-- Select a background --", value:""}));
    for (var b in MapConstants.BattleBackgrounds) {
      $selector.append($("<option/>", {text:b,value:b}));
    }
  };

  var initializeCharClass = function() {
    $("select.charClass", $debug).each(function() {
      DebugUtil.addOption($(this), "", "--Select a class--");
      for (var c in CharacterClass.All) {
        var charClass = CharacterClass.All[c];
        DebugUtil.addOption($(this), charClass.name, CharacterClass.fullClassNames[charClass.name]);
      }
    });
  };

  var initializeEnemySelectors = function() {
    var $smallSelectors = $(".small .selector", $debug);
    var $largeSelectors = $(".large .selector", $debug);
    var $fiendSelectors = $(".fiend .selector", $debug);

    var defaultOption = {value:"", text:"-- Select an enemy --"};
    $smallSelectors.append($("<option/>", defaultOption));
    $largeSelectors.append($("<option/>", defaultOption));
    $fiendSelectors.append($("<option/>", defaultOption));

    var smallMonsters = getMonstersBySize("small");
    var largeMonsters = getMonstersBySize("large");
    var fiends = getMonstersBySize("fiend");

    $.each(smallMonsters, function(i, name) { $smallSelectors.append($("<option/>", {value:name, text:name})); });
    $.each(largeMonsters, function(i, name) { $largeSelectors.append($("<option/>", {value:name, text:name})); });
    $.each(fiends, function(i, name) { $fiendSelectors.append($("<option/>", {value:name, text:name})); });
  };

  var initializeStatuses = function() {
    var statuses = {};
    statuses["ok"] = "OK";
    statuses["critical"] = "Critical";
    statuses[Status.Dead.id] = "Dead";
    statuses[Status.Stone.id] = "Petrified";
    statuses[Status.Poison.id] = "Poisoned";
    statuses[Status.Paralysis.id] = "Paralyzed";
    statuses[Status.Sleep.id] = "Asleep";
    $("select.status", $debug).each(function() {
      for (var s in statuses) {
        var status = statuses[s];
        DebugUtil.addOption($(this), s, status);
      }
    });
  };

  var randomizeEverything = function() {
    $("select.charClass", $debug).each(function() { selectRandomValue($(this)); });
    selectRandomValue($(".background .selector", $debug));
    $(".small .selector, .large .selector", $debug).each(function() { selectRandomValue($(this)); });
    $(".small .qty", $debug).eq(0).val("2");
  };

  var readEnemyQty = function($parent) {
    var enemy = $(".selector", $parent).val();
    var qty = $(".qty", $parent).val();
    if (enemy.length > 0 && qty.length > 0 && +qty) {
      return {name:enemy, qty:parseInt(qty)};
    }
    return null;
  };

  var selectRandomValue = function($select) {
    var $options = $("option", $select);
    $options.eq(RNG.randomUpTo($options.size() - 1)).attr("selected", "selected");
  };

  var setupBattle = function() {

    setupParty();

    var background = $(".background.row .selector").val();
    var enemies = [];
    $(".small.row .selectors div", $debug).each(function() {
      var enemyQty = readEnemyQty($(this));
      if (enemyQty) {
        enemies.push(enemyQty);
      }
    });

    $(".large.row .selectors div", $debug).each(function() {
      var enemyQty = readEnemyQty($(this));
      if (enemyQty) {
        enemies.push(enemyQty);
      }
    });

    var fiendQty = readEnemyQty($(".fiend.row"));
    if (fiendQty) {
      enemies.push(fiendQty);
    }

    Event.transmit(Event.Types.BattleSetup, {
      battle : Battle.create({
        party : Party.getChars(),
        enemies : enemies,
        background : MapConstants.BattleBackgrounds[background]
      })
    });
  };

  var setupParty = function() {
    var chars = [];
    var charIndex = -1;
    Party.clearChars();
    $debug.find("select.charClass").each(function(i, elem) {
      var $this = $(elem);
      var charClass = elem.value;
      if (charClass.length > 0) {
        charIndex++;
        var name = "";
        for (var n = 0; n < 4; n++) {
          name += String.fromCharCode(65 + charIndex);
        }

        var char = Party.createNewChar(name, charClass, charIndex);
        Party.addChar(char);

        equipRandomWeapon(char);

        var status = $this.closest("tr").find("select.status").val();
        switch (status) {
          case "critical": char.applyDamage(Math.floor(char.maxHitPoints * 0.75) + 1); break;
          case "ok": break;
          default: char.addStatus(Status.lookup(status)); break;
        }
      }
    });
  };

  var sortByNameIgnoreCase = function(a, b) {
    b = b.toLowerCase();
    a = a.toLowerCase();
    return a > b ? 1 : a < b ? -1 : 0;
  };

  return {
    init: function() {
      $debug = $("#debug section.battleSetup");
      initializeCharClass();
      initializeStatuses();
      initializeBackgroundSelector();
      initializeEnemySelectors();
      randomizeEverything();
    },

    event : function($target) {
      DebugUtil.battleAnimationReset();
      if ($target.is(".setup")) { setupBattle(); }
      else if ($target.is(".randomize")) { randomizeEverything(); }
    }
  };
});