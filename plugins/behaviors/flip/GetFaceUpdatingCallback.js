const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

var GetFaceUpdatingCallback = function (key, frame) {
    if (key === undefined) {
        return undefined;
    }

    var callback;
    if (typeof (key) === 'string') {
    } else if (IsPlainObject(key)) {
        var config = key;
        key = config.key;
        frame = config.frame;
    } else {
        callback = key;
    }

    if (callback === undefined) {
        callback = function (gameObject) {
            gameObject.setTexture(key, frame);
        }
    }
    return callback;
}

export default GetFaceUpdatingCallback;