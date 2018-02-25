'use strict'

import CursorKeysManager from './../utils/input/CursorKeysManager.js';
import GetEventEmmiter from './../utils/GetEventEmmiter.js';

class DragCursorPlugin extends CursorKeysManager {
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
        //  Should we reset the events?
    }

    destroy() {
        Gashapon.destroy.call(this);

        this.scene = undefined;
        this.systems = undefined;
    }
}

export default GashaponPlugin;