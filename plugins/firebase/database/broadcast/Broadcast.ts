import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods';
import GetValue from '../../../utils/object/GetValue';
import IsPlainObject from '../../../utils/object/IsPlainObject';
import Send from './Send';
import ReceiveMethods from './ReceiveMethods';
import History from './History';

class Broadcast {
    database: any;
    eventNameMap: any;
    history: any;
    isReceiving: any;
    receiverID: any;
    receiverRef: any;
    rootPath: any;
    sendToRef: any;
    setEventEmitter: any;
    skipFirst: any;
    stamp: any;
    userInfo: any;

    constructor(config?: any) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames);

        this.database = firebase.database();
        this.setRootPath(GetValue(config, 'root', ''));

        // Sender
        this.skipFirst = true;
        this.stamp = false;
        this.userInfo = { userID: '', userName: undefined };
        this.setSender(GetValue(config, 'senderID', ''), GetValue(config, 'senderName', ''));
        this.setReceiver(GetValue(config, 'receiverID', ''));

        // Receiver
        this.isReceiving = false;

        // History messages
        var historyMaxLength = GetValue(config, 'history', 0);
        if (historyMaxLength === true) {
            historyMaxLength = -1;
        } else if (historyMaxLength === false) {
            historyMaxLength = 0;
        }
        this.history = new History({
            maxLength: historyMaxLength
        });

    }

    shutdown() {
        this
            .stopReceiving()
            .destroyEventEmitter();
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

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setRootPath(rootPath?: any) {
        this.rootPath = rootPath;
        this.sendToRef = undefined;
        this.receiverRef = undefined;
        return this;
    }

    setSender(userID?: any, userName?: any) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    setReceiver(receiverID?: any) {
        this.receiverID = receiverID;
        return this;
    }

    changeUserName(userID?: any, userName?: any) {
        if (userID === this.userID) {
            this.userName = userName;
        }
        this.history.changeUserName(userID, userName);
        return this;
    }

    getHistory() {
        return this.history.records;
    }

    clearHistory() {
        this.history.clear();
        return this;
    }
}

var methods = {
    send: Send
}
Object.assign(
    Broadcast.prototype,
    EventEmitterMethods,
    ReceiveMethods,
    methods
);

const DefaultEventNames = {
    receive: 'receive'
}


export default Broadcast;