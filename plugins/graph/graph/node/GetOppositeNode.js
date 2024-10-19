var GetOppositeNode = function (nodeGameObject, edgeGameObject) {
    var nodeGameObjects = this.getNodesOfEdge(edgeGameObject);

    if (nodeGameObjects.length < 2) {
        return;
    }

    return (nodeGameObject === nodeGameObjects[0]) ? nodeGameObjects[1] : nodeGameObjects[0];
};

export default GetOppositeNode;