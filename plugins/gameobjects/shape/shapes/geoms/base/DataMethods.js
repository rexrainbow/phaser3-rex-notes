var SetData = function (key, value) {
    if (this.data === undefined) {
        this.data = {};
    }
    this.data[key] = value;
    return this;
}

var GetData = function (key, defaultValue) {
    if (this.data === undefined) {
        this.data = {};
    }
    if (!this.data.hasOwnProperty(key)) {
        this.data[key] = defaultValue;
    }
    return this.data[key];
}

export default {
    setData: SetData,
    getData: GetData
}