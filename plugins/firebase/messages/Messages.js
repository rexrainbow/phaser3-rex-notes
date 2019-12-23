import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import Send from './Send.js';

class Messages {
    constructor(config) {
        this.database = firebase.firestore();
        this.setRootPath(GetValue(config, 'root', ''));

        this.senderInfo = { userID: '', userName: undefined };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        this.setReceiver(GetValue(config, 'receiverID', undefined));
    }

    shutdown() {
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setSender(userID, userName) {
        if (IsPlainObject(userID)) {
            this.senderInfo = userID;
        } else {
            this.senderInfo.userID = userID;
            this.senderInfo.userName = userName;
        }
        return this;
    }

    setReceiver(receiverID) {
        this.receiverID = receiverID;
        return this;
    }

    getReceiverQuery(receiverID, senderID) {
        if (receiverID === undefined) {
            receiverID = this.receiverID;
        }
        var query = this.rootRef;
        query = (receiverID !== undefined) ? query.where('receiverID', '==', receiverID) : query;
        query = (senderID !== undefined) ? query.where('senderID', '==', senderID) : query;
        return query;
    }
}

var methods = {
    send: Send
}

Object.assign(
    Messages.prototype,
    methods
);

export default Messages;