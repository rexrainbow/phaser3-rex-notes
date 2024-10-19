import UidToObj from '../../graphitem/UidToObj.js';

var GetOppositeNode = function (nodeGameObject, edgeGameObject) {
    // uid or game object
    var node = this.getNodeData(nodeGameObject);
    if (!node) {
        return undefined;
    }

    var edgeUid = this.getObjUID(edgeGameObject);
    if (!edgeUid) {
        return undefined;
    }

    return UidToObj(node[edgeUid]);
};

export default GetOppositeNode;