var ExpandSubMenu = function (parentButton, items) {
    this.collapseSubMenu();

    var orientation
    if (this.root.toggleOrientation) {
        orientation = (this.orientation === 0) ? 1 : 0;
    } else {
        orientation = this.orientation;
    }

    var subMenu = new this.constructor(this.scene, {
        items: items,
        orientation: orientation,

        createBackgroundCallback: this.root.createBackgroundCallback,
        createBackgroundCallbackScope: this.root.createBackgroundCallbackScope,
        createButtonCallback: this.root.createButtonCallback,
        createButtonCallbackScope: this.root.createButtonCallbackScope,
        easeIn: this.root.easeIn,
        easeOut: this.root.easeOut,

        root: this.root,
        parent: parentButton
    });
    this.add(subMenu, null);
    this.childrenMap.subMenu = subMenu;
    return this;
}

export default ExpandSubMenu;