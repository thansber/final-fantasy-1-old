var Cursor = (function() {
  
  var cursors = [];
  
  this.init = function() {
    this.registerCursor(BattleMenuCursor);
    this.registerCursor(BattleEnemyCursor);
    this.registerCursor(BattleSpellCursor);
  };
  
  this.initCursors = function() {
    for (var c in cursors) {
      cursors[c].init();
    }
  };
  
  this.createCursor = function() {
    return $("<div/>").addClass("cursor");
  };
  
  this.registerCursor = function(cursorObj) {
    cursors.push(cursorObj);
  };
  
  return this;
}).call({});