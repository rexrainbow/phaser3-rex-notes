const Base = Phaser.Data.DataManager;

class DataManager extends Base {
    constructor(parent, eventEmitter) {
        super(parent, eventEmitter);

        this._version = 0;
        this.changeList = {};
        this.repository = [];
        this.rollbackFlag = false;

        this.events.on('setdata', this.onValueChange, this);
        this.events.on('changedata', this.onValueChange, this);
    }

    get version() {
        return this._version;
    }

    set version(value) {
        if (this.repository.length === 0) {
            return;
        }

        value = Math.min(value, this.repository.length);
        if (this._version === value) {
            return;
        }

        var changeList, merged = {};
        if (this._version < value) {
            // Forward
            for (var key in this.changeList) {
                merged[key] = this.changeList[key][0];
                delete this.changeList[key];
            }
            for (var i = this._version; i < value; i++) {
                changeList = this.repository[i];
                for (var key in changeList) {
                    merged[key] = changeList[key][0];
                }
            }
        } else {
            // Backward
            for (var key in this.changeList) {
                merged[key] = this.changeList[key][1];
                delete this.changeList[key];
            }
            for (var i = this._version - 1; i >= value; i--) {
                changeList = this.repository[i];
                for (var key in changeList) {
                    merged[key] = changeList[key][1];
                }
            }
        }

        this._version = value;
        var value;
        this.rollbackFlag = true;
        for (var key in merged) {
            value = merged[key];
            if (value === undefined) {
                this.removeValue(key);
            } else {
                this.setValue(key, value);
            }
        }
        this.rollbackFlag = false;
    }

    get lastVersion() {
        return this.repository.length;
    }

    commit() {
        this.repository.length = this._version;
        this.repository.push(this.changeList);
        this.changeList = {};
        this._version++;
        return this;
    }

    rollback(value) {
        this.version = value;
        return this;
    }

    onValueChange(parent, key, value, previousValue) {
        if (this.rollbackFlag) {
            return;
        }

        if (this.changeList.hasOwnProperty(key)) {
            this.changeList[key][0] = value;
        } else {
            this.changeList[key] = [value, previousValue];
            // [newData, previousData]
        }
    }
}
export default DataManager;