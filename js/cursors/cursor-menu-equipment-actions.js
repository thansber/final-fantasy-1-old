define(
/* CursorMenuEquipmentActions */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "constants/cursor", "constants/party"],
function($, Cursor, Event, KeyPressNotifier, Logger, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* ------------------------ */
    /* EQUIPMENT ACTIONS cursor */
    /* ------------------------ */
    // base class for weapons/armor
    var EquipmentActionMenuCursor = function(id, opt) { 
      this.id = id; 
      this.action = null;
      
      var baseCursor = Cursor.create(this.id)
        .setContainer(opt.container)
        .addOtherKey(KeyPressNotifier.E, function() { this.equip(); })
        .addOtherKey(KeyPressNotifier.T, function() { this.trade(); })
        .addOtherKey(KeyPressNotifier.D, function() { this.drop(); });
      
      $.extend(baseCursor, {
        back : function() {
          this.clear();
          Event.transmit(Event.Types.SwitchView, PartyConstants.Views.MENU);
          Event.transmit(Event.Types.CursorStart, CursorConstants.CHAR_MENU);
        },
        initialCursor : function() { return this.$container.find(".text").eq(0); },
        next : function() {
          KeyPressNotifier.clearListener();
          if (this.$cursor.is(".equip")) { this.equip(); }
          else if (this.$cursor.is(".trade")) { this.trade(); }
          else if (this.$cursor.is(".drop")) { this.drop(); }
        },
        nextCursor : opt.nextCursor,
        toNextCursor : function() { 
          this.clear();
          Event.transmit(Event.Types.CursorStart, this.nextCursor, {action:this.action});
        },
        xDestinations : function() { return this.$container.find(".text"); },
        
        equip : function() { this.action = "equip"; this.toNextCursor(); },
        trade : function() { this.action = "trade"; this.toNextCursor(); },
        drop : function() { this.action = "drop"; this.toNextCursor(); }
      });
      return baseCursor;
    };
    EquipmentActionMenuCursor.prototype = Cursor.create(CursorConstants.ABSTRACT_EQUIPMENT_ACTIONS);
    
    /* --------------------- */
    /* WEAPON ACTIONS cursor */
    /* --------------------- */
    var WeaponActionMenuCursor = function() {};
    WeaponActionMenuCursor.prototype = new EquipmentActionMenuCursor(CursorConstants.WEAPON_ACTIONS_MENU, {container: "#weaponMenu .actions", nextCursor:CursorConstants.WEAPONS_MENU});
    
    /* -------------------- */
    /* ARMOR ACTIONS cursor */
    /* -------------------- */
    var ArmorActionMenuCursor = function() {};
    ArmorActionMenuCursor.prototype = new EquipmentActionMenuCursor(CursorConstants.ARMOR_ACTIONS_MENU, {container: "#armorMenu .actions", nextCursor:CursorConstants.ARMOR_MENU});
  };
  
  return {
    setup : setup
  };
});