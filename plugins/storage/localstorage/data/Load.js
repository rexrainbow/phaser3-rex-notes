var LoadDataKeys = function () {
    this.dataKeys.clear();
    var keys = this.getItem('__keys__');
    if (keys) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.dataKeys.set(keys[i]);
        }
    }
    return this;
}

var Load = function (defaultData, reset) {
    LoadDataKeys.call(this);
    this.defaultData = defaultData;

    this._syncEnable = false;
    this.reset();
    this._syncEnable = true;

    if (defaultData) {  // Load data according to defaultData
        var value, prevValue;
        for (var dataKey in defaultData) {
            prevValue = (reset) ? undefined : this.getItem(dataKey);
            value = (prevValue === undefined) ? defaultData[dataKey] : prevValue;
            this.set(dataKey, value);
        }

        this.dataKeys.each(function (dataKey, index) {
            if (!(dataKey in defaultData)) {
                this.removeItem(dataKey);
                this.dataKeys.delete(dataKey);
            }
        }, this);
        this.setItem('__keys__', this.dataKeys.entries);
    } else { // Load data from localstorage according to dataKeys
        this._syncEnable = false;
        this.dataKeys.iterate(function (dataKey, index) {
            this.set(dataKey, this.getItem(dataKey));
        }, this);
        this._syncEnable = true;
    }

    return this;
}

export default Load;