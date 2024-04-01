export default {
    hasProperty(property) {
        var gameObject = this.gameObject;
        if (gameObject.hasOwnProperty(property)) {
            return true;
        } else {
            var value = gameObject[property];
            return (value !== undefined);
        }
    },

    getProperty(property) {
        return this.gameObject[property];
    },

    setProperty(property, value) {
        this.gameObject[property] = value;
        return this;
    },

    easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete, target) {
        if (target === undefined) {
            target = this.gameObject;
        }

        var tweenTasks = this.tweens;
        var tweenTask = tweenTasks[property];
        if (tweenTask) {
            tweenTask.remove();
        }

        var config = {
            targets: target,
            duration: duration,
            ease: ease,
            repeat: repeat,
            yoyo: isYoyo,
            onComplete: function () {
                tweenTasks[property].remove();
                tweenTasks[property] = null;
                if (onComplete) {
                    onComplete(target, property);
                }
            },
        }
        config[property] = value;

        tweenTask = this.scene.tweens.add(config);
        tweenTask.timeScale = this.timeScale;
        tweenTasks[property] = tweenTask;
        return this;
    },

    getTweenTask(property) {
        return this.tweens[property];
    },

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

}