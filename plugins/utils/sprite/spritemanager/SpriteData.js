class SpriteData {
    constructor(spriteManager, sprite, name) {
        this.spriteManager = spriteManager;
        this.sprite = sprite.setName(name);
        this.tweens = {};
        this.name = name;
    }

    get scene() {
        return this.spriteManager.scene;
    }

    get timeScale() {
        return this.spriteManager.timeScale;
    }

    destroy() {
        this
            .freeSprite()
            .freeTweens();

        this.spriteManager = undefined;
    }

    freeSprite() {
        this.sprite.destroy();
        this.sprite = undefined;
        return this;
    }

    freeTweens() {
        var tweenTasks = this.tweens;
        for (var propName in tweenTasks) {
            tweenTasks[propName].remove();
            delete tweenTasks[propName];
        }
        return this;
    }

    setProperty(property, value) {
        this.sprite[property] = value;
        return this;
    }

    easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete) {
        var tweenTasks = this.tweens;
        if (tweenTasks.hasOwnProperty(property)) {
            tweenTasks[property].remove();
        }

        var sprite = this.sprite;
        var config = {
            targets: sprite,
            duration: duration,
            ease: ease,
            repeat: repeat,
            yoyo: isYoyo,
            onComplete: function () {
                tweenTasks[property].remove();
                delete tweenTasks[property];
                if (onComplete) {
                    onComplete(sprite, property);
                }
            },
            onCompleteScope: this
        }
        config[property] = value;

        var tween = this.scene.tweens.add(config);
        tween.timeScale = this.timeScale;
        tweenTasks[property] = tween;
        return this;
    }

    setTexture(textureKey, frameKey) {
        this.sprite.setTexture(textureKey, frameKey);
        return this;
    }

    playAnimation(key) {
        this.sprite.anims.timeScale = this.timeScale;
        this.sprite.play(key);
        return this;
    }

    stopAnimation() {
        this.sprite.stop();
        return this;
    }

    chainAnimation(keys) {
        this.sprite.chain(keys);
        return this;
    }

    pauseAnimation() {
        this.sprite.anims.pause();
        return this;
    }

    setTimeScale(timeScale) {
        if (this.sprite.anims) {
            this.sprite.anims.timeScale = timeScale;
        }

        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
            tweenTasks[key].timeScale = timeScale;
        }

        return this;
    }
}

export default SpriteData;