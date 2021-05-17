const GetValue = Phaser.Utils.Objects.GetValue;

class SpriteManager {
    constructor(scene, config) {
        this.scene = scene;

        this.setCreateCallback(GetValue(config, 'createCallback', 'sprite'));

        this.sprites = {};
    }

    has(name) {
        return this.sprites.hasOwnProperty(name);
    }

    destroy() {
        this.clear();
        this.createCallback = undefined;
        this.scene = undefined;
    }

    clear() {
        for (var name in this.sprites) {
            this.removeSprite(name);
        }
        return this;
    }

    removeSprite(name) {
        if (!this.has(name)) {
            return this;
        }

        var spriteData = this.sprites[name];

        var tweenTasks = spriteData.tweens;
        for (var propName in tweenTasks) {
            tweenTasks[propName].remove();
        }

        spriteData.sprite.destroy();

        delete this.sprites[name];
        return this;
    }

    setCreateCallback(callback) {
        if (callback === 'sprite') {
            this.createCallback = function (scene, textureKey, frameName) {
                return scene.add.sprite(0, 0, textureKey, frameName)
            }
        } else if (callback === 'image') {
            this.createCallback = function (scene, textureKey, frameName) {
                return scene.add.image(0, 0, textureKey, frameName)
            }
        } else {
            this.createCallback = callback;
        }
        return this;
    }

    add(name, textureKey, frameName) {
        this.removeSprite(name);
        var sprite = this.createCallback(this.scene, textureKey, frameName);

        this.sprites[name] = {
            sprite: sprite,
            tweens: {}
        };
        return this;
    }

    setProperty(name, property, value) {
        if (!this.has(name)) {
            return this;
        }
        var sprite = this.sprites[name].sprite;
        sprite[property] = value;
        return this;
    }

    tweenProperty(name, property, value, duration, ease) {
        if (!this.has(name)) {
            return this;
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        var spriteData = this.sprites[name];
        var tweenTasks = spriteData.tweens;
        if (tweenTasks.hasOwnProperty(property)) {
            tweenTasks[property].remove();
        }
        var config = {
            targets: spriteData.sprite,
            duration: duration,
            ease: ease
        }
        config[property] = value;
        tweenTasks[property] = this.scene.tweens.add(config);
        return this;
    }
}


export default SpriteManager;