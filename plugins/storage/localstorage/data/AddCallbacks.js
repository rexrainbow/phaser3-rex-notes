var AddCallbacks = function (dataManager) {
    dataManager.events

        // Change value
        .on('changedata', function (parent, key, value, previousValue) {
            if (!this._syncEnable) {
                return;
            }
            if ((typeof (value) !== 'object') && (value === previousValue)) {
                return;
            }
            this.setItem(key, value);
            if (!this.dataKeys.has(key)) {
                this.dataKeys.add(key);
                this.setItem('__keys__', Array.from(this.dataKeys));
            }
        }, dataManager)

        // Add key
        .on('setdata', function (parent, key, value) {
            if (!this._syncEnable) {
                return;
            }
            this.setItem(key, value);
            this.dataKeys.add(key);
            this.setItem('__keys__', Array.from(this.dataKeys));
        }, dataManager)

        // Remove key
        .on('removedata', function (parent, key, value) {
            if (!this._syncEnable) {
                return;
            }
            this.removeItem(key);
            this.dataKeys.delete(key);
            this.setItem('__keys__', Array.from(this.dataKeys));
        }, dataManager);

}

export default AddCallbacks;