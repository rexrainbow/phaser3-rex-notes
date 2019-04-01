var GetChildrenHeight = function () {
    if (!this.visible) {
        return 0;
    }

    var result;
    if (this.scrollMode === 0) { // scroll y
        result = 0;
    } else { // scroll x
        var child = this.child;
        if (child.visible) {
            result = (child.isRexSizer) ?
                Math.max(child.minHeight, child.childrenHeight) :
                child.height;
        } else {
            result = 0;
        }
    }

    return result;
}

export default GetChildrenHeight;