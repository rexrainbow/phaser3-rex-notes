(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlocalstoragedataplugin = factory());
})(this, (function () { 'use strict';

    var GetStoreKey = function (key, prefix) {
        if (prefix && prefix !== '') {
            return `${prefix}.${key}`;
        } else {
            return key;
        }
    };

    var GetDataKey = function (key, prefix) {
        if (prefix && prefix !== '') {
            return key.substring(prefix.length + 1)
        } else {
            return key;
        }
    };

    var SetItem = function (dataKey, prefix, value) {
        // Ref : https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#basic_concepts
        // **The keys and the values are always strings**
        value = JSON.stringify([value]);
        localStorage.setItem(GetStoreKey(dataKey, prefix), value);
    };

    var GetItem = function (dataKey, prefix) {
        var value = localStorage.getItem(GetStoreKey(dataKey, prefix));

        if (value == null) {
            return undefined;
        } else {
            value = JSON.parse(value)[0];
            return value
        }
    };

    var RemoveItem = function (dataKey, prefix) {
        localStorage.removeItem(GetStoreKey(dataKey, prefix));
        return this;
    };

    var StorageMethods = {
        getStoreKey(dataKey) {
            return GetStoreKey(dataKey, this.name);
        },

        getDataKey(storeKey) {
            return GetDataKey(storeKey, this.name);
        },

        setItem(dataKey, value) {
            SetItem(dataKey, this.name, value);
            return this;
        },

        getItem(dataKey) {
            return GetItem(dataKey, this.name);
        },

        removeItem(dataKey) {
            RemoveItem(dataKey, this.name);
            return this;
        }
    };

    var LoadDataKeys = function () {
        this.dataKeys.clear();
        var keys = this.getItem('__keys__');
        if (keys) {
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                this.dataKeys.set(keys[i]);
            }
        }
        return this;
    };

    var Load = function (defaultData, reset) {
        if (defaultData === undefined) {
            reset = false;
        }

        LoadDataKeys.call(this);
        this.defaultData = defaultData;

        this._syncEnable = false;
        this.reset();
        if (!reset) {
            // Load data from localstorage according to dataKeys
            this.dataKeys.iterate(function (dataKey, index) {
                this.set(dataKey, this.getItem(dataKey));
            }, this);
        }
        this._syncEnable = true;

        if (defaultData) {  // Load data according to defaultData        
            var value, prevValue;
            for (var dataKey in defaultData) {
                prevValue = (reset) ? undefined : this.getItem(dataKey);
                value = (prevValue === undefined) ? defaultData[dataKey] : prevValue;
                this.set(dataKey, value);
            }

            this.setItem('__keys__', this.dataKeys.entries);
        }

        return this;
    };

    var GetDefaultValue = function (key) {
        return (this.defaultData) ? this.defaultData[key] : undefined;
    };

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
                if (!this.dataKeys.contains(key)) {
                    this.dataKeys.set(key);
                    this.setItem('__keys__', this.dataKeys.entries);
                }
            }, dataManager)

            // Add key
            .on('setdata', function (parent, key, value) {
                if (!this._syncEnable) {
                    return;
                }
                this.setItem(key, value);
                this.dataKeys.set(key);
                this.setItem('__keys__', this.dataKeys.entries);
            }, dataManager)

            // Remove key
            .on('removedata', function (parent, key, value) {
                if (!this._syncEnable) {
                    return;
                }
                this.removeItem(key);
                this.dataKeys.delete(key);
                this.setItem('__keys__', this.dataKeys.entries);
            }, dataManager);

    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const SetStruct = Phaser.Structs.Set;


    var methods = {
        load: Load,
        getDefaultValue: GetDefaultValue,
    };

    var Extend = function (dataManager, config) {
        if (dataManager.hasOwnProperty('_syncEnable')) {
            // Already extended
            return dataManager;
        }

        dataManager._syncEnable = true;
        dataManager.dataKeys = new SetStruct();
        dataManager.defaultData = undefined;

        Object.assign(
            dataManager,
            StorageMethods,
            methods
        );

        AddCallbacks(dataManager);

        dataManager.name = GetValue(config, 'name', '');

        var load = GetValue(config, 'load', true);
        if (load) {
            var defaultData = GetValue(config, 'default', undefined);
            var resetFlag = GetValue(config, 'reset', false);
            dataManager.load(defaultData, resetFlag);
        }

        return dataManager;
    };

    const Base = Phaser.Data.DataManager;
    const EventEmitterClass = Phaser.Events.EventEmitter;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    class DataManager extends Base {
        constructor(parent, eventEmitter, config) {
            if (IsPlainObject(parent)) {
                config = parent;
                parent = undefined;
                eventEmitter = undefined;
            } else if (IsPlainObject(eventEmitter)) {
                config = eventEmitter;
                eventEmitter = undefined;
            }

            var useDefaultEventEmitter = (eventEmitter === undefined);
            if (useDefaultEventEmitter) {
                eventEmitter = new EventEmitterClass();
            }
            if (parent === undefined) {
                parent = eventEmitter;
            }

            super(parent, eventEmitter);

            if (useDefaultEventEmitter) {
                var parentEventEmitter = (parent.events) ? parent.events : parent;
                if (parentEventEmitter) {
                    parentEventEmitter.once('destroy', this.destroy, this);
                }
            }

            Extend(this, config);
        }
    }

    class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(parent, eventEmitter, config) {
            return new DataManager(parent, eventEmitter, config);
        }

        extend(dataManager, config) {
            return Extend(dataManager, config);
        }

        setItem(dataKey, name, value) {
            SetItem(dataKey, name, value);
            return this;
        }

        getItem(dataKey, name) {
            return GetItem(dataKey, name);
        }

        removeItem(dataKey, name) {
            RemoveItem(dataKey, name);
            return this;
        }
    }

    return DataManagerPlugin;

}));
