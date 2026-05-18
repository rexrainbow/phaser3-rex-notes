import Click from '../click/Click';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class FullscreenButton extends Click {
    on: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, config);

        var onEnter = GetCallback(GetValue(config, 'onEnter'));
        var onLeave = GetCallback(GetValue(config, 'onLeave'));

        var scale = gameObject.scene.scale;
        this.on('click', function(button?: any, gameObject?: any, pointer?: any, event?: any) {
            if (scale.isFullscreen) {
                scale.stopFullscreen();
                if (onLeave?: any) {
                    onLeave(gameObject);
                }

            } else {
                scale.startFullscreen();
                if (onEnter?: any) {
                    onEnter(gameObject);
                }
            }
        });
    }
}

var GetCallback = function(config?: any) {
    var callback;
    if (typeof (config) === 'string') {
        var key = config;
        callback = function(gameObject?: any) {
            gameObject.setTexture(key);
        }
    } else if (IsPlainObject(config)) {
        var key = config.key;
        var frame = config.frame;
        callback = function(gameObject?: any) {
            gameObject.setTexture(key, frame);
        }
    } else {
        callback = config;
    }
    return callback;
}

export default FullscreenButton;