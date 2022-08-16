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
        var tweenTasks = this.tweens,
            tweenTask;
        for (var propName in tweenTasks) {
            tweenTask = tweenTasks[propName];
            if (tweenTask) {
                tweenTask.remove();
            }
            tweenTasks[propName] = null;
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

    hasProperty(property) {
        var gameObject = this.gameObject;
        if (gameObject.hasOwnProperty(property)) {
            return true;
        } else {
            var value = gameObject[property];
            return (value !== undefined);
        }
    }

    getProperty(property) {
        return this.gameObject[property];
    }

    setProperty(property, value) {
        this.gameObject[property] = value;
        return this;
    }

    easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete) {
        var tweenTasks = this.tweens;
        var tweenTask = tweenTasks[property];
        if (tweenTask) {
            tweenTask.remove();
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
                tweenTasks[property] = null;
                if (onComplete) {
                    onComplete(gameObject, property);
                }
            },
            onCompleteScope: this
        }
        config[property] = value;

        tweenTask = this.scene.tweens.add(config);
        tweenTask.timeScale = this.timeScale;
        tweenTasks[property] = tweenTask;
        return this;
    }

    setTimeScale(timeScale) {
        var tweenTasks = this.tweens;
        for (var key in tweenTasks) {
            tweenTasks[key].timeScale = timeScale;
        }

        return this;
    }

    hasMethod(methodName) {
        return typeof (this.gameObject[methodName]) === 'function';
    }

    call(methodName, ...parameters) {
        if (!this.hasMethod(methodName)) {
            return this;
        }

        var gameObject = this.gameObject;
        gameObject[methodName].apply(gameObject, parameters);

        return this;
    }
}

export default BobBase;