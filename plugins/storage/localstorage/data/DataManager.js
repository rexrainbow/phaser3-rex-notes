import Extend from './Extend.js';

const Base = Phaser.Data.DataManager;
const EventEmitterKlass = Phaser.Events.EventEmitter;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class DataManager extends Base {
    constructor(parent, eventEmitter, config) {
        if (IsPlainObject(eventEmitter)) {
            config = eventEmitter;
            eventEmitter = undefined;
        }
        if (eventEmitter === undefined) {
            eventEmitter = new EventEmitterKlass();
        }
        super(parent, eventEmitter);

        Extend(this, config);
    }
}

export default DataManager;