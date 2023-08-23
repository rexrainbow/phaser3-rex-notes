var SortGameObjectsByDepth = function (gameObjects, descending) {
    if (gameObjects.length <= 1) {
        return gameObjects;
    }

    if (descending === undefined) {
        descending = false;
    }

    var displayList;
    var gameObject = gameObjects[0];
    if (gameObject.displayList) {
        displayList = gameObject.displayList;
    } else if (gameObject.parentContainer) {
        displayList = gameObject.parentContainer.displayList;
    } else {
        displayList = gameObject.scene.sys.displayList;
        // TODO : Might be an error state
    }
    displayList.depthSort();

    if (descending) {
        gameObjects.sort(function (childA, childB) {
            return displayList.getIndex(childB) - displayList.getIndex(childA);
        })
    } else {
        gameObjects.sort(function (childA, childB) {
            return displayList.getIndex(childA) - displayList.getIndex(childB);
        })
    }

    return gameObjects;
}

export default SortGameObjectsByDepth;