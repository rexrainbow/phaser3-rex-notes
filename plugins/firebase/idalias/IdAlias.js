import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import Add from './Add.js';
import GetId from './GetId.js';
import GetAlias from './GetAlias.js';

class IdAlias {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.firestore();
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
        this.rootRef = this.database.collection(rootPath);
        return this;
    }
}

var methods = {
    add: Add,
    getId: GetId,
    getAlias: GetAlias
}

Object.assign(
    IdAlias.prototype,
    EventEmitterMethods,
    methods
);

export default IdAlias;