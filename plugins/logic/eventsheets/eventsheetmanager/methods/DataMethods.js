export default {
    setData(key, value) {
        if (typeof (key) === 'string') {
            this.blackboard.setData(key, value);
        } else {
            var data = key;
            for (key in data) {
                this.blackboard.setData(key, data[key]);
            }
        }

        return this;
    },

    hasData(key) {
        return this.blackboard.hasData(key);
    },

    incData(key, inc) {
        this.blackboard.incData(key, inc);
        return this;
    },

    toggleData(key) {
        this.blackboard.toggleData(key);
        return this;
    },

    getData(key) {
        return this.blackboard.getData(key);
    },

    removeData(key) {
        this.blackboard.removeData(key);
        return this;
    },

    addExpression(name, callback) {
        this.setData(name, callback);
        return this;
    },

    addExpressions(data) {
        this.setData(data);
        return this;
    },
}