var SortGameObjectsByDepth = function (gameObjects) {
    if (gameObjects.length === 0) {
        return gameObjects;
    }

    var scene = gameObjects[0].scene;
    var displayList = scene.sys.displayList;
    displayList.depthSort();
    return gameObjects.sort(function (childA, childB) {
        return displayList.getIndex(childB) - displayList.getIndex(childA);
    })
}

export default SortGameObjectsByDepth;