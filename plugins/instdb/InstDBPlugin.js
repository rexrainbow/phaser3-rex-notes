'use strict'

import GetEventEmmiter from './../utils/system/GetEventEmmiter.js';

class InstDBPlugin {
    constructor(parent, config) {
        
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
    }

    destroy() {
    }
}

export default InstDBPlugin;