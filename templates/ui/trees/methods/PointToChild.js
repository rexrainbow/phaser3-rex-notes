import ContainsPoint from '../../utils/ContainsPoint.js';

var PointToChild = function (x, y, preTest, postTest) {
    for (var nodeKey in this.treesMap) {
        var tree = this.treesMap[nodeKey];
        var child = tree.pointToChild(x, y, preTest, postTest);
        if (child) {
            return child;
        } else if (ContainsPoint(tree, x, y, preTest, postTest)) {
            return tree;
        }
    }

    return null;
}

export default PointToChild;