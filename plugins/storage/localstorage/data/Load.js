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

var Load = function (initialData, reset) {
    LoadDataKeys.call(this);

    this._syncEnable = false;
    this.reset();
    this._syncEnable = true;

    if (initialData) {  // Load data according to initialData
        var value, prevValue;
        for (var dataKey in initialData) {
            prevValue = (reset) ? undefined : this.getItem(dataKey);
            value = (prevValue === undefined) ? initialData[dataKey] : prevValue;
            this.set(dataKey, value);
        }

        this.dataKeys.each(function (dataKey, index) {
            if (!(dataKey in initialData)) {
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