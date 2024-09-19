export default {
    setData(key, value) {
        var blackboard = this.blackboard;

        if (typeof (key) === 'string') {
            blackboard.setData(key, value);
        } else {
            var data = key;
            for (key in data) {
                value = data[key];
                blackboard.setData(key, value);
            }
        }

        return this;
    },

    incData(key, inc) {
        var value;
        if (this.hasData(key)) {
            value = this.getData(key);
        } else {
            value = 0;
        }
        this.setData(value + inc);
        return this;
    },

    toggleData(key) {
        var value;
        if (this.hasData(key)) {
            value = this.getData(key);
        } else {
            value = false;
        }
        this.setData(!value);
        return this;
    },

    hasData(key) {
        return this.blackboard.hasData(key);
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