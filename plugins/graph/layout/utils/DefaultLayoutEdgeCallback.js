var DefaultLayoutEdgeCallback = function (gameObject, path, sourceGameObject, targetGameObject) {
    if (gameObject.setLine) {
        gameObject.setLine(path);
    }
}

export default DefaultLayoutEdgeCallback;