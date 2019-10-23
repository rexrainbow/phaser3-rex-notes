var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    var child = this.child,
        childConfig = child.rexSizer;
    if (childConfig.hidden) {
        result = 0;
    } else if (this.scrollMode === 0) { // scroll y   
        result = 0;
    } else { // scroll x
        result = (child.isRexSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            child.displayHeight;
    }

    return result;
}

export default GetChildrenHeight;