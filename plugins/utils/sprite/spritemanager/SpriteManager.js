import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import IsEmpty from '../../../utils/object/IsEmpty.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class SpriteManager {
    constructor(scene, config) {
        this.scene = scene;

        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        this.setCreateCallback(GetValue(config, 'createCallback', 'sprite'));
        this.setSpriteFadeTime(GetValue(config, 'fade', 500));
        this.setViewportCoordinateEnable(GetValue(config, 'viewportCoordinate', false));

        this.sprites = {};
        this.removedSprites = [];
        this._timeScale = 1;
    }

    destroy(fromScene) {
        this.clear(!fromScene);
        this.createCallback = undefined;
        this.scene = undefined;
    }

    set timeScale(timeScale) {
        if (this._timeScale === timeScale) {
            return;
        }

        this._timeScale = timeScale;

        var sprites = this.sprites;
        for (var name in sprites) {
            sprites[name].setTimeScale(timeScale);
        }
    }

    get timeScale() {
        return this._timeScale;
    }

    setTimeScale(timeScale) {
        this.timeScale = timeScale;
        return this;
    }

    setCreateCallback(callback) {
        if (callback === 'sprite') {
            this.createCallback = function (scene, textureKey, frameName) {
                return scene.add.sprite(0, 0, textureKey, frameName);
            }
        } else if (callback === 'image') {
            this.createCallback = function (scene, textureKey, frameName) {
                return scene.add.image(0, 0, textureKey, frameName);
            }
        } else {
            this.createCallback = callback;
        }
        return this;
    }

    setSpriteFadeTime(time) {
        this.fadeTime = time;
        return this;
    }

    setViewportCoordinateEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.viewportCoordinateEnable = enable;
        return this;
    }

    get isEmpty() {
        return IsEmpty(this.sprites) && (this.removedSprites.length === 0);
    }

}

Object.assign(
    SpriteManager.prototype,
    EventEmitterMethods,
    Methods
);

export default SpriteManager;