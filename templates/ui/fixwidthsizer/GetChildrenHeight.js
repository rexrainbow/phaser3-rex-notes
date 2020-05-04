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
    return result + this.space.top + this.space.bottom;
}

export default GetChildrenHeight;