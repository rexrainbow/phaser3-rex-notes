import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import ItemList from '../itemlist/ItemList.js';
import GetRef from '../utils/GetRef.js';
import GetFilterString from './GetFilterString.js';

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
            itemIDKey: 'roomID',
            eventNames: {
                add: GetValue(config, 'eventNames.add', 'add'),
                remove: GetValue(config, 'eventNames.remove', 'remove'),
                update: GetValue(config, 'eventNames.update', 'update')
            }
        })

    }

    forEach(callback, scope) {
        this.roomList.forEach(callback, scope);
        return this;
    }

    getRooms() {
        return this.roomList.getItems();
    }

    startUpdate(roomType) {
        var query = GetRef(this.database, this.rootPath);
        query = query.orderByChild('filter');
        if (roomType === undefined) {
            query = query.startAt('open').endAt('open~');
        } else {
            query = query.equalTo(GetFilterString('open', roomType));
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