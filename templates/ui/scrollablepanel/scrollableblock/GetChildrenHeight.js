var GetChildrenHeight = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var childHeight;
    var child = this.child,
        childConfig = child.rexSizer;
    var hasUnknownChildHeight = false;

    if (childConfig.hidden) {
        childHeight = 0;
    } else {
        switch (this.scrollMode) {
            case 0:
                childHeight = 0;
                break;

            case 1:
                childHeight = this.getChildHeight(child);
                if (childHeight === undefined) {
                    hasUnknownChildHeight = true;
                }
                break;

            default:
                childHeight = 0;
                break;
        }
    }

    if (hasUnknownChildHeight) {
        return undefined;
    }

    return childHeight;
}

export default GetChildrenHeight;