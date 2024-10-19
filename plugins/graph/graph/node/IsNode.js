var IsNode = function (gameObejct) {
    // uid or game object
    var uid = this.getObjUID(gameObejct);
    return this.nodes.hasOwnProperty(uid);
}

export default IsNode;