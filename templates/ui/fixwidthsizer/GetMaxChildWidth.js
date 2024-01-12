var GetMaxChildWidth = function (children) {
    if (children === undefined) {
        children = this.sizerChildren;
    }
    var result = 0;
    var child, childWidth;
    var hasUnknownChildWidth = false;

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        if (child === '\n') {
            continue;
        }

        childWidth = this.getChildWidth(child);
        if (childWidth === undefined) {
            hasUnknownChildWidth = true;
        }

        if (hasUnknownChildWidth) {
            continue;
        }

        result = Math.max(childWidth, result);
    }
    
    if (hasUnknownChildWidth) {
        return undefined;
    }

    return result;
}
export default GetMaxChildWidth;