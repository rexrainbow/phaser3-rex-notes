var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    if (this.orientation === 0) { // x
        result = this.maxChildWidth;
    } else { // y
        result = 0;
    }
    return result + this.space.left + this.space.right;
}

export default GetChildrenWidth;