var IsEdge = function (gameObejct) {
    // uid or game object
    var uid = this.getObjUID(gameObejct);
    return this.graph.hasEdge(uid);
}

export default IsEdge;