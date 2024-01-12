var GetChildrenWidth = function () {
    if (this.rexSizer.hidden) {
        return 0;
    }

    var childWidth;
    var child = this.child,
        childConfig = child.rexSizer;
    var hasUnknownChildWidth = false;

    if (childConfig.hidden) {
        childWidth = 0;
    } else {
        switch (this.scrollMode) {
            case 0:
                childWidth = this.getChildWidth(child);
                if (childWidth === undefined) {
                    hasUnknownChildWidth = true;
                }
                break;

            case 1:
                childWidth = 0;
                break;

            default:
                childWidth = 0;
                break;
        }
    }

    if (hasUnknownChildWidth) {
        return undefined;
    }

    return childWidth;
}

export default GetChildrenWidth;