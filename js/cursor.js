var Cursor = (function() {
  
  var cursors = [];
  
  this.init = function() {
    for (var c in cursors) {
      cursors[c].init();
    }
  };
  
  this.createCursor = function() {
    return $("<div/>").addClass("cursor");
  };
  
  this.clear = function($cursor) {
    if ($cursor && $cursor.length > 0) {
      $cursor.find(".cursor").remove();
    }
  };
  
  this.hide = function($cursor) {
    if ($cursor && $cursor.length > 0) {
      $cursor.find(".cursor").hide();
    }
  };
  
  this.register = function(cursorObj) {
    cursors.push(cursorObj);
  };
  
  this.show = function($cursor) {
    if ($cursor && $cursor.length > 0) {
      $cursor.find(".cursor").show();
    }
  };
  
  return this;
}).call({});