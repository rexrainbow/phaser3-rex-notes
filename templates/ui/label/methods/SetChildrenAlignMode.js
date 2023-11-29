var SetChildrenAlignMode = function (mode) {
    var children = this.sizerChildren;

    var firstChild = children[0];

    if (    // Has left space
        (mode === 'right') ||
        (mode === 'bottom') ||
        (mode === 'center')
    ) {
        if (!firstChild.isRexSpace) {
            this.insertSpace(0);
        }

    } else {  // Does not have left space
        if (firstChild.isRexSpace) {
            this.remove(firstChild, true);
        }
    }

    var lastChildIndex = children.length - 1;
    var lastChild = children[lastChildIndex];
    if (mode === 'center') {   // Has right space
        if (!lastChild.isRexSpace) {
            this.insertSpace(lastChildIndex + 1);
        }

    } else {  // Does not have right space
        if (lastChild.isRexSpace) {
            this.remove(lastChild, true);
        }
    }

    return this;
}

export default SetChildrenAlignMode;