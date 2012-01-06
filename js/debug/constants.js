define( 
/* DebugConstants */
["../constants/party"],
function(PartyConstants) {
  var helpers = {
    enemiesSplash : {view:PartyConstants.Views.BATTLE}
   ,battleSetup : {view:PartyConstants.Views.BATTLE}
   ,partySetup : {view:PartyConstants.Views.BATTLE} 
   ,animations : {view:PartyConstants.Views.BATTLE} 
   ,battleMessages : {view:PartyConstants.Views.BATTLE, disableKeyListener:true} 
   ,actions : {view:PartyConstants.Views.BATTLE}
   ,menus: {view:PartyConstants.Views.MENU}
  };
  

  return {
    Helpers : helpers
  };
});