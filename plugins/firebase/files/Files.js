import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import Save from './Save.js';
import Load from './Load.js';
import LoadHeaders from './LoadHeaders.js';

class Files {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        // Owner
        this.ownerInfo = { userID: '' };
        this.setOwner(GetValue(config, 'ownerID', ''));
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

    getFileQuery(ownerID, fileName, type) {
        if (ownerID === undefined) {
            ownerID = this.ownerInfo.userID;
        }

        var query = (ownerID) ? this.rootRef.where('ownerID', '==', ownerID) : this.rootRef;
        if (fileName !== undefined) {
            query = query.where('fileName', '==', fileName);
        }
        if (type !== undefined) {
            query = query.where('type', '==', type);
        }
        return query;
    }

    setOwner(userID) {
        if (typeof (userID) === 'string') {
            this.ownerInfo.userID = userID;
        } else {
            this.ownerInfo = userID;
        }
        return this;
    }
}

var methods = {
    save: Save,
    load: Load,
    loadHeaders: LoadHeaders
}

Object.assign(
    Files.prototype,
    EventEmitterMethods,
    methods
);

export default Files;