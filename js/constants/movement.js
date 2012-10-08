define( 
/* MovementConstants */
function() {
  
  var Transportation = {
    Foot: {id:"foot", flag:8}
   ,Ship: {id:"ship", flag:4}
   ,Canoe: {id:"canoe", flag:2}
   ,Airship: {id:"airship", flag:1}
  };
  
  return {
    MoveDistance : 16
   ,Transportation : Transportation
  };
});