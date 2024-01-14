var HasHeightWrap = function () {
    var child;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (
            (!child) ||
            (child.isRexSizer && child.ignoreLayout) ||
            (!child.runHeightWrap)
        ) {
            continue;
        }

        if (
            !child.hasHeightWrap ||
            child.hasHeightWrap()     // all kind of sizers has hasHeightWrap method
        ) {
            return true;
        }
    }

    return false;
}

export default HasHeightWrap;