var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    if (this.orientation === 0) { // x
        result = 0;
    } else { // y
        result = this.maxChildHeight;
    }
    result = Math.max(result, this.minHeight);
    return result;
}

export default GetChildrenHeight;