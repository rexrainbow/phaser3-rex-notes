export default {
    setData(key?: any, value?: any) {
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

    incData(key?: any, inc?: any) {
        var value;
        if (this.hasData(key)) {
            value = this.getData(key);
        } else {
            value = 0;
        }
        this.setData(value + inc);
        return this;
    },

    toggleData(key?: any) {
        var value;
        if (this.hasData(key)) {
            value = this.getData(key);
        } else {
            value = false;
        }
        this.setData(!value);
        return this;
    },

    hasData(key?: any) {
        return this.blackboard.hasData(key);
    },

    getData(key?: any) {
        return this.blackboard.getData(key);
    },

    removeData(key?: any) {
        this.blackboard.removeData(key);
        return this;
    },

    addExpression(name?: any, callback?: any) {
        this.setData(name, callback);
        return this;
    },

    addExpressions(data?: any) {
        this.setData(data);
        return this;
    },
}