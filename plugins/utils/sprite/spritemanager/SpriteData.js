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

    easeProperty(property, value, duration, ease, isYoyo, onComplete) {
        var tweenTasks = this.tweens;
        if (tweenTasks.hasOwnProperty(property)) {
            tweenTasks[property].remove();
        }

        var config = {
            targets: this.sprite,
            duration: duration,
            ease: ease,
            yoyo: isYoyo,
            onComplete: function () {
                tweenTasks[property].remove();
                delete tweenTasks[property];
                if (onComplete) {
                    onComplete();
                }
            },
            onCompleteScope: this
        }
        config[property] = value;
        tweenTasks[property] = this.scene.tweens.add(config);
        return this;
    }

    setTexture(textureKey, frameKey) {
        this.sprite.setTexture(textureKey, frameKey);
        return this;
    }

    playAnimation(key) {
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
}

export default SpriteData;