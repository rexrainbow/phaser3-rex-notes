const RemoveItem = Phaser.Utils.Array.Remove;

var RemoveChild = function (bob) {
    this.poolManager.free(bob);
    RemoveItem(this.children, bob);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
}

export default RemoveChild;