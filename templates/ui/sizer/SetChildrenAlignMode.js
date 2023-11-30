var SetChildrenAlignMode = function (mode) {
    if (mode === undefined) {
        mode = 'left';
    }

    var children = this.sizerChildren;

    var firstChild = children[0];
    var isFirstChildASpace = firstChild && firstChild.isRexSpace;

    if (    // Has left space
        (mode === 'right') ||
        (mode === 'bottom') ||
        (mode === 'center')
    ) {
        if (!isFirstChildASpace) {
            this.insertSpace(0);
        }

    } else {  // Does not have left space
        if (isFirstChildASpace) {
            this.remove(firstChild, true);
        }
    }

    var lastChildIndex = children.length - 1;
    var lastChild = children[lastChildIndex];
    var isLastChildASpace = lastChild && lastChild.isRexSpace;
    if (mode === 'center') {   // Has right space
        if (!isLastChildASpace) {
            this.insertSpace(lastChildIndex + 1);
        }

    } else {  // Does not have right space
        if (isLastChildASpace) {
            this.remove(lastChild, true);
        }
    }

    return this;
}

export default SetChildrenAlignMode;