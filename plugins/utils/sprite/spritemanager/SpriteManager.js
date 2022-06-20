import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import SpriteData from './SpriteData.js';
import AddTintRGBProperties from '../../../behaviors/tintrgb/AddTintRGBProperties.js';
import IsEmpty from '../../../utils/object/IsEmpty.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const RemoveItem = Phaser.Utils.Array.Remove;

class SpriteManager {
    constructor(scene, config) {
        this.scene = scene;

        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));
        this.setCreateCallback(GetValue(config, 'createCallback', 'sprite'));
        this.setSpriteFadeTime(GetValue(config, 'fade', 500));

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

    has(name) {
        return this.sprites.hasOwnProperty(name);
    }

    get(name) {
        return this.sprites[name];
    }

    get isEmpty() {
        return IsEmpty(this.sprites) && (this.removedSprites.length === 0);
    }

    add(name, textureKey, frameName) {
        this.remove(name);

        var sprite;
        if (arguments.length === 3) {
            sprite = this.createCallback(this.scene, textureKey, frameName);
        } else {
            var args = Array.prototype.slice.call(arguments, 1);
            sprite = this.createCallback(this.scene, ...args);
        }

        if (this.fadeTime > 0) {
            AddTintRGBProperties(sprite);
        }
        sprite.once('destroy', function () {
            RemoveItem(this.removedSprites, sprite);
            if (this.isEmpty) {
                this.emit('empty');
            }
        }, this);

        var spriteData = new SpriteData(this, sprite, name);
        this.sprites[name] = spriteData;

        if (this.fadeTime > 0) {
            spriteData
                .setProperty('tintGray', 0)
                .easeProperty('tintGray', 255, this.fadeTime)
        }
        return this;
    }
}

Object.assign(
    SpriteManager.prototype,
    EventEmitterMethods,
    Methods
);

export default SpriteManager;