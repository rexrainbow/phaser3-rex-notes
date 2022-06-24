export default {
    setProperty(name, property, value) {
        if (!this.has(name)) {
            return this;
        }
        this.get(name).setProperty(property, value);
        return this;
    },

    easeProperty(name, property, value, duration, ease, repeat, isYoyo, onComplete) {
        if (!this.has(name)) {
            return this;
        }

        if (duration === undefined) {
            duration = 1000;
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

        this.get(name).easeProperty(property, value, duration, ease, repeat, isYoyo, onComplete);
        return this;
    },

    getTweenTask(name, property) {
        if (this.has(name)) {
            var tweenTasks = this.get(name).tweens;
            if (tweenTasks.hasOwnProperty(property)) {
                return tweenTasks[property];
            }
        }
        return null;
    }
}