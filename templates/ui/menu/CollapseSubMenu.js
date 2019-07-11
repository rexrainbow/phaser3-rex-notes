var CollapseSubMenu = function () {
    if (this.childrenMap.subMenu === undefined) {
        return this;
    }

    var subMenu = this.childrenMap.subMenu;
    this.childrenMap.subMenu = undefined;
    this.remove(subMenu);
    subMenu.collapse();
    return this;
}
export default CollapseSubMenu;