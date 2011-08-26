var Cursor = (function() {
  
  var cursors = [];
  
  var init = function() {
    registerCursor(BattleMenuCursor);
    registerCursor(BattleEnemyCursor);
    registerCursor(BattleSpellCursor);
  };
  
  var initCursors = function() {
    for (var c in cursors) {
      cursors[c].init();
    }
  };
  
  var createCursor = function() {
    return $("<div/>").addClass("cursor");
  };
  
  var registerCursor = function(cursorObj) {
    cursors.push(cursorObj);
  };
  
  return {
    init : init
   ,initCursors : initCursors
   ,createCursor : createCursor
   ,registerCursor : registerCursor
  };
})();