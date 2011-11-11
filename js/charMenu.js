var CharMenu = (function() {
  
  var self = this;
  
  var $container = null;
  
  /* ======================================================== */
  /* PRIVATE METHODS ---------------------------------------- */
  /* ======================================================== */
  var initCharacters = function() {
    var chars = Party.getChars();
    var $chars = $container.find(".char.profile");
    for (var c = 0; c < chars.length; c++) {
      var char = chars[c];
      var hpText = Message.padToLength(char.hitPoints, 3) + "/" + Message.padToLength(char.maxHitPoints, 3);
      $chars.eq(c)
        .find(".name").empty().append(Message.create(char.getName())).end()
        .find(".level").empty().append(Message.create("L" + Message.padToLength(char.charLevel, 2))).end()
        .find(".hp.values").empty().append(Message.create(hpText)).end()
        .find(".magic.row:eq(0)").empty().append(Message.create(char.charges.slice(0, 4).join("/") + "/")).end()
        .find(".magic.row:eq(1)").empty().append(Message.create(char.charges.slice(4).join("/"))).end()
        .find(".char.class").addClass(char.currentClass.name);
    }
  };
  
  /* ======================================================= */
  /* PUBLIC METHODS ---------------------------------------- */
  /* ======================================================= */
  self.init = function() {
    $container = $("#charMenu");
    
    var chars = Party.getChars();
    var $chars = $container.find(".char.profile");
    var markup = [];
    var m = 0;
    for (var c = 0; c < chars.length; c++) {
      m = 0;
      markup[m++] = "<div class=\"name\"></div>";
      markup[m++] = "<div class=\"level\"></div>";
      markup[m++] = "<div class=\"hp label\"></div>";
      markup[m++] = "<div class=\"hp values\"></div>";
      markup[m++] = "<div class=\"magic label\"></div>";
      markup[m++] = "<div class=\"magic row\"></div>";
      markup[m++] = "<div class=\"magic row\"></div>";
      markup[m++] = "<div class=\"char class\"></div>";
      $chars.eq(c).append($(markup.join("")));
    }
    
    $container
      .find(".options")
        .find(".item").append(Message.create("ITEM")).end()
        .find(".magic").append(Message.create("MAGIC")).end()
        .find(".weapon").append(Message.create(null, "menu text weapon")).end()
        .find(".armor").append(Message.create("ARMOR")).end()
        .find(".status").append(Message.create(null, "menu text status")).end()
        .end()
      .find(".char.profile")
        .find(".hp.label").append(Message.create("HP")).end()
        .find(".magic.label").append(Message.create("MAGIC"));
  };
  
  self.load = function() {
    var orbsLit = Party.getLitOrbs();
    for (var i = 0; i < orbsLit.length; i++) {
      $container.find(".orb." + orbsLit[i]).addClass("lit");
    }
    
    $container
      .find(".gold").empty().append(Message.create(Message.padToLength(Party.getGold(), 6) + " G")).end();
      
    initCharacters();
  };
  
  return this;
}).call({});