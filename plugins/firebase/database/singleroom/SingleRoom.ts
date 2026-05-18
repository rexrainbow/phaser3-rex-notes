import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods';
import GetValue from '../../../utils/object/GetValue';
import CreateUserList from './utils/CreateUserList';
import CreateBroadcast from './utils/CreateBroadcast';
import CreateTables from './utils/CreateTables';
import IsPlainObject from '../../../utils/object/IsPlainObject';
import Methods from './Methods';

class SingleRoom {
    broadcast: any;
    database: any;
    leftRoomFlag: any;
    rootPath: any;
    setEventEmitter: any;
    tables: any;
    userInfo: any;
    userList: any;

    constructor(config?: any) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = firebase.database()
        this.rootPath = GetValue(config, 'root', '');

        // User properties
        this.userInfo = { userID: '', userName: '' };
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        // Room properties
        this.leftRoomFlag = false;
        // User list
        this.userList = CreateUserList.call(this, config);
        // Broadcast
        this.broadcast = CreateBroadcast.call(this, config);
        // Item tables
        this.tables = CreateTables.call(this, config);
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

    get userName() {
        return this.userInfo.userName;
    }

    set userName(value) {
        this.userInfo.userName = value;
    }

    setUser(userID?: any, userName?: any) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userID = userID;
            this.userName = userName;
        }
        return this;
    }

    isInRoom() {
        return this.userList.isInList;
    }

    isFull() {
        return this.userList.isFull();
    }

    isFirstUser(userID?: any) {
        return this.userList.isFirstUser(userID);
    }

    getUsers() {
        return this.userList.getUsers();
    }

    get maxUsers() {
        return this.userList.maxUsers;
    }

    getTable(key?: any) {
        return this.tables[key];
    }
}

Object.assign(
    SingleRoom.prototype,
    EventEmitterMethods,
    Methods
);
export default SingleRoom;