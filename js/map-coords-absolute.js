define( 
/* MapCoordsAbsolute */
function() {
  
  /**
   * Args can be 2 params - y, x
   * or a object containing y and x
   */
  var AbsoluteCoords = function(opt) {
    opt = opt || {x:0, y:0};
    this.y = opt.y;
    this.x = opt.x;
  };
  AbsoluteCoords.prototype.adjust = function(yChange, xChange, map) {
    this.y += yChange;
    this.x += xChange;
    if (map.wrapsY && this.y < 0) { this.y = map.rows; }
    if (map.wrapsX && this.x < 0) { this.x = map.cols; }
    if (map.wrapsY && this.y > map.rows) { this.y = 0; }
    if (map.wrapsX && this.x > map.cols) { this.x = 0; }
    return this;
  };
  AbsoluteCoords.prototype.equals = function(other) {
    return this.y == other.y && this.x == other.x;
  };
  AbsoluteCoords.prototype.toString = function() {
    return "[" + this.y + "," + this.x + "]";
  };
  
  return {
    create : function(opt) { return new AbsoluteCoords(opt); }
  };
});