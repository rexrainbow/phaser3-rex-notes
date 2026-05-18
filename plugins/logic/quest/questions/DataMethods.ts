export default {
    getData(key?: any, defaultValue?: any) {
        return this._quest.getData(key, defaultValue);
    },

    setData(key?: any, value?: any) {
        this._quest.setData(key, value);
        return this;
    },

    incData(key?: any, inc?: any, defaultValue?: any) {
        this._quest.incData(key, inc, defaultValue);
        return this;
    },

    mulData(key?: any, mul?: any, defaultValue?: any) {
        this._quest.mulData(key, mul, defaultValue);
        return this;
    },

    clearData() {
        this._quest.clearData();
        return this;
    },
}