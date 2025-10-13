var DefaultLayoutEdgeCallback = function (gameObject, path, sourceGameObject, targetGameObject) {
    if (gameObject.setLine) {
        gameObject.setLine(path);
    }

    if (gameObject.setHeadShape) {
        if (!gameObject.hasOwnProperty('headShapeSave')) {
            gameObject.headShapeSave = gameObject.headShape;
        }

        if (sourceGameObject.$dummy) {
            gameObject.setHeadShape(0);
        } else {
            gameObject.setHeadShape(gameObject.headShapeSave);
        }
    }
    
    if (gameObject.setTailShape) {
        if (!gameObject.hasOwnProperty('tailShapeSave')) {
            gameObject.tailShapeSave = gameObject.tailShape;
        }

        if (targetGameObject.$dummy) {
            gameObject.setTailShape(0);
        } else {
            gameObject.setTailShape(gameObject.tailShapeSave);
        }
    }
}

export default DefaultLayoutEdgeCallback;