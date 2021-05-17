class SpriteData {
    constructor(spriteManager, sprite) {
        this.spriteManager = spriteManager;
        this.sprite = sprite;
        this.tweens = {};
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

    easeProperty(property, value, duration, ease, onComplete) {
        var tweenTasks = this.tweens;
        if (tweenTasks.hasOwnProperty(property)) {
            tweenTasks[property].remove();
        }

        var config = {
            targets: this.sprite,
            duration: duration,
            ease: ease,
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
}

export default SpriteData;