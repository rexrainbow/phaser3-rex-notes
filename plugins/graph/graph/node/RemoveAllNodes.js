var RemoveAllNodes = function (destroy) {
    for (var vertexUid in this.vertices) {
        this.removeNode(vertexUid, destroy)
    }
    return this;
};

export default RemoveAllNodes;