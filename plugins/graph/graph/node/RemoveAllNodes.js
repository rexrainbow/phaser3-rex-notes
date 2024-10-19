var RemoveAllNodes = function (destroy) {
    for (var nodeUid in this.nodes) {
        this.removeNode(nodeUid, destroy)
    }
    return this;
};

export default RemoveAllNodes;