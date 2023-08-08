var ResizeGameObject = function (gameObject, newWidth, newHeight) {
    if (!gameObject || ((newWidth === undefined) && (newHeight === undefined))) {
        return;
    }

    if (HasResizeMethod(gameObject)) { // Has `resize`, or `setSize` method
        if (newWidth === undefined) {
            newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
            newHeight = gameObject.height;
        }

        if (gameObject.resize) {
            gameObject.resize(newWidth, newHeight);
        } else {
            gameObject.setSize(newWidth, newHeight);
        }
    } else { // Set display width/height
        if (newWidth !== undefined) {
            gameObject.displayWidth = newWidth;
        }
        if (newHeight !== undefined) {
            gameObject.displayHeight = newHeight;
        }
    }
}

var ExcludeClassList = [
    Phaser.GameObjects.Image,
    Phaser.GameObjects.Sprite,
    Phaser.GameObjects.Mesh,
    Phaser.GameObjects.Shader,
    Phaser.GameObjects.Video
];

var HasResizeMethod = function (gameObject) {
    // 1st pass : Has `resize` method?
    if (gameObject.resize) {
        return true;
    }

    // 2nd pass : Has `setSize` method?
    if (!gameObject.setSize) {
        return false;
    }

    for (var i = 0, cnt = ExcludeClassList.length; i < cnt; i++) {
        var excludeClass = ExcludeClassList[i];
        if (excludeClass && gameObject instanceof excludeClass) {
            return false;
        }
    }

    return true;
}

export default ResizeGameObject;