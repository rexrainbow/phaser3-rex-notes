var AddNodes = function (gameObjects, attributes) {
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        this.addNode(gameObjects[i], { ...attributes });
    }
    return this;
}

export default AddNodes;