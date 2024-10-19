var GetNodeData = function (gameObejct, createIfNotExisted) {
    if (createIfNotExisted === undefined) {
        createIfNotExisted = false;
    }

    // uid or game object
    var uid = this.getObjUID(gameObejct);
    if (createIfNotExisted && !this.nodes.hasOwnProperty(uid)) {
        this.nodes[uid] = {};
    }
    return this.nodes[uid];
};

export default GetNodeData;