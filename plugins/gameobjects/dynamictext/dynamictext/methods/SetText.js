var SetText = function (text, style) {
    if (text === undefined) {
        text = '';
    }

    var childrenLengthSave = this.children.length;

    this.poolManager.freeMultiple(this.children);
    this.children.length = 0;
    this.lastAppendedChildren.length = 0;
    this.appendText(text, style);

    if (this.children.length !== childrenLengthSave) {
        this.dirty = true;
    }
    return this;
};

export default SetText;