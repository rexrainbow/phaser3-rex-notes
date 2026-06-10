var NormalizeTrees = function (tree, trees) {
    var output;

    if (trees === undefined) {
        if (tree === undefined) {
            return [];
        } else if (Array.isArray(tree)) {
            output = tree.slice();
        } else {
            output = [tree];
        }
    } else if (Array.isArray(trees)) {
        output = trees.slice();
    }
    else {
        output = [trees];
    }

    return output.filter(function (tree) {
        return !!tree;
    });
}

export default NormalizeTrees;
