var GetNodeDepth = function (node, tree) {
    var depth = 0;
    var parent = node.parent;
    while (parent && (parent !== tree)) {
        depth++;
        parent = parent.parent;
    }
    return depth;
}

export default GetNodeDepth;
