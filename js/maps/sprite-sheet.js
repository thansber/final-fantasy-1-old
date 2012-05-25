define(/* MapSpriteSheet */
["logger"],
function(Logger) {
  
  var ALL_SHEETS = {};
  
  var Sheet = function(id, fileName) {
    this.id = id;
    this.fileName = fileName;
    this.sprites = {};
    
    ALL_SHEETS[this.id] = this;
  };
  
  Sheet.prototype.addSprite = function(sprite) {
    this.sprites[sprite.type] = sprite;
  };
  Sheet.prototype.getSprite = function(type) {
    var sprite = this.sprites[type];
    if (!sprite) {
      Logger.warn("No sprite found for sheet [" + this.fileName + "], sprite type [" + type + "]");
    }
    return sprite;
  };
  
  var Sprite = function(type, opt) {
    this.type = type;
    this.coords = opt.coords;
    this.indoor = opt.indoor;
  };
  
  return {
    createSheet: function(fileName, opt) {
      return new Sheet(fileName, opt);
    },
    getSheet: function(id) {
      return ALL_SHEETS[id];
    },
    sprite: function(type, opt) {
      return new Sprite(type, opt);
    }
  };
});