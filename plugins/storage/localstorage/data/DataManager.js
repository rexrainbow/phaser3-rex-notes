import StorageMethods from './StorageMethods.js';

const Base = Phaser.Data.DataManager;
const GetValue = Phaser.Utils.Objects.GetValue;
const EventEmitterKlass = Phaser.Events.EventEmitter;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const SetStruct = Phaser.Structs.Set;

class DataManager extends Base {
    constructor(parent, eventEmitter, config) {
        if (IsPlainObject(eventEmitter)) {
            config = eventEmitter;
            eventEmitter = undefined;
        }
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitterKlass();
        }
        super(parent, eventEmitter);

        this._syncEnable = true;
        this.dataKeys = new SetStruct();

        this.events
            .on('changedata', function (parent, key, value, previousValue) {
                if (!this._syncEnable) {
                    return;
                }
                if (value === previousValue) {
                    return;
                }
                this.setItem(key, value);
            }, this)
            .on('setdata', function (parent, key, value) {
                if (!this._syncEnable) {
                    return;
                }
                this.setItem(key, value);
                this.dataKeys.set(key);
            }, this)
            .on('removedata', function (parent, key, value) {
                if (!this._syncEnable) {
                    return;
                }
                this.removeItem(key);
                this.dataKeys.delete(key);
                this.setItem('__keys__', this.dataKeys.entries);
            }, this);

        this.name = GetValue(config, 'name', '');
        this.load(GetValue(config, 'init', undefined), GetValue(config, 'reset', false));
    }

    loadDataKeys() {
        this.dataKeys.clear();
        var keys = this.getItem('__keys__');
        if (keys) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.dataKeys.set(keys[i]);
            }
        }
        return this;
    }

    load(initialData, reset) {
        this.loadDataKeys();

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
}

Object.assign(
    DataManager.prototype,
    StorageMethods
);

export default DataManager;