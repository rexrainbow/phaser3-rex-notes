var HasWidthWrap = function () {
    var child;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runWidthWrap)
        ) {
            continue;
        }

        if (
            !child.hasWidthWrap ||
            child.hasWidthWrap()
        ) {
            return true;
        }
    }

    return false;
}

export default HasWidthWrap;