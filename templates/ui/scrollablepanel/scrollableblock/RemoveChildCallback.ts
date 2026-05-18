var RemoveChildCallback = function(gameObject?: any, destroyChild?: any) {
    if (destroyChild?: any) {
        return;
    }

    if (gameObject.clearMask) {
        gameObject.clearMask(false);
    }
}

export default RemoveChildCallback;