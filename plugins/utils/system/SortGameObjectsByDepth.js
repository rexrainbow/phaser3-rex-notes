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
        // Inside a scene or a layer
        itemList = gameObject.displayList; // displayList
    } else if (gameObject.parentContainer) {
        // Inside a container
        itemList = gameObject.parentContainer.list; // array
    } else {
        itemList = gameObject.scene.sys.displayList;  // displayList
        // ??       
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