define( 
/* MovementConstants */
function() {
  
  var Transportation = {
    Foot: {id:"foot", speedCss:"slow"}
   ,Ship: {id:"ship", speedCss:"medium"}
   ,Canoe: {id:"canoe", speedCss:"slow"}
   ,Airship: {id:"airship", speedCss:"fast"}
  };
  
  return {
    MoveDistance : 16
   ,Transportation : Transportation
  };
});