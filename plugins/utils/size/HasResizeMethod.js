var HasResizeMethod = function (gameObject) {
    // 1st pass : Has `resize` method?
    if (gameObject.resize) {
        return true;
    }

    // 2nd pass : Has `setSize` method?
    // Does not have `setSize` method
    if (!gameObject.setSize) {
        return false;
    }

    // Has `setSize` method but only for internal usage.
    for (var i = 0, cnt = ExcludeClassList.length; i < cnt; i++) {
        var excludeClass = ExcludeClassList[i];
        if (excludeClass && gameObject instanceof excludeClass) {
            return false;
        }
    }

    return true;
}

var ExcludeClassList = [
    Phaser.GameObjects.Image,
    Phaser.GameObjects.Sprite,
    Phaser.GameObjects.Mesh,
    Phaser.GameObjects.Shader,
    Phaser.GameObjects.Video
];


export default HasResizeMethod;