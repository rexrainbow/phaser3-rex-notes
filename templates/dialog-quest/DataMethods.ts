export default {
    getData(key?: any, defaultValue?: any) {
        return this.questionManager.getData(key, defaultValue);
    },

    setData(key?: any, value?: any) {
        this.questionManager.setData(key, value);
        return this;
    },

    incData(key?: any, inc?: any, defaultValue?: any) {
        this.questionManager.incData(key, inc, defaultValue);
        return this;
    },

    mulData(key?: any, mul?: any, defaultValue?: any) {
        this.questionManager.mulData(key, mul, defaultValue);
        return this;
    },

    clearData() {
        this.questionManager.clearData();
        return this;
    },
};