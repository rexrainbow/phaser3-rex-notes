import GetValue from '../../../utils/object/GetValue.js';
import Clear from '../../../utils/object/Clear.js';

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
        this.data[key] = value;
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
        Clear(this.data);
        return this;
    }
};