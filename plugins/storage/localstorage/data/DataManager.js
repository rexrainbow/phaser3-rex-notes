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

        var useDefaultEventEmitter = (eventEmitter === undefined);
        if (useDefaultEventEmitter) {
            eventEmitter = new EventEmitterKlass();
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