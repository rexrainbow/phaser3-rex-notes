var GetChildrenWidth = function () {
    if (!this.visible) {
        return 0;
    }

    var result;
    if (this.orientation === 0) { // x
        result = this.maxChildWidth;
    } else { // y
        result = 0;
    }
    result = Math.max(result, this.minWidth);
    return result;
}

export default GetChildrenWidth;