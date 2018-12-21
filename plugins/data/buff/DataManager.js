import BuffMethods from './Buff.js';
import Extend from './Extend';

const Base = Phaser.Data.DataManager;
const EventEmitterKlass = Phaser.Events.EventEmitter;

class DataManager extends Base {
    constructor(parent, eventEmitter, config) {
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitterKlass();
        }
        super(parent, eventEmitter);

        Extend(this, config);
    }
}

Object.assign(
    DataManager.prototype,
    BuffMethods
);

export default DataManager;