var MessageHelper = (function() {
  var init = function() {
    var $container = $("#debug section.messages .container");
    $container.append(Message.create("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
    $container.append(Message.create("ZYXWVUTSRQPONMLKJIHGFEDCBA"));
    $container.append(Message.create("abcdefghijklmnopqrstuvwxyz"));
    $container.append(Message.create("zyxwvutsrqponmlkjihgfedcba"));
    $container.append(Message.create("0123456789  9876543210"));
    $container.append(Message.create(".,'?!:-/%%/-:!?',."));
    $container.append(Message.create("^$#[*&+@=|~> >~|=@+&*[#$^"));

    $container.append(Message.create("This LUTE has been passed down from Queen to Princess for 2000 years. Please accept it as my gift, it just might come in handy."));
    $container.append(Message.create("And so, their journey begins::"));
    $container.append(Message.create("No one touches my\nPrincess!!\n" 
                                   + "LIGHT WARRIORS??\n" 
                                   + "You impertinent fools.\n" 
                                   + "I, Garland, will knock\n" 
                                   + "you all down!!"));
    $container.append(Message.create("Wooden#  Wooden|\n"
                                   + "                \n"
                                   + "     50        5"));
    $container.append(Message.create("Iron  ~  Small ^\n"
                                   + "                \n"
                                   + "    100        5"));
  };
  
  return {
    init: init
  };
})();