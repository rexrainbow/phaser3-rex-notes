var HideSubMenu = function () {
    if (this.childrenMap.subMenu === undefined) {
        return this;
    }

    var subMenu = this.childrenMap.subMenu;
    this.childrenMap.subMenu = undefined;
    this.remove(subMenu);
    subMenu.hideSubMenu();
    subMenu.hide();
    return this;
}
export default HideSubMenu;