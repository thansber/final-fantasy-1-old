define(
/* CursorMenuEquipment */ 
["jquery", "cursor", "events", "logger", "menus", "party", "constants/cursor", "constants/party"],
function($, Cursor, Event, Logger, Menus, Party, CursorConstants, PartyConstants) {
  
  var setup = function() {
    /* ---------------- */
    /* EQUIPMENT cursor */
    /* ---------------- */
    // base class for weapons/armor
    var EquipmentMenuCursor = function(id, opt) {
      this.id = id;
      this.opt = {};
      this.action = null;
      this.trading = false;
      this.dropping = false;
      
      jQuery.extend(true, this.opt, opt);
      
      var baseCursor = Cursor.create(this.id, this.opt);
      jQuery.extend(baseCursor, {
        addToChar : function(equipment, targetCharIndex, targetEquipmentIndex) {
          if (!equipment) {
            return null;
          }
          var char = Party.getChar(targetCharIndex);
          if (!char) {
            return null;
          }
          
          Logger.debug("added " + equipment.name + " from " + char.getName() + " at index " + targetEquipmentIndex);
          char.add(equipment.name, targetEquipmentIndex);
        }
       ,back : function() {
          if (this.dropping) {
            this.dropping = false;
            this.toggleFlicker();
            return false;
          } else if (this.trading) {
            this.trading = false;
            this.clear();
            this.stopFlicker();
            
            var $oldCursor = this.$container.find(".originalCursor");
            this.$cursor = $oldCursor.closest(".slot");
            this.$cursor.append(this.create());
            $oldCursor.remove();
            return false;
          }
          this.clear();
          Event.transmit(Event.Types.CursorStart, this.prevCursor);
        }
       ,columnChanged : function(y) { 
          var $options = this.$container.find(".slot");
          var index = $options.index(this.$cursor);
         
          if (y > 0) {
            index = (index % 2 == 1) ? index - 1 : index + 1;
          } else {
            index = (index % 2 == 0) ? index + 1 : index - 1;
          }
          
          var $newCursor = $options.eq(index);
          if (this.trading) {
            $newCursor.addClass("flicker");
          }
          
          return $newCursor;
        }
       ,dropConfirm : function(char, index) {
         if (char.lookup(index)) {
           if (char.isEquipped(index)) {
             char.unequip(index);
           }
           char.drop(index);
           this.toggleFlicker();
           this.$cursor
             .find(".equipped").empty().end()
             .find(".equippable").empty();
           this.dropping = false;
         }       
       }
       ,getCharFromCursor : function($cursor) { return this.$chars.index($cursor.closest(".char")); }
       ,getEquipment : function(charIndex) { return this.$chars.eq(charIndex).find(".slot"); }
       ,getEquipmentFromCursor : function($cursor, charIndex) { return this.getEquipment(charIndex).index($cursor); }
       ,init : function() {
         this.$container = $(this.container);
         this.$chars = this.$container.find(".char");
         this.menu = Menus[this.menuId];
        }
       ,initialConfirm : function(charIndex, index) {
         switch (this.action) {
           case "equip":
             var char = Party.getChar(charIndex);
             if (char && char.lookup(index)) {
               var $equipped = this.getEquipment(charIndex).eq(index).find(".equipped");
               char.equippedWeaponIndex == index ? char.unequip(index) : char.equip(index);
               this.menu.reloadChar(Party.getChar(charIndex), this.$chars.eq(charIndex));
               this.rebuildCursor(charIndex, index);
             }
             break;
           case "trade":
             this.trading = true;
             this.$cursor.find(".cursor").removeClass("cursor").addClass("originalCursor");
             this.$cursor.append(this.create());
             this.toggleFlicker();
             break;
           case "drop":
             var char = Party.getChar(charIndex);
             if (char && char.lookup(index)) {
               this.dropping = true;
               this.toggleFlicker();
             }
             break;
         }
       }
       ,initialCursor : function() { return this.$container.find(".slot").eq(0); }
       ,menuId : opt.menuId
       ,next : function() {
          var charIndex = this.getCharFromCursor(this.$cursor); 
          var index =  this.getEquipmentFromCursor(this.$cursor, charIndex);
          var char = Party.getChar(charIndex);
        
          this.switchMode.call(this, char);

          if (char) {
            if (this.dropping) {
              this.dropConfirm(char, index);
            } else if (this.trading) {
              this.tradeConfirm(charIndex, index);
            } else {
              this.initialConfirm(charIndex, index);
            }
          }
        }
       ,prevCursor : opt.prevCursor
       ,rebuildCursor : function(charIndex, equipmentIndex) {
         this.$cursor = this.getEquipment(charIndex).eq(equipmentIndex);
         this.$cursor.append(this.create());
       }
       ,removeFromChar : function(charIndex, equipmentIndex) {
         var char = Party.getChar(charIndex);
         if (!char) {
           return null;
         }
         var equipment = char.lookup(equipmentIndex);
         if (!equipment) {
           return null;
         }
         Logger.debug("unequipped and removed " + equipment.name + " from " + char.getName() + " at index " + equipmentIndex);
         if (char.isEquipped(equipmentIndex)) {
           char.unequip(equipmentIndex);
         }
         char.drop(equipmentIndex);
         
         return equipment;
       }
       ,reset : function(fullReset, opt) { 
          this.action = opt.action;
          this.trading = false;
          this.dropping = false;
        }
       ,rowChanged : function(x) {
          var $options = this.$container.find(".slot");
          var index = $options.index(this.$cursor);
        
          if (x > 0) {
            index += 2;
          } else {
            index -= 2;
          }
        
          if (index < 0) {
            index = $options.length + index;
          } else if (index >= $options.length) {
            index = index % $options.length;
          }
        
          var $newCursor = $options.eq(index);
          if (this.trading) {
            $newCursor.addClass("flicker");
          }
          
          return $newCursor;
        }
       ,stopFlicker : function() { this.$container.find(".flicker").removeClass("flicker"); }
       ,switchMode : opt.switchMode
       ,toggleFlicker : function() { this.$cursor.toggleClass("flicker"); }
       ,tradeConfirm : function(targetCharIndex, targetEquipmentIndex) {
         var $sourceCursor = this.$container.find(".originalCursor");
         var sourceCharIndex = this.getCharFromCursor($sourceCursor);
         var sourceEquipmentIndex = this.getEquipmentFromCursor($sourceCursor.closest(".slot"), sourceCharIndex);
         
         var sourceEquipment = this.removeFromChar(sourceCharIndex, sourceEquipmentIndex);
         var targetEquipment = this.removeFromChar(targetCharIndex, targetEquipmentIndex);
         
         this.addToChar(sourceEquipment, targetCharIndex, targetEquipmentIndex);
         this.addToChar(targetEquipment, sourceCharIndex, sourceEquipmentIndex);
         
         $sourceCursor.remove();
         this.stopFlicker();
         
         this.menu.reloadChar(Party.getChar(sourceCharIndex), this.$chars.eq(sourceCharIndex));
         this.menu.reloadChar(Party.getChar(targetCharIndex), this.$chars.eq(targetCharIndex));
         
         this.rebuildCursor(targetCharIndex, targetEquipmentIndex);
         
         this.trading = false;
        }
      });
      return baseCursor;
    };
    EquipmentMenuCursor.prototype = Cursor.create(CursorConstants.ABSTRACT_EQUIPMENT);
    
    /* -------------------------------------------- */
    /* ARMOR MENU cursor - handles equip/trade/drop */
    /* -------------------------------------------- */
    var ArmorMenuCursor = function() {};
    ArmorMenuCursor.prototype = new EquipmentMenuCursor(CursorConstants.ARMOR_MENU, {
      container:"#armorMenu"
     ,menuId:"Armor"
     ,prevCursor:CursorConstants.ARMOR_ACTIONS_MENU
     ,switchMode:function(char) { char.armor(); }
    });
    
    /* --------------------------------------------- */
    /* WEAPON MENU cursor - handles equip/trade/drop */
    /* --------------------------------------------- */
    var WeaponMenuCursor = function() {};
    WeaponMenuCursor.prototype = new EquipmentMenuCursor(CursorConstants.WEAPONS_MENU, {
      container:"#weaponMenu"
     ,menuId:"Weapon"
     ,prevCursor:CursorConstants.WEAPON_ACTIONS_MENU
     ,switchMode:function(char) { char.weapons(); }
    });
  };
  
  return {
    setup : setup
  };
});