'use strict'

import Gashapon from './Gashapon.js';
import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';

class GashaponPlugin extends Gashapon {
    constructor(parent, config) {
        super(config);
        
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

    shutdown() {
        this.gameobject = undefined;
        this.scene = undefined;         
        Gashapon.destroy.apply(this);
    }

    destroy() {
        this.shutdown();
    }
}

export default GashaponPlugin;