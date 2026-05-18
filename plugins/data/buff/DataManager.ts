import methods from './Methods';
import Extend from './Extend';

import { Data as PhaserData, Events as PhaserEvents } from 'phaser';
const Base = PhaserData.DataManager;
const EventEmitterClass = PhaserEvents.EventEmitter;

class DataManager extends Base {
    destroy: any;

    constructor(parent?: any, eventEmitter?: any) {
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

        Extend(this);
    }
}

Object.assign(
    DataManager.prototype,
    methods
);

export default DataManager;