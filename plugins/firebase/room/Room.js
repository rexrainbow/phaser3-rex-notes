import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';
import OnlineUserList from '../onlineuserlist/OnlineUserList.js';
import Methods from './Methods.js';

class Room {
    constructor(config) {
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
        this.userList = new OnlineUserList({
            eventEmitter: this.getEventEmitter(),
            eventNames: {
                join: GetValue(config, 'eventNames.join', 'user.join'), // Any user join
                leave: GetValue(config, 'eventNames.leave', 'user.leave'), // Any user leave
                update: GetValue(config, 'eventNames.update', 'userlist.update'), // Update user list
                init: GetValue(config, 'eventNames.init', 'userlist.init')
            }
        });
        this.userList
            .on('user.leave', function (user) {
                if (user.userID === this.userInfo.userID) {
                    this.onLeftRoom(); // Current user is left or kicked
                }
            }, this)
            .setUser(this.userInfo);

        // Monitor
        this.monitorRefPaths = [];
    }

    shutdown() {
        this
            .destroyEventEmitter()
            .leaveRoom();
    }

    destroy() {
        this.shutdown();
    }

    setUser(userID, userName) {
        if (IsPlainObject(userID)) {
            this.userInfo = userID;
        } else {
            this.userInfo.userID = userID;
            this.userInfo.userName = userName;
        }
        return this;
    }

    isInRoom(roomID) {
        return (roomID === undefined) ? (this.roomID !== undefined) : (this.roomID === roomID);
    }

    get maxUsers() {
        return this.userList.maxUsers;
    }
}


Object.assign(
    Room.prototype,
    EventEmitterMethods,
    Methods
);

export default Room;