var IsNode = function (gameObejct) {
    // uid or game object
    var uid = this.getObjUID(gameObejct);
    return this.graph.hasNode(uid);
}

export default IsNode;