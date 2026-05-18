import { Utils as PhaserUtils } from 'phaser';
const RemoveItem = PhaserUtils.Array.Remove;

var PopChild = function(child?: any) {
    RemoveItem(this.children, child);
    this.lastAppendedChildren.length = 0;
    this.lastOverChild = null;
    this.dirty = true;
    return this;
}

export default PopChild;