import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods';
import GetValue from '../../../utils/object/GetValue';
import CreateUserList from './utils/CreateUserList';
import CreateRoomList from './utils/CreateRoomList';
import CreateBroadcast from './utils/CreateBroadcast';
import CreateTables from './utils/CreateTables';
import IsPlainObject from '../../../utils/object/IsPlainObject';
import Methods from './Methods';

class Room {
    roomID: any;
    roomName: any;

    broadcast: any;
    database: any;
    doorState: any;
    isRemoveRoomWhenLeft: any;
    isRoomCreator: any;
    leftRoomFlag: any;
    roomList: any;
    roomType: any;
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
        this.isRoomCreator = false;
        this.roomID = undefined;
        this.roomName = undefined;
        this.roomType = undefined;
        this.doorState = undefined;
        this.leftRoomFlag = false;
        this.isRemoveRoomWhenLeft = undefined;
        // User list
        this.userList = CreateUserList.call(this, config);
        // Room list
        this.roomList = CreateRoomList.call(this, config);
        // Broadcast
        this.broadcast = CreateBroadcast.call(this, config);
        // Item tables
        this.tables = CreateTables.call(this, config);
    }

    shutdown() {
        var self = this;
        this
            .destroyEventEmitter()
            .leaveRoom()
            .then(function() {
                self.userList.destroy();
                self.userList = undefined;

                self.roomList.destroy();
                self.roomList = undefined;

                self.broadcast.destroy();
                self.broadcast = undefined;
            })
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

    getRoomInfo(roomID?: any, roomName?: any) {
        if (roomID === undefined) {
            roomID = this.roomID;
        }
        if (roomName === undefined) {
            roomName = this.roomName;
        }
        return { roomID: roomID, roomName: roomName };
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

    isInRoom(roomID?: any) {
        return (roomID === undefined) ? (this.roomID !== undefined) : (this.roomID === roomID);
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
    Room.prototype,
    EventEmitterMethods,
    Methods
);

export default Room;