define( 
/* MapTile */
function() {
  
  var Tile = function(opt) {
    opt = $.extend(true, {
      cssClasses: ""
     ,hasCorners: false
     ,hasSides: false
     ,block: null
     ,stack: null
     ,passableUsing: []
     ,borderTile: null
     ,inheritsFrom: null
     ,background: null
     ,decrementBattleSteps: true
    }, opt);
    this.cssClasses = opt.cssClasses;
    this.hasCorners = opt.hasCorners;
    this.hasSides = opt.hasSides;
    this.block = opt.block;
    this.stack = opt.stack;
    this.passableUsing = opt.passableUsing;
    this.borderTile = opt.borderTile;
    this.inheritsFrom = opt.inheritsFrom;
    this.background = opt.background;
    this.decrementBattleSteps = opt.decrementBattleSteps;
  };
  
  Tile.prototype.isPassableUsing = function(transportation) {
    for (var t in this.passableUsing) {
      if (this.passableUsing[t].id == transportation.id) {
        return true;
      }
    }
    return false;
  };
  
  return {
    create : function(opt) { return new Tile(opt); }
  };
});