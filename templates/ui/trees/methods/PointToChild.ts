import ContainsPoint from '../../utils/ContainsPoint';

var PointToChild = function(x?: any, y?: any, preTest?: any, postTest?: any) {
    for (var nodeKey in this.treesMap) {
        var tree = this.treesMap[nodeKey];

        if (ContainsPoint(tree.nodeBody, x, y, preTest, postTest)) {
            return tree;
        }

        var child = tree.pointToChild(x, y, preTest, postTest);
        if (child?: any) {
            return child;
        }
    }

    return null;
}

export default PointToChild;