import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import ItemList from '../itemlist/ItemList.js';
import GetRef from '../utils/GetRef.js';

class RoomList {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.rootPath = GetValue(config, 'root', '');

        this.roomList = new ItemList({
            eventEmitter: this.getEventEmitter(),
            itemIDKey: 'roomID'
        })

    }

    forEach(callback, scope) {
        this.roomList.forEach(callback, scope);
        return this;
    }

    getRooms() {
        return this.roomList.getItems();
    }

    startUpdate() {
        var query = GetRef(this.database, this.rootPath);
        if (this.maxUsers > 0) {
            query = query.limitToFirst(this.maxUsers);
        }
        this.userList.startUpdate(query);
        return this;
    }

    stopUpdate() {
        this.userList.stopUpdate();
        return this;
    }
}

Object.assign(
    RoomList.prototype,
    EventEmitterMethods,
    methods
);

export default RoomList;