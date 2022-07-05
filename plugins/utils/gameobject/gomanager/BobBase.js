class BobBase {
    constructor(GOManager, gameObject, name) {
        this.GOManager = GOManager;
        this.tweens = {};
        this.setGO(gameObject, name);
    }

    get scene() {
        return this.GOManager.scene;
    }

    get timeScale() {
        return this.GOManager.timeScale;
    }

    destroy() {
        this.freeGO();
        this.GOManager = undefined;
    }

    freeTweens() {
        var tweenTasks = this.tweens;
        for (var propName in tweenTasks) {
            tweenTasks[propName].remove();
            delete tweenTasks[propName];
        }
        return this;
    }

    freeGO() {
        this.freeTweens();
        this.gameObject.destroy();
        this.gameObject = undefined;
        return this;
    }

    setGO(gameObject, name) {
        this.gameObject = gameObject.setName(name);
        this.name = name;
        this.freeTweens();
        return this;
    }

    setProperty(property, value) {
        this.gameObject[property] = value;
        return this;
    }

    easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete) {
        var tweenTasks = this.tweens;
        if (tweenTasks.hasOwnProperty(property)) {
            tweenTasks[property].remove();
        }

        var gameObject = this.gameObject;
        var config = {
            targets: gameObject,
            duration: duration,
            ease: ease,
            repeat: repeat,
            yoyo: isYoyo,
            onComplete: function () {
                tweenTasks[property].remove();
                delete tweenTasks[property];
                if (onComplete) {
                    onComplete(gameObject, property);
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

    setTimeScale(timeScale) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
            tweenTasks[key].timeScale = timeScale;
        }

        return this;
    }
}

export default BobBase;