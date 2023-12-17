var FilterDisplayGameObjects = function (gameObjects) {
    return gameObjects.filter(function (gameObject) {
        if (gameObject.displayList) {
            // Inside a scene or a layer
            return true;
        } else if (gameObject.parentContainer) {
            // Inside a container
            return true;
        }
    })
}

export default FilterDisplayGameObjects;