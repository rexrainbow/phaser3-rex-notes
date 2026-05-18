import GetValue from '../../../utils/object/GetValue';
import IsPlainObject from '../../../utils/object/IsPlainObject';
import Save from './Save';
import Load from './Load';
import LoadHeaders from './LoadHeaders';
import Delete from './Delete';
import Clear from './Clear';
import ClearDict from '../../../utils/object/Clear';

class Files {
    cacheHeaders: any;
    database: any;
    rootPath: any;
    rootRef: any;
    userInfo: any;

    constructor(config?: any) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.cacheHeaders = {};

        // Owner
        this.userInfo = { userID: '' };
        this.setOwner(GetValue(config, 'userID', ''));

    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    setRootPath(rootPath?: any) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setOwner(userID?: any) {
        var prevUserID = this.userID;
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
        }
        if (prevUserID !== this.userID) {
            this.clearCache();
        }
        return this;
    }

    clearCache() {
        ClearDict(this.cacheHeaders);
        return this;
    }

    getFileQuery(userID?: any, fileID?: any, type?: any) {
        var query = this.rootRef;
        query = (userID) ? query.where('userID', '==', userID) : query;
        query = (fileID) ? query.where('fileID', '==', fileID) : query;
        query = (type) ? query.where('type', '==', type) : query;
        return query;
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
    methods
);

export default Files;