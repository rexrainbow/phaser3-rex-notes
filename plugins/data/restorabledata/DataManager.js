import Clear from 'rexPlugins/utils/object/Clear.js';

const Base = Phaser.Data.DataManager;
const GetValue = Phaser.Utils.Objects.GetValue;

class DataManager extends Base {
    constructor(parent, eventEmitter, config) {
        super(parent, eventEmitter);

        this.recordEnable = true;
        this.resetFromJSON(config);

        this.events
            .on('changedata', this.onValueChange, this)
            .on('setdata', function (parent, key, value) {
                this.onValueChange(parent, key, value, null);
            }, this)
            .on('removedata', function (parent, key, value) {
                this.onValueChange(parent, key, null, value);
            }, this);
    }

    resetFromJSON(o) {
        this._version = GetValue(o, 'version', 0);
        this.changeList = GetValue(o, 'changeList', {});
        this.repository = GetValue(o, 'repository', []);

        var data = GetValue(o, 'data', undefined);
        if (data) {
            this.recordEnable = false;
            this.set(data);
            this.recordEnable = true;
        } else {
            // Restore from version 0 to current version
            var currentVersion = this._version;
            this._version = 0;
            this.restore(currentVersion);
        }
    }

    toJSON(includeData) {
        if (includeData === undefined) {
            includeData = false;
        }
        var o = {
            version: this._version,
            changeList: this.changeList,
            repository: this.repository,
        };
        if (includeData) {
            o.data = this.list;
        }
        return o;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        if (value === undefined) {
            value = this._version;
        }
        value = Math.min(value, this.repository.length);
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
        this.recordEnable = false;
        for (var key in merged) {
            value = merged[key];
            if (value === null) {
                this.removeValue(key);
            } else {
                this.setValue(key, value);
            }
        }
        this.recordEnable = true;
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

    restore(value) {
        this.version = value;
        return this;
    }

    reset() {
        super.reset();
        this._version = 0;
        Clear(this.changeList);
        this.repository.length = 0;
        return this;
    }

    onValueChange(parent, key, value, previousValue) {
        if (!this.recordEnable) {
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