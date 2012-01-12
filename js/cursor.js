define(
/* Cursor */ 
["jquery", "key-press-notifier", "logger"],
function($, KeyPressNotifier, Logger) {
  
  var ALL_BY_ID = {};
  var modifierKeyPressed = false;
  
  /* ======================= */
  /* CURSOR class definition */
  /* ======================= */
  var Cursor = function(id, opt) {
    this.id = id;
    
    opt = $.extend({container:null}, opt);
    
    opt.nextKeys = opt.nextKeys || [KeyPressNotifier.Enter, KeyPressNotifier.Space];
    opt.backKeys = opt.backKeys || [KeyPressNotifier.Esc];
    opt.otherKeys = $.extend({}, opt.otherKeys);

    this.$cursor = null;
    this.previousListener = null;
    this.container = opt.container;
    this.$container = null;
    
    this.registeredKeys = [];
    this.nextKeys = {};
    this.backKeys = {};
    this.otherKeys = {};
    
    for (var k = 0; k < opt.nextKeys.length; k++) {
      this.nextKeys[opt.nextKeys[k]] = true;
      this.registeredKeys.push(opt.nextKeys[k]);
    }
    for (var k = 0; k < opt.backKeys.length; k++) {
      this.backKeys[opt.backKeys[k]] = true;
      this.registeredKeys.push(opt.backKeys[k]);
    }
    this.otherKeys = $.extend(true, {}, opt.otherKeys);
    
    for (var k in this.otherKeys) {
      this.registeredKeys.push(k);
    }
    
    ALL_BY_ID[id] = this;
  };
  
  /* Abstract methods, intended to be overridden */
  /* abstract */ Cursor.prototype.back = function(x) {};
  /* abstract */ Cursor.prototype.initialCursor = function() {};
  /* abstract */ Cursor.prototype.next = function(x) {};
  /* abstract */ Cursor.prototype.reset = function(fullReset) {};
  /* abstract */ Cursor.prototype.xDestinations = function() { return []; };
  /* abstract */ Cursor.prototype.yDestinations = function() { return []; };

  
  Cursor.prototype.clear = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").remove();
    }
  };
  Cursor.prototype.columnChanged = function(x) { return this.wrappingMovement(x, this.xDestinations()); };
  Cursor.prototype.create = function(extra) { return $("<div/>").addClass("cursor").addClass(extra ? extra : ""); };
  Cursor.prototype.hide = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").hide();
    }
  };
  Cursor.prototype.init = function() {
    this.$container = $(this.container);
  };
  Cursor.prototype.isValid = function() { return this.$cursor && this.$cursor.length > 0; };
  Cursor.prototype.keyPressChange = function(key, isPressed) {
    if (KeyPressNotifier.isModifierKey(key)) {
      modifierKeyPressed = isPressed;      
    }
    // While a modifier key is pressed, don't do anything, let the browser capture the key
    if (modifierKeyPressed || !isPressed) {
      return false; 
    }
    
    switch (key) {
      case KeyPressNotifier.Left: 
        this.move(0, -1);
        return false;
      case KeyPressNotifier.Up:
        this.move(-1, 0);
        return false;
      case KeyPressNotifier.Right: 
        this.move(0, 1);
        return false;
      case KeyPressNotifier.Down: 
        this.move(1, 0);
        return false;
    }
    
    if (this.nextKeys[key]) {
      this.next();
    } else if (this.backKeys[key]) {
      this.back();
    } else if (this.otherKeys[key]) {
      this.otherKeys[key].call(this);
    } else {
      Logger.debug("Cursor [" + this.id + "] received an unhandled key press: " + key);
    }
  };
  Cursor.prototype.move = function(y, x) {
    this.clear();
    if (!(x || y)) {
      this.$cursor = this.initialCursor();
    } else if (x) {
      this.$cursor = this.columnChanged(x);
    } else if (y) {
      this.$cursor = this.rowChanged(y);
    }
       
    if (this.$cursor) {
      this.$cursor.append(this.create());
    }
  };
  Cursor.prototype.rowChanged = function(y) { return this.wrappingMovement(y, this.yDestinations())};
  Cursor.prototype.show = function() {
    if (this.isValid()) {
      this.$cursor.find(".cursor").show();
    }
  };
  Cursor.prototype.startListening = function(opt) {
    opt = $.extend({prevListener:null, reset:true}, opt);
    this.previousListener = opt.prevListener;
    KeyPressNotifier.setListener(this);
    
    if (opt.reset) {
      this.reset(true, opt);
      this.move(0, 0);
    } else {
      this.reset(false, opt);
      this.show();
    }
  };
  Cursor.prototype.stopListening = function(opt) {};
  Cursor.prototype.wrappingMovement = function(change, $options) {
    if (!($options) || $options.length == 0) {
      return this.$cursor;
    }
    var index = $options.index(this.$cursor);
    
    index += change;
    if (index < 0) {
      index = $options.length - 1;
    } else if (index >= $options.length) {
      index = 0;
    }
    
    return $options.eq(index);
  };
  
  return {
    create : function(id, opt) { return new Cursor(id, opt); }
   ,initAllCursors : function() {
       for (var id in ALL_BY_ID) {
         ALL_BY_ID[id].init();
       }
    }
   ,lookup : function(id) { return ALL_BY_ID[id]; }
  };
});