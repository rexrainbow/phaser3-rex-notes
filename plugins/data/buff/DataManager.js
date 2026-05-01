import methods from './Methods.js';
import Extend from './Extend.js';

import { Data as PhaserData, Events as PhaserEvents } from 'phaser';
const Base = PhaserData.DataManager;
const EventEmitterClass = PhaserEvents.EventEmitter;

class DataManager extends Base {
    constructor(parent, eventEmitter) {
        var useDefaultEventEmitter = (eventEmitter === undefined);
        if (useDefaultEventEmitter) {
            eventEmitter = new EventEmitterClass();
        }

        super(parent, eventEmitter);

        if (useDefaultEventEmitter) {
            var parentEventEmitter = (parent.events) ? parent.events : parent;
            if (parentEventEmitter) {
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