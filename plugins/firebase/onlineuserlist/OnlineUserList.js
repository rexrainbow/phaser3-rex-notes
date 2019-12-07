import 'firebase/database';
import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../utils/object/GetValue.js';
import ItemList from '../itemlist/ItemList.js';
import GetRef from '../utils/GetRef.js';
import Join from './Join.js';
import Leave from './Leave.js';

class OnlineUserList {
    constructor(app, config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.database = app.database();
        this.setRootPath(GetValue(config, 'root', ''));

        this.setUser(GetValue(config, 'userID', ''), GetValue(config, 'userName', ''));
        this.setMaxUsers(GetValue(config, 'maxUsers', 0));
        this.userList = new ItemList({
            eventEmitter: this.getEventEmitter(),
            itemIDKey: 'joinAt',
            eventNames: {
                add: GetValue(config, 'eventNames.join', 'join'),
                remove: GetValue(config, 'eventNames.leave', 'leave'),
                update: GetValue(config, 'eventNames.update', 'update')
            }
        });

        this.userID2ItemID = {};
        this.userList
            .on(this.userList.eventNames.add, function (user) {
                this.userID2ItemID[user.userID] = user.joinAt;
            }, this)
            .on(this.userList.eventNames.remove, function (user) {
                delete this.userID2ItemID[user.userID];
            }, this)
    }

    shutdown() {
        this.destroyEventEmitter();
    }

    destroy() {
        this.shutdown();
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
        return this;
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

    setMaxUsers(maxUsers) {
        this.maxUsers = maxUsers;
        return this;
    }

    clear() {
        this.userList.clear();
        return this;
    }

    forEach(callback, scope) {
        this.userList.forEach(callback, scope);
        return this;
    }

    isFull() {
        if (this.maxUsers === 0) {
            return false;
        }
        return (this.userList.getItems().length >= this.maxUsers);
    }

    isFirstUser(userID) {
        var user = this.usersList.getItems()[0];
        return (user && (user.userID === userID));
    }

    getUser(userID) {
        if (!this.contains(userID)) {
            return null;
        }
        var itemID = this.userID2ItemID[userID];
        return this.userList.getItemFromItemID(itemID);
    }

    getUserRef(userID) {
        if (!this.contains(userID)) {
            return null;
        }
        var itemID = this.userID2ItemID[userID];
        return GetRef(this.database, this.rootPath, itemID);
    }

    contains(userID) {
        return this.userID2ItemID.hasOwnProperty(userID);
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

var methods = {
    join: Join,
    leave: Leave,
}
Object.assign(
    OnlineUserList.prototype,
    EventEmitterMethods,
    methods
);

export default OnlineUserList;