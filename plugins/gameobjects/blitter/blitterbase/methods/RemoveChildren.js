var RemoveChildren = function () {
    var children = this.children.list;

    if (this.poolManager) {
        this.poolManager.freeMultiple(children);
    }

    children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
}

export default RemoveChildren;