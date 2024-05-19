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

    easeProperty(config) {
        var property = config.property;
        var value = config.value;
        var duration = config.duration;
        var delay = config.delay;
        var ease = config.ease;
        var repeat = config.repeat;
        var isYoyo = config.yoyo;
        var isFrom = config.from;
        var onComplete = config.complete;
        var target = config.target;

        if (duration === undefined) {
            duration = 1000;
        }
        if (delay === undefined) {
            delay = 0;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }
        if (repeat === undefined) {
            repeat = 0;
        }
        if (isYoyo === undefined) {
            isYoyo = false;
        }
        if (target === undefined) {
            target = this.gameObject;
        }
        if (isFrom) {
            var startValue = value;
            value = target[property];
            target[property] = startValue;
        }

        var config = {
            targets: target,
            duration: duration,
            delay: delay,
            ease: ease,
            repeat: repeat,
            yoyo: isYoyo,
            onComplete: onComplete,
        }
        config[property] = value;

        this.addTweenTask(property, config);

        return this;
    },

    addTweenTask(name, config) {
        var tweenTasks = this.tweens;
        var tweenTask = tweenTasks[name];
        if (tweenTask) {
            tweenTask.remove();
        }

        var onComplete = config.onComplete;
        config.onComplete = function () {
            tweenTasks[name].remove();
            tweenTasks[name] = null;
            if (onComplete) {
                onComplete(config.targets, name);
            }
        }

        tweenTask = this.scene.tweens.add(config);
        tweenTask.timeScale = this.timeScale;
        tweenTasks[name] = tweenTask;
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