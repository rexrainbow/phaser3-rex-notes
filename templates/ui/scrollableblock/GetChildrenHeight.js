var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    if (this.scrollMode === 0) { // scroll y
        result = 0;
    } else { // scroll x
        var child = this.child;
        if (!child.rexSizer.hidden) {
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