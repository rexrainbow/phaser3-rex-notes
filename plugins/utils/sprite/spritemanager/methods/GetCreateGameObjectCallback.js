var GetCreateGameObjectCallback = function (callback) {
    if (!callback || (callback === 'sprite')) {
        callback = CreateSprite;
    } else if (callback === 'image') {
        callback = CreateImage;
    }
    return callback;
}

var CreateSprite = function (scene, textureKey, frameName) {
    if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
        frameName = undefined;
    }
    return scene.add.sprite(0, 0, textureKey, frameName);
}

var CreateImage = function (scene, textureKey, frameName) {
    if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
        frameName = undefined;
    }
    return scene.add.image(0, 0, textureKey, frameName);
}

export default GetCreateGameObjectCallback;