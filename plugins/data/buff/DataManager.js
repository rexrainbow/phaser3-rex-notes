import methods from './Methods.js';
import Extend from './Extend.js';

const Base = Phaser.Data.DataManager;
const EventEmitterKlass = Phaser.Events.EventEmitter;

class DataManager extends Base {
    constructor(parent, eventEmitter) {
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitterKlass();
        }
        super(parent, eventEmitter);

        Extend(this);
    }
}

Object.assign(
    DataManager.prototype,
    methods
);

export default DataManager;