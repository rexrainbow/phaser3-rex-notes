var GetChildrenHeight = function () {
    if (!this.visible) {
        return 0;
    }

    var result;
    if (this.orientation === 0) { // x
        result = 0; // TODO:
    } else { // y
        result = this.maxChildHeight;
    }
    result = Math.max(result, this.minHeight);
    return result;
}

export default GetChildrenHeight;