var SortGameObjectsByDepth = function (gameObjects, descending) {
    if (gameObjects.length <= 1) {
        return gameObjects;
    }

    if (descending === undefined) {
        descending = false;
    }

    var itemList;
    var gameObject = gameObjects[0];
    if (gameObject.displayList) {
        itemList = gameObject.displayList; // displayList
    } else if (gameObject.parentContainer) {
        itemList = gameObject.parentContainer.list; // array
    } else {
        itemList = gameObject.scene.sys.displayList;  // displayList
        // TODO : Might be an error state
    }

    if (itemList.depthSort) {
        // Is a displayList object
        itemList.depthSort();
        itemList = itemList.list;
        // itemList is an array now
    }

    // itemList is an array
    if (descending) {
        gameObjects.sort(function (childA, childB) {
            return itemList.indexOf(childB) - itemList.indexOf(childA);
        })

    } else {
        gameObjects.sort(function (childA, childB) {
            return itemList.indexOf(childA) - itemList.indexOf(childB);
        })

    }

    return gameObjects;
}

export default SortGameObjectsByDepth;