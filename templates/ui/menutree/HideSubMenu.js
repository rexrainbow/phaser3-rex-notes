var HideSubMenu = function () {
    if (this.subMenu !== undefined) {
        if (this.easeOut) {
            this.subMenu.scaleDownDestroy(this.easeOut);
        } else {
            this.subMenu.destroy();
        }
    }
    this.subMenu = undefined;
    return this;
}
export default HideSubMenu;