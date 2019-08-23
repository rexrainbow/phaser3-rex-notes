const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var GetFaceUpdatingCallback = function (key, frame, gameObject) {
    if (key === undefined) {
        return undefined;
    }

    var callback;
    if (typeof (key) === 'string') {
    } else if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key', gameObject.texture.key);
        frame = GetValue(config, 'frame', gameObject.frame.name);
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