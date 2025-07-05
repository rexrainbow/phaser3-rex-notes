import Click from '../click/Click.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class FullscreenButton extends Click {
    constructor(gameObject, config) {
        super(gameObject, config);

        var onEnter = GetCallback(GetValue(config, 'onEnter'));
        var onLeave = GetCallback(GetValue(config, 'onLeave'));

        var scale = gameObject.scene.scale;
        this.on('click', function (button, gameObject, pointer, event) {
            if (scale.isFullscreen) {
                scale.stopFullscreen();
                if (onLeave) {
                    onLeave(gameObject);
                }

            } else {
                scale.startFullscreen();
                if (onEnter) {
                    onEnter(gameObject);
                }
            }
        });
    }
}

var GetCallback = function (config) {
    var callback;
    if (typeof (config) === 'string') {
        var key = config;
        callback = function (gameObject) {
            gameObject.setTexture(key);
        }
    } else if (IsPlainObject(config)) {
        var key = config.key;
        var frame = config.frame;
        callback = function (gameObject) {
            gameObject.setTexture(key, frame);
        }
    } else {
        callback = config;
    }
    return callback;
}

export default FullscreenButton;