import MenuTree from './MenuTree.js';

var ShowSubMenu = function (parentButton, items) {
    this.hideSubMenu();
    this.subMenu = new MenuTree(this.scene, {
        items: items,
        orientation: this.orientation,
        createButtonCallback: this.root.createButtonCallback,
        createButtonCallbackScope: this.root.createButtonCallbackScope,
        easeIn: this.easeIn,
        easeOut: this.easeOut,

        root: this.root,
        parent: parentButton
    });
    return this;
}

export default ShowSubMenu;