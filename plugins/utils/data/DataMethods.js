import GetValue from '../object/GetValue.js';
import Clear from '../object/Clear.js';
import Clone from '../object/Clone.js';

export default {
    enableData() {
        if (this.data === undefined) {
            this.data = {};
        }
        return this;
    },

    getData(key, defaultValue) {
        this.enableData();
        return (key === undefined) ? this.data : GetValue(this.data, key, defaultValue);
    },

    setData(key, value) {
        this.enableData();
        if (arguments.length === 1) {
            var data = key;
            for (key in data) {
                this.data[key] = data[key];
            }
        } else {
            this.data[key] = value;
        }
        return this;
    },

    incData(key, inc, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = 0;
        }
        this.enableData();
        this.setData(key, this.getData(key, defaultValue) + inc);
        return this;
    },

    mulData(key, mul, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = 0;
        }
        this.enableData();
        this.setData(key, this.getData(key, defaultValue) * mul);
        return this;
    },

    clearData() {
        if (this.data) {
            Clear(this.data);
        }
        return this;
    },

    resetData(data) {
        this.clearData();

        if (data) {
            this.enableData();
            for (var key in data) {
                this.data[key] = data[key];
            }
        }
        return this;
    },

    cloneData() {
        if (this.data) {
            return Clone(this.data);
        } else {
            return {};
        }
    }
};