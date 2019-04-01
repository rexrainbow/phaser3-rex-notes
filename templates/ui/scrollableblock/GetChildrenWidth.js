var GetChildrenWidth = function (minimumMode) {
    if (!this.visible) {
        return 0;
    }

    var result;
    if (this.scrollMode === 0) { // scroll y
        var child = this.child;
        if (child.visible) {
            result = (child.isRexSizer) ?
                Math.max(child.minWidth, child.childrenWidth) :
                child.width;
        } else {
            result = 0;
        }
    } else { // scroll x
        result = 0;
    }

    return result;
}

export default GetChildrenWidth;