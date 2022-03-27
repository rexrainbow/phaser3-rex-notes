var Clear = function () {
    var children = this.children.list;
    this.poolManager.freeMultiple(children);
    children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.dirty = true;
    return this;
}

export default Clear;