define(
/* BattleEngine */ 
["jquery", "actions", "animations/action", "animations/battle", "animations/util", "battle-commands", "constants/battle", 
 "events", "logger", "messages", "monster", "party", "constants/party"], 
function($, Action, AnimationAction, AnimationBattle, AnimationUtil, BattleCommands, BattleConstants, 
         Event, Logger, Message, Monster, Party, PartyConstants) {

  var $battle = null;
  var $party = null;
  var $enemies = null;
  var $stats = null;
  var $spellList = null;

  var enemiesPerColumn = {small:3, large:2, fiend:1};
  
  var areAllEnemiesDead = function(enemiesByName) {
    var allDead = true;
    for (var e in enemiesByName) {
      var enemies = enemiesByName[e];
      $.each(enemies, function(i, enemy) {
        if (!enemy.isDead()) {
          allDead = false;
          return false;
        }
      });
    }
    return allDead;
  };
  
  var battleSetup = function(opt) {
    var battle = opt.battle;
    
    BattleCommands.init(battle);
    
    // party UI setup
    $party.find(".char").remove();
    $stats.empty();
    
    $.each(battle.party, function(i, char) {
      $party.append(createCharUI(char));
      $stats.append(createCharStatsUI(char));
      resetCharStats(char);
    });
    
    if (battle.background) {
      $battle.find(".background").attr("class", "background " + battle.background.cssClass);
    }
    
    // enemy UI setup
    var $enemies = $(".enemies", $battle); 
    var $column = null, numColumns = 0;
    var mixed = battle.isMixedSize();
    var restrictions = battle.getRestrictions();
    var enemiesBySize = battle.enemiesBySize;
    
    $enemies.find(".column").remove();
    
    for (var size in enemiesBySize) {
      var enemies = enemiesBySize[size].enemies;
      $.each(enemies, function(i, name) {
        if (i % enemiesPerColumn[size] == 0) {
          $column = $("<div/>").addClass("column").addClass(size).addClass(AnimationUtil.ORDINALS[numColumns++]);
          if (mixed) {
            $column.addClass("mixed");
          }
          $enemies.append($column);
        }
        
        $column.append(createEnemyUI(Monster.lookup(name)));
      });
      
      if (size == "small" && enemiesBySize.length % enemiesPerColumn[size] == 1) {
        $column.addClass("single");
      }
    }
    
    // enemy list setup
    var enemiesByName = battle.enemiesByName;
    var $enemyList = $battle.find(".enemy.list");
    $enemyList.empty();
    for (var name in enemiesByName) {
      $enemyList.append(Message.create(name));
    }
    
    gatherCommands(battle);
  };
  
  var commandToString = function(command) {
    if (!command) {
      return "UNDEFINED - probably a dead char";
    }
    var isParty = command.type == BattleConstants.Commands.Party;
    var s = command.source.getName();
    switch (command.action) {
      case BattleConstants.Actions.Attack: s += " is attacking"; break;
      case BattleConstants.Actions.CastSpell: s += " is casting" + (!isParty ? "/using skill" : ""); break;
      case BattleConstants.Actions.Drink: s += " is drinking a"; break;
      case BattleConstants.Actions.UseItem: s += " is using the"; break;
      case BattleConstants.Actions.Run: s += " is running away"; break;
      case BattleConstants.Actions.StatusHeal: s += " is trying to heal from a status"; break;
    }
    
    if (command.spellId) {
      s += " " + command.spellId + " on";
    }
  
    if (command.target) {
      var targets = $.isArray(command.target) ? command.target : [command.target];
      if (targets) {
        s += " " + $.map(targets, function(target) { 
          return target.getName() + (isParty ? " " + (command.targetIndex == null ? "" : command.targetIndex) : ""); 
        }).join(", ");
      }
    }
    
    return s;
  };
  
  var commandsToString = function(commands) {
    var s = "", NEWLINE = "\r\n";
    $.each(commands, function(i, command) { s += commandToString(command) + NEWLINE; });
    return s;
  };
  
  var createCharUI = function(char) {
    var $char = $("<p/>").addClass("char").addClass(char.currentClass.name);
    var $weapon = $("<span/>").addClass("weapon hidden").appendTo($char);
    if (char.equippedWeapon()) {
      $weapon.addClass(char.equippedWeapon().cssClasses);
    } else if (char.currentClass.isMartialArtist()) {
      $weapon.addClass("punch");
    }
    resetCharStats(char);
    return $char;
  };
  
  var createCharStatsUI = function(char) {
    var $charStats = $("<div/>").addClass("charStats").addClass(AnimationUtil.ORDINALS[char.charIndex]);
    var $border = $("<div/>").addClass("border");
    var $name = $("<div/>").addClass("name").append(Message.create(char.charName));
    var $hpLabel = $("<label/>").addClass("hp").append(Message.create("HP"));
    var $hp = $("<div/>").addClass("hp").append(Message.create(char.hitPoints + ""));
    
    $border.append($name).append($hpLabel).append($hp);
    $charStats.append($border);
    
    return $charStats;
  };
  
  var createEnemyUI = function(monster) {
    return $("<div/>").addClass("enemy").addClass(monster.cssClass);
  };
  
  var determineFirstCharCommand = function(battle, q) {
    if (!battle.moveFirstChar) {
      return null;
    }
    
    var firstChar = null;
    $.each(Party.getChars(), function(i, char) {
      if (!char.isAlive()) {
        BattleCommands.changeCharIndex(1);
        return true;
      }
      
      if (char.canTakeAction()) {
        firstChar = char;
        return false;
      } else {
        BattleCommands.incapacitatedChar(char);
      }
    });
    
    if (firstChar) {
      q = AnimationAction.moveCharForCommand({char:firstChar}, q);
    }
        
    return q;
  };
  
  var gatherCommands = function(battle) {
    var q = null;
    if (battle.isAmbush()) {
      BattleCommands.generateEnemyCommands(battle);
      q = AnimationBattle.messageToggler({roundStarting:true});
      q = AnimationBattle.preBattleMessage({message:BattleConstants.AmbushMessage}, q);
      $.when(q.start()).then(function() {
        startRound({battle:battle, commands:BattleCommands.shuffleCommands()});
      });
    } else if (battle.isPreemptive()) {
      q = AnimationBattle.messageToggler({roundStarting:true});
      q = AnimationBattle.preBattleMessage({message:BattleConstants.PreemptiveMessage}, q);
      q = AnimationBattle.messageToggler({roundStarting:false}, q);
      q = determineFirstCharCommand(battle, q);
      q.start();
    } else {
      q = determineFirstCharCommand(battle);
      if (q) {
        q.start();
      }
    }
    
    // If all characters are incapacitated, move on to the enemy commands and start the round
    // TODO: If a char is dead, I don't think this works correctly, may need a no-op action for dead chars
    if (BattleCommands.isAllPartyCommandsEntered()) {
      BattleCommands.generateEnemyCommands();
      startRound({battle:battle, commands:BattleCommands.shuffleCommands()});
    }
  };
  
  var monsterRetargets = function(command) {
    return command.type == BattleConstants.Commands.Enemy // monster doing the attacking
        && command.targetType == BattleConstants.Commands.Party // targeting the party
        && !$.isArray(command.target) // targeting a single character 
        && !command.target.isAlive(); // target is dead or stoned
  };
  
  var resetCharStats = function(char) {
    Event.transmit(Event.Types.AdjustCharStats, {result:{
      target: char
     ,targetHp: char.hitPoints
     ,died: char.isDead()
     ,status: char.getBattleStatus()
    }});
  };
  
  var resultToString = function(result) {
    return $.map(result, function(value, index) {
      var v = value;
      if (value) {
        if (value.getName) { v = value.getName(); } 
        else if (value.desc) { v = value.desc; } 
        else if (value.spellId) { v = value.spellId; } 
        else if ($.isArray(value)) { v = "[" + value + "]"; }
      }
      return index + "=" + v;
    }).join(",");
  };
  
  var startRound = function(opt) {
    var battle = opt.battle;
    var commands = opt.commands;
    var q = null;
    var victory = false;
    var defeat = false;
    var ranAway = false;
        
    Logger.debug("initial commands - " + commandsToString(commands));
    
    battle.started();
    AnimationBattle.messageToggler({start:true, roundStarting:true});
    
    $.each(commands, function(i, command) {
      Message.hideAllBattleMessages();
      
      if (!command || command.source.isDead()) {
        return true;
      }

      // If a monster's target died during this round, allow the monster to retarget
      if (monsterRetargets(command)) {
        command = BattleCommands.enemy(command.source);
      }
      
      var result = null;
      
      Logger.debug("command [" + i + "] - " + commandToString(command));
      
      switch (command.action) {
        case BattleConstants.Actions.Attack:
          result = Action.attack(command.source, command.target);
          q = AnimationAction.attack({command:command, result:result}, q);
          break;
        case BattleConstants.Actions.CastSpell:
          result = Action.castSpell(command.source, command.spellId, command.target);
          q = AnimationAction.castSpell({command:command, result:result}, q);
          break;
        case BattleConstants.Actions.StatusHeal:
          result = Action.statusHeal(command.source, command.targetType);
          if (result) {
            q = AnimationAction.statusHeal({command:command, result:result}, q);
          }
          break;
        case BattleConstants.Actions.Run:
          result = Action.run(command.source, command.targetType, battle);
          q = AnimationAction.runParty({command:command, result:result}, q);
          if (result.success) {
            ranAway = true;
          }
          break;
      }
      
      Logger.info("result [" + i + "] - " + resultToString(result));
      
      if (ranAway) {
        return false;
      }
      
      if (areAllEnemiesDead(battle.enemiesByName)) {
        victory = true;
        return false;
      }
      
      if (Party.getAliveChars().length == 0) {
        defeat = true;
        return false;
      }
      
      Logger.debug("after command [" + i + "], " + q.toString());
    });
    
    if (defeat) {
      q = AnimationAction.defeat({}, q);
    }
    if (victory) {
      q = AnimationAction.victory({aliveChars:Party.getAliveChars()}, q);
      q = AnimationBattle.rewards({aliveChars:Party.getAliveChars(), battle:battle}, q);
    }
    
    $.when(q.start()).then(function() {
      if (defeat) {
        // TODO: On any key, go back to main menu?
        Logger.info("party is dead - lose"); 
      }
      else if (victory || ranAway) {
        Party.inBattle = false;
        Event.transmit(Event.Types.MovementStart);
        Event.transmit(Event.Types.SwitchView, PartyConstants.Views.WORLD_MAP);
      }
      else { 
        gatherCommands(battle);
      }
    });
  };
  
  return {
    createCharUI : createCharUI,
    init : function() {
      $battle = $("#battle");
      $party = $(".party", $battle);
      $enemies = $(".enemies", $battle);
      $stats = $(".stats", $battle);
      $spellList = $(".input .spells", $battle);
      
      $battle.find(".commands .column").eq(0)
        .append(Message.create(null, "battle menu fight"))
        .append(Message.create(null, "battle menu magic"))
        .append(Message.create(null, "battle menu drink"))
        .append(Message.create("ITEM", "item"));
      $battle.find(".commands .column").eq(1)
        .append(Message.create("RUN", "run"));
      
      Event.listen(Event.Types.BattleGatherCommands, gatherCommands);
      Event.listen(Event.Types.BattleSetup, battleSetup);
      //Event.listen(Event.Types.ResetCharStats, resetCharStats);
      Event.listen(Event.Types.StartRound, startRound);
    }
  };
});