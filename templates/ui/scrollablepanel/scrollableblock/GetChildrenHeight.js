var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var result;
    var child = this.child,
        childConfig = child.rexSizer;

    if (childConfig.hidden) {
        result = 0;
    } else {
        switch (this.scrollMode) {
            case 0:
                result = 0;
                break;

            case 1:
                result = this.getChildHeight(child);
                break;

            default:
                result = 0;
                break;
        }
    }

    return result;
}

export default GetChildrenHeight;