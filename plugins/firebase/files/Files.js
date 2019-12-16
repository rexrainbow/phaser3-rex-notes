import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import Save from './Save.js';
import Load from './Load.js';
import LoadHeaders from './LoadHeaders.js';
import Delete from './Delete.js';
import Clear from './Clear.js';
import ClearDict from '../../utils/object/Clear.js';

class Files {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.cacheHeaders = {};

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

    getFileQuery(ownerID, fileID, type) {
        var query = this.rootRef;
        query = (ownerID) ? this.rootRef.where('ownerID', '==', ownerID) : query;
        query = (fileID) ? query.where('fileID', '==', fileID) : query;
        query = (type) ? query.where('type', '==', type) : query;
        return query;
    }

    setOwner(userID) {
        var prevUserID = this.ownerInfo.userID;
        if (typeof (userID) === 'string') {
            this.ownerInfo.userID = userID;
        } else {
            this.ownerInfo = userID;
        }
        if (prevUserID !== this.ownerInfo.userID) {
            this.clearCache();
        }
        return this;
    }

    clearCache() {
        ClearDict(this.cacheHeaders);
        return this;
    }
}

var methods = {
    save: Save,
    load: Load,
    loadHeaders: LoadHeaders,
    delete: Delete,
    clear: Clear,
}

Object.assign(
    Files.prototype,
    EventEmitterMethods,
    methods
);

export default Files;