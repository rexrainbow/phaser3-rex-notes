'use strict'

import Phaser from 'phaser';
import loki from './../utils/lokijs/lokijs.min.js';
import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
class InstDBPlugin {
    constructor(parent, config) {
        this.db = new loki();
        this.curColl = null;
        this.curCollName = GetFastValue(config, "table", "_");

        this.parent = parent;
        this.boot();
    }

    boot() {
        var eventEmitter = GetEventEmmiter(this.parent);
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    shutdown() {}

    destroy() {}

    getCollection(tableName) {
        if (tableName === undefined) {
            tableName = this.curCollName;
        }
        if ((tableName === this.curCollName) && this.curColl) {
            return this.curColl;
        }

        var coll = this.db.getCollection(tableName);
        if (coll == null) {
            coll = this.db.addCollection(tableName, {
                disableMeta: true
            });
        }
        this.curColl = coll;
        this.curCollName = tableName;
        return coll;
    }

    addInst(inst, tableName) {
        var coll = this.getCollection(tableName);
        coll.insert(inst);
        // TODO: remove record when destroy event fired
        inst.on('destroy',
            this.removeInst, this,
            inst, this.tableName);
        return this;
    }

    removeInst(inst, tableName) {
        var coll = this.getCollection(tableName);
        coll.remove(inst);
        return this;
    }

    getAll(tableName) {
        var coll = this.getCollection(tableName);
        return coll.find();
    }

    get(id, tableName) {
        var coll = this.getCollection(tableName);
        return coll.get(id);
    }

    static getId(inst) {
        return inst.$loki;
    }
}

export default InstDBPlugin;