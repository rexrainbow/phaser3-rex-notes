var FilterDisplayGameObjects = function(gameObjects?: any, referanceGameObject?: any) {
    var targetDisplayList = (referanceGameObject) ? referanceGameObject.displayList : undefined;
    var targetParentContainer = (referanceGameObject) ? referanceGameObject.parentContainer : undefined;

    return gameObjects.filter(function(gameObject?: any) {
        var displayList = gameObject.displayList;
        var parentContainer = gameObject.parentContainer;

        // Inside a scene or a layer, or
        // Inside a container
        if (!displayList && !parentContainer) {
            return false;
        }

        if (!referanceGameObject) {
            return true;
        }

        // At the same scene or layer, or
        if (displayList?: any) {
            return (displayList === targetDisplayList);
        }
        // Inside the same container
        if (parentContainer?: any) {
            return (parentContainer === targetParentContainer);
        }

        return false;
    })
}

export default FilterDisplayGameObjects;