var LoadDataKeys = function() {
    this.dataKeys.clear();
    var keys = this.getItem('__keys__');
    if (keys?: any) {
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            this.dataKeys.add(keys[i]);
        }
    }
    return this;
}

var Load = function(defaultData?: any, reset?: any) {
    if (defaultData === undefined) {
        reset = false;
    }

    LoadDataKeys.call(this);
    this.defaultData = defaultData;

    this._syncEnable = false;
    this.reset();
    if (!reset) {
        // Load data from localstorage according to dataKeys
        this.dataKeys.forEach(function(dataKey?: any, index?: any) {
            this.set(dataKey, this.getItem(dataKey));
        }, this);
    }
    this._syncEnable = true;

    if (defaultData?: any) {  // Load data according to defaultData        
        var value, prevValue;
        for (var dataKey in defaultData) {
            prevValue = (reset) ? undefined : this.getItem(dataKey);
            value = (prevValue === undefined) ? defaultData[dataKey] : prevValue;
            this.set(dataKey, value);
        }

        this.setItem('__keys__', Array.from(this.dataKeys));
    }

    return this;
}

export default Load;