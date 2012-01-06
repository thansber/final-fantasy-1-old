define( 
/* CursorData */
["cursor",
 "./cursor-new-char", "./cursor-new-char-name",
 "./cursor-battle-enemy", "./cursor-battle-menu", "./cursor-battle-party", "./cursor-battle-spell",
 "./cursor-menu", "./cursor-menu-char-selection", "./cursor-menu-equipment-actions", "./cursor-menu-equipment", "./cursor-menu-inventory", "./cursor-menu-magic", "./cursor-menu-status",
 "./cursor-shop-clinic", "./cursor-shop-equipment", "./cursor-shop-inn", "./cursor-shop-item", "./cursor-shop-magic"], 
function(Cursor,
         CursorNewChar, CursorNewCharName,
         CursorBattleEnemy, CursorBattleMenu, CursorBattleParty, CursorBattleSpell,
         CursorMenu, CursorMenuCharSelection, CursorMenuEquipmentActions, CursorMenuEquipment, CursorMenuInventory, CursorMenuMagic, CursorMenuStatus,
         CursorShopClinic, CursorShopEquipment, CursorShopInn, CursorShopItem, CursorShopMagic) {
  
  var init = function() {
    CursorNewChar.setup();
    CursorNewCharName.setup();
    
    CursorBattleEnemy.setup();
    CursorBattleMenu.setup();
    CursorBattleParty.setup();
    CursorBattleSpell.setup();
    
    CursorMenu.setup();
    CursorMenuCharSelection.setup();
    CursorMenuEquipmentActions.setup();
    CursorMenuEquipment.setup();
    CursorMenuInventory.setup();
    CursorMenuMagic.setup();
    CursorMenuStatus.setup();
    
    CursorShopClinic.setup();
    CursorShopEquipment.setup();
    CursorShopInn.setup();
    CursorShopItem.setup();
    CursorShopMagic.setup();
    
    Cursor.initAllCursors();
  };
  
  return {
    init : init
  };
});