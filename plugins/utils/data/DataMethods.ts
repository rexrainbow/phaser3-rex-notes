import GetValue from '../object/GetValue';
import Clear from '../object/Clear';

export default {
    enableData() {
        if (this.data === undefined) {
            this.data = {};
        }
        return this;
    },

    setData(key?: any, value?: any) {
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

    getData(key?: any, defaultValue?: any) {
        this.enableData();
        return (key === undefined) ? this.data : GetValue(this.data, key, defaultValue);
    },

    incData(key?: any, inc?: any, defaultValue?: any) {
        if (defaultValue === undefined) {
            defaultValue = 0;
        }
        this.enableData();
        this.setData(key, this.getData(key, defaultValue) + inc);
        return this;
    },

    mulData(key?: any, mul?: any, defaultValue?: any) {
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
};