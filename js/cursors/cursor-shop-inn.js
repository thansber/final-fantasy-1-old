define(
/* CursorShopInn */ 
["jquery", "cursor", "events", "key-press-notifier", "logger", "party", "constants/cursor"],
function($, Cursor, Event, KeyPressNotifier, Logger, Party, CursorConstants) {
  
  var setup = function() {
    /* ---------- */
    /* INN CURSOR */
    /* ---------- */
    var InnCursor = function() {};
    var innCursorOpt = {container: "#shop .menu", otherKeys:{}};
    innCursorOpt.otherKeys[KeyPressNotifier.Y] = function() { this.next(); };
    innCursorOpt.otherKeys[KeyPressNotifier.N] = function() { this.back(); };
    
    InnCursor.prototype = Cursor.create(CursorConstants.INN, innCursorOpt);
    InnCursor.prototype.back = function() { 
      if (this.leaving) {
        this.exit();
      } else if (this.resting) {
        this.leavingMessage();
        Event.animate(Event.Animations.RestAtInn)
             .using({resting:false})
             .start();
        this.leaving = true;
        this.resting = false;
      } else {
        this.leaving = true;
        this.leavingMessage();
      }
    };
    InnCursor.prototype.exit = function() {
      KeyPressNotifier.clearListener();
      this.clear();
      Event.transmit(Event.Types.ShopExit);
    };
    InnCursor.prototype.initialCursor = function() { return this.yDestinations().eq(0); };
    InnCursor.prototype.leavingMessage = function() {
      Party.getShop().npcSays("Hold\nRESET\nwhile\nyou\nturn\nPOWER\noff!!").hide(".menu");
    };
    InnCursor.prototype.next = function() {
      var self = this;
      if (this.leaving) {
        this.exit();
        return false;
      } else if (this.resting) {
        Event.animate(Event.Animations.RestAtInn)
             .using({resting:false})
             .afterwards(Event.Animations.RestAtInnDone, function() {
               self.leavingMessage(); 
               self.leaving = true; 
               self.resting = false;
              })
             .start();
        return false;
      }
      
      var $option = this.$cursor.closest(".option");
      if ($option.is(".yes")) {
        var shop = Party.getShop();
        var price = shop.lookupInventory(Party.getMap(), 0).item.price;
        
        if (this.justEntered) {
          shop.npcSaysPrice(price);
          this.justEntered = false;
        } else {
          Party.buy(price);
          shop.npcSays("Don't\nforget,\nif you\nleave\nyour\ngame,").hide(".menu").gold(Party.getGold());
          var aliveChars = Party.getAliveChars();
          // TODO: determine what statuses get healed
          for (var i = 0; i < aliveChars.length; i++) {
            aliveChars[i].healFully().refillSpellCharges();
          }
          
          Event.animate(Event.Animations.RestAtInn)
               .using({resting:true})
               .afterwards(Event.Animations.RestAtInnDone, function() { self.resting = true; })
               .start();
        }
      } else if ($option.is(".no")) {
        this.back();
      }
    };
    InnCursor.prototype.reset = function(fullReset, opt) { this.justEntered = true; this.leaving = false; this.resting = false; };
    InnCursor.prototype.yDestinations = function() { return this.$container.find(".option"); };
  };
  
  return {
    setup : setup
  };
});