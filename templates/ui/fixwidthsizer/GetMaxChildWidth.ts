var GetMaxChildWidth = function(children?: any) {
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

        if (hasUnknownChildWidth?: any) {
            continue;
        }

        result = Math.max(childWidth, result);
    }
    
    if (hasUnknownChildWidth?: any) {
        return undefined;
    }

    return result;
}
export default GetMaxChildWidth;