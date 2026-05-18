export default {
    hasData(dataKey?: any) {
        var gameObject = this.gameObject;
        return (gameObject.data) ? gameObject.data.has(dataKey) : false;
    },

    getData(dataKey?: any) {
        return this.gameObject.getData(dataKey);
    },

    setData(dataKey?: any, value?: any) {
        this.gameObject.setData(dataKey, value);
        return this;
    },
}