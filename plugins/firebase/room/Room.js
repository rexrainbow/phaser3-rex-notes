import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import GetRef from '../utils/GetRef.js';
import CreatRoom from './CreateRoom.js';

class Room {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.rootPath = GetValue(config, 'root', '');

        this.lockAction = false;
        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
    }

    setUser(userID, userName) {
        this.userID = userID;
        this.userName = userName;
        return this;
    }


    joinRoom(roomID, leftThenJoin) {

    }

    leaveRoom() {

    }

    kickUser(userId) {

    }

    joinRandomRoom(leftThenJoin, retry) {

    }

    getUserList(roomID) {

    }
}

var methods = {
    CreateRoom: CreateRoom
}

Object.assign(
    Room.prototype,
    EventEmitterMethods,
    methods
);

export default Room;