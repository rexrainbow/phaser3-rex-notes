var AddNodes = function (gameObjects) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.addNode(gameObjects[i]);
    }
    return this;
}

export default AddNodes;