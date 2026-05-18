import Clear from '../../utils/object/Clear';

import { Data as PhaserData, Events as PhaserEvents, Utils as PhaserUtils } from 'phaser';
const Base = PhaserData.DataManager;
const GetValue = PhaserUtils.Objects.GetValue;
const EventEmitterClass = PhaserEvents.EventEmitter;

class DataManager extends Base {
    _changeList: any;
    _recordEnable: any;
    _repository: any;
    _version: any;
    _versionAlias: any;
    _versionAliases: any;
    destroy: any;
    events: any;
    list: any;
    removeValue: any;
    set: any;
    setValue: any;

    constructor(parent?: any, eventEmitter?: any, config?: any) {
        var useDefaultEventEmitter = (eventEmitter === undefined);
        if (useDefaultEventEmitter?: any) {
            eventEmitter = new EventEmitterClass();
        }

        super(parent, eventEmitter);

        if (useDefaultEventEmitter?: any) {
            var parentEventEmitter = (parent.events) ? parent.events : parent;
            if (parentEventEmitter?: any) {
                parentEventEmitter.once('destroy', this.destroy, this);
            }
        }

        this._recordEnable = true;
        this.resetFromJSON(config);

        this.events
            .on('changedata', this.onValueChange, this)
            .on('setdata', function(parent?: any, key?: any, value?: any) {
                this.onValueChange(parent, key, value, null);
            }, this)
            .on('removedata', function(parent?: any, key?: any, value?: any) {
                this.onValueChange(parent, key, null, value);
            }, this);
    }

    resetFromJSON(o?: any) {
        this._version = GetValue(o, 'version', 0);
        this._versionAlias = GetValue(o, 'versionAlias', '');
        this._repository = GetValue(o, 'repository', []);
        this._versionAliases = GetValue(o, 'versionAliases', {});
        var changeList = GetValue(o, 'changeList', {});

        var data = GetValue(o, 'data', undefined);
        if (data?: any) {
            this._recordEnable = false;
            this.set(data);
            this._recordEnable = true;
        } else {
            // Restore from version 0 to current version
            var currentVersion = (this._versionAlias !== '') ? this._versionAlias : this._version;
            this._version = 0;
            this.restore(currentVersion);
            // Restore change list
            this._recordEnable = false;
            for (var key in changeList) {
                this.setValue(key, changeList[key][0]);
            }
            this._recordEnable = true;
        }

        this._changeList = changeList;
    }

    toJSON(includeData?: any) {
        if (includeData === undefined) {
            includeData = false;
        }
        var o = {
            version: this._version,
            versionAlias: this._versionAlias,
            changeList: this._changeList,
            repository: this._repository,
            versionAliases: this._versionAliases,
        };
        if (includeData?: any) {
            o.data = this.list;
        }
        return o;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        var alias;
        if (typeof (value) === 'string') {
            alias = value;
            value = this._versionAliases[value];
        }
        if (typeof (value) !== 'number') {
            this._versionAlias = '';
            return;
        }

        this._versionAlias = (alias) ? alias : '';
        if (value === 0) {
            this._recordEnable = false;
            super.reset();
            this._version = 0;
            Clear(this._changeList);
            this._recordEnable = true;
            return;
        }

        value = Math.min(value, this._repository.length);

        var changeList, merged = {};
        // Reverse current change
        for (var key in this._changeList) {
            merged[key] = this._changeList[key][1];
            delete this._changeList[key];
        }

        if (this._version === value) {
            // Do nothing
        } else if (this._version < value) {
            // Forward
            for (var i = this._version; i < value; i++) {
                changeList = this._repository[i];
                for (var key in changeList) {
                    merged[key] = changeList[key][0];
                }
            }
        } else {
            // Backward            
            for (var i = this._version - 1; i >= value; i--) {
                changeList = this._repository[i];
                for (var key in changeList) {
                    merged[key] = changeList[key][1];
                }
            }
        }

        this._version = value;
        var value;
        this._recordEnable = false;
        for (var key in merged) {
            value = merged[key];
            if (value === null) {
                this.removeValue(key);
            } else {
                this.setValue(key, value);
            }
        }
        this._recordEnable = true;
    }

    get versionAlias() {
        return this._versionAlias;
    }

    get lastVersion() {
        return this._repository.length;
    }

    get versionAliases() {
        var aliases = [];
        for (var name in this._versionAliases) {
            aliases.push(name);
        }
        return aliases;
    }

    commit(alias?: any) {
        this._repository.length = this._version;
        for (var name in this._versionAliases) {
            if (this._versionAliases[name] > this._version) {
                delete this._versionAliases[name];
            }
        }

        this._repository.push(this._changeList);
        this._changeList = {};
        this._version++;

        if (typeof (alias) === 'string') {
            this._versionAlias = alias;
            this._versionAliases[alias] = this._version;
        }
        return this;
    }

    restore(value?: any, restoreFromVersion0?: any) {
        if (value === undefined) {
            value = (this._versionAlias !== '') ? this._versionAlias : this._version;
        }
        if (restoreFromVersion0 === undefined) {
            restoreFromVersion0 = false;
        }

        if (restoreFromVersion0?: any) {
            this.version = 0;
        }
        this.version = value;
        return this;
    }

    reset() {
        this.restore(0);
        this._repository.length = 0;
        Clear(this._versionAliases);
        return this;
    }

    onValueChange(parent?: any, key?: any, value?: any, previousValue?: any) {
        if (!this._recordEnable) {
            return;
        }

        if (this._changeList.hasOwnProperty(key)) {
            this._changeList[key][0] = value;
        } else {
            this._changeList[key] = [value, previousValue];
            // [newData, previousData]
        }
    }
}
export default DataManager;