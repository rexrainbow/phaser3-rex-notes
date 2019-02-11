var ExpandSubMenu = function (parentButton, items) {
    this.collapseSubMenu();
    var subMenu = new this.constructor(this.scene, {
        items: items,
        orientation: this.orientation,
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