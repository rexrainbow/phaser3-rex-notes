import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import SetValue from './SetValue.js';

class UserData3d {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNames = Merge(GetValue(config, 'eventNames', {}), DefaultEventNames);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
    }

    getRootRef() {
        return this.database.ref(this.rootPath)
    }

    getRef(userID, itemID, key) {
        var ref = this.getRootRef();
        ref = (userID) ? ref.child(userID) : ref;
        ref = (itemID) ? ref.child(itemID) : ref;
        ref = (key) ? ref.child(key) : ref;
        return ref;
    }
}

var methods = {
    setValue: SetValue
}
Object.assign(
    UserData3d.prototype,
    EventEmitterMethods,
    methods
);

export default UserData3d