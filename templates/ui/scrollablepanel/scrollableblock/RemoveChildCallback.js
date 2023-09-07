var RemoveChildCallback = function (gameObject, destroyChild) {
    if (destroyChild) {
        return;
    }

    if (gameObject.clearMask) {
        gameObject.clearMask(false);
    }
}

export default RemoveChildCallback;