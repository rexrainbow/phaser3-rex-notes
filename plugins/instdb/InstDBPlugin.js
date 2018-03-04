'use strict'

import Phaser from 'phaser';
import loki from './../utils/lokijs/lokijs.min.js';
import IsArray from './../utils/array/IsArray.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const instDB = new loki();   // global db for all scenes
class InstDBPlugin {
    constructor(scene, config) {
        this.scene = scene;
        this.systems = scene.sys;

        this.collName = scene.sys.settings.key;
        this.coll = instDB.addCollection(this.collName, {
            disableMeta: true
        });

        this.boot();
    }

    boot() {
        var eventEmitter = this.systems.events;
        if (eventEmitter) {
            eventEmitter.on('shutdown', this.shutdown, this);
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        instDB.removeCollection(this.collName);
    }

    destroy() {
        this.shutdown();
    }

    getCollection(sceneKey) {
        if (sceneKey === undefined) {
            return this.coll;
        }

        return instDB.getCollection(sceneKey);
    }

    addInst(inst, destroyable) {
        if (destroyable === undefined) { destroyable = true; }

        this.coll.insert(inst);
        // TODO: remove record when destroy event fired
        if (destroyable) {
            inst.on('destroy',
                this.removeInst, this,
                inst, this.collName);
        }
        return this;
    }

    removeInst(inst) {
        this.coll.remove(inst);
        return this;
    }

    getAll(sceneKey) {
        var coll = this.getCollection(sceneKey);
        return coll.find();
    }

    get(id, sceneKey) {
        var coll = this.getCollection(sceneKey);
        if (IsArray(id)) {
            var retInsts = [], inst;
            for (var i = 0, len = id.length; i < len; i++) {
                inst = coll.get(id[i]);
                if (inst) {
                    retInsts.push(inst);
                }
            }
            return retInsts;
        } else {
            return coll.get(id);
        }

    }

    static getId(inst) {
        return inst.$loki;
    }
}

export default InstDBPlugin;