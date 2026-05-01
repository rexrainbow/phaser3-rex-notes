import { Utils as PhaserUtils } from 'phaser';

const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

var GetFrameUpdatingCallback = function (key, frame, gameObject) {
    var callback;
    if (key === undefined) {
        key = gameObject.texture.key;
        frame = gameObject.frame.name;
    } else if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key', gameObject.texture.key);
        frame = GetValue(config, 'frame', gameObject.frame.name);
    } else if (typeof (key) === 'string') {
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

export default GetFrameUpdatingCallback;