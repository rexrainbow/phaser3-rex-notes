import EventEmitterMethods from '../../eventemitter/EventEmitterMethods.js';
import SpriteData from './SpriteData.js';
import AddTintRGBProperties from '../../../behaviors/tintrgb/AddTintRGBProperties.js';
import IsEmpty from '../../../utils/object/IsEmpty.js';

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
    }

    destroy(fromScene) {
        this.clear(!fromScene);
        this.createCallback = undefined;
        this.scene = undefined;
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

    getTweenTask(name, prop) {
        if (this.has(name)) {
            var tweenTasks = this.get(name).tweens;
            if (tweenTasks.hasOwnProperty(prop)) {
                return tweenTasks[prop];
            }
        }
        return null;
    }

    get isEmpty() {
        return IsEmpty(this.sprites) && (this.removedSprites.length === 0);
    }

    clear(destroyChild) {
        if (destroyChild === undefined) {
            destroyChild = true;
        }
        for (var name in this.sprites) {
            if (destroyChild) {
                this.sprites[name].destroy();
            }
            delete this.sprites[name];
        }
        this.removedSprites.length = 0;
        return this;
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

    setProperty(name, property, value) {
        if (!this.has(name)) {
            return this;
        }
        this.get(name).setProperty(property, value);
        return this;
    }

    easeProperty(name, property, value, duration, ease, isYoyo, onComplete) {
        if (!this.has(name)) {
            return this;
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        this.get(name).easeProperty(property, value, duration, ease, isYoyo, onComplete);
        return this;
    }

    remove(name) {
        if (!this.has(name)) {
            return this;
        }

        var spriteData = this.get(name);
        delete this.sprites[name];

        this.removedSprites.push(spriteData.sprite);
        if (this.fadeTime > 0) {
            spriteData.easeProperty(
                'tintGray',                 // property
                0,                          // to value
                this.fadeTime,              // duration
                'Linear',                   // ease 
                false,                      // yoyo
                function () {               // onComplete
                    spriteData.destroy();
                }
            )

        } else {
            spriteData.destroy();

        }
        return this;
    }

    removeAll() {
        for (var name in this.sprites) {
            this.remove(name);
        }
        return this;
    }

    setTexture(name, textureKey, frameKey) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).setTexture(textureKey, frameKey);
        return this;
    }

    playAnimation(name, key) {
        if (!this.has(name)) {
            this.add(name);
        }

        this.get(name).playAnimation(key);
        return this;
    }

    stopAnimation(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).stopAnimation();
        return this;
    }

    chainAnimation(name, keys) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).chainAnimation(keys);
        return this;
    }

    pauseAnimation(name) {
        if (!this.has(name)) {
            return this;
        }

        this.get(name).pauseAnimation();
        return this;
    }
}

Object.assign(
    SpriteManager.prototype,
    EventEmitterMethods
);

export default SpriteManager;