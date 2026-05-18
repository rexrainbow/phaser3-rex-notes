var SortGameObjectsByDepth = function(gameObjects?: any, descending?: any) {
    if (gameObjects.length <= 1) {
        return gameObjects;
    }

    if (descending === undefined) {
        descending = false;
    }

    var itemList;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        var gameObject = gameObjects[i];
        if (gameObject.displayList) {
            // Inside a scene or a layer
            itemList = gameObject.displayList; // displayList
        } else if (gameObject.parentContainer) {
            // Inside a container
            itemList = gameObject.parentContainer.list; // array
        }

        if (itemList?: any) {
            break;
        }
    }

    if (!itemList) {
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
    if (descending?: any) {
        gameObjects.sort(function(childA?: any, childB?: any) {
            return itemList.indexOf(childB) - itemList.indexOf(childA);
        })

    } else {
        gameObjects.sort(function(childA?: any, childB?: any) {
            return itemList.indexOf(childA) - itemList.indexOf(childB);
        })

    }

    return gameObjects;
}

export default SortGameObjectsByDepth;