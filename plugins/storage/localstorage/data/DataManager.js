import Extend from './Extend.js';

import { Data as PhaserData, Events as PhaserEvents, Utils as PhaserUtils } from 'phaser';
const Base = PhaserData.DataManager;
const EventEmitterClass = PhaserEvents.EventEmitter;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

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

export default DataManager;