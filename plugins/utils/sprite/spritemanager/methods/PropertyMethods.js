export default {
    setProperty(name, property, value) {
        if (!this.has(name)) {
            return this;
        }
        this.get(name).setProperty(property, value);
        return this;
    },

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
    },

    getTweenTask(name, prop) {
        if (this.has(name)) {
            var tweenTasks = this.get(name).tweens;
            if (tweenTasks.hasOwnProperty(prop)) {
                return tweenTasks[prop];
            }
        }
        return null;
    }
}