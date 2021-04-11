// Default method
var RunWidthWrap = function () {
    var child;
    for (var i in this.sizerChildren) {
        child = this.sizerChildren[i];
        if (child.runWidthWrap) {
            child.runWidthWrap();
        }
    }
    return this;
}

export default RunWidthWrap;