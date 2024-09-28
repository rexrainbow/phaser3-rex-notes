import ContainsPoint from '../../utils/ContainsPoint.js';

var PointToChild = function (x, y, preTest, postTest) {
    for (var nodeKey in this.treesMap) {
        var tree = this.treesMap[nodeKey];

        if (ContainsPoint(tree.nodeBody, x, y, preTest, postTest)) {
            return tree;
        }

        var child = tree.pointToChild(x, y, preTest, postTest);
        if (child) {
            return child;
        }
    }

    return null;
}

export default PointToChild;