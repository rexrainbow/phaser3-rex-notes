import 'firebase/database';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import OnlineUserList from '../onlineuserlist/OnlineUserList.js';
import Methods from './Methods.js';

class Room {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.rootPath = GetValue(config, 'root', '');

        // User properties
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        // Room properties
        this.isRoomCreator = false;
        this.roomID = undefined;
        this.roomName = undefined;
        this.roomType = undefined;
        this.doorState = undefined;
        this.leftRoomFlag = false;
        this.isRemoveRoomWhenLeft = undefined;
        this.usersList = new OnlineUserList(app, {
            eventEmitter: this.getEventEmitter(),
            eventNames: {
                join: GetValue(config, 'eventNames.join', 'user.join'),
                leave: GetValue(config, 'eventNames.leave', 'user.leave'),
                update: GetValue(config, 'eventNames.update', 'userlist.update')
            }
        })
        this.usersList
            .setUser(this.userInfo);

        // Monitor
        this.monitorRefPaths = [];
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setUser(userID, userName) {
        if (typeof (userID) === 'string') {
            this.userInfo = {
                userID: userID,
                userName: userName
            }
        } else {
            this.userInfo = userID;
        }
        return this;
    }

    isInRoom(roomID) {
        return (roomID === undefined) ? (this.roomID !== undefined) : (this.roomID === roomID);
    }
}


Object.assign(
    Room.prototype,
    EventEmitterMethods,
    Methods
);

export default Room;