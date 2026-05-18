var GetChildrenAlign = function(children?: any) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (child.align !== undefined) {
            return child.align;
        }
    }

    return undefined;
}

export default GetChildrenAlign;