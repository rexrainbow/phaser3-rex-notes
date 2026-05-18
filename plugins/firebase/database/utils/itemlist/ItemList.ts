import EventEmitterMethods from '../../../../utils/eventemitter/EventEmitterMethods';
import GetValue from '../../../../utils/object/GetValue';
import ItemMethods from './ItemMethods';
import UpdateOnce from './updaters/UpdateOnce';
import UpdateChild from './updaters/UpdateChild';
import UpdateAll from './updaters/UpdateAll';

class ItemList {
    mode: any;
    query: any;

    eventNameMap: any;
    getItemCallback: any;
    getItemCallbackScope: any;
    isUpdating: any;
    itemID2Index: any;
    items: any;
    keyItemID: any;
    setEventEmitter: any;
    updater: any;

    constructor(config?: any) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);
        this.eventNameMap = GetValue(config, 'eventNames', DefaultEventNames);

        this.isUpdating = false;
        this.items = [];
        this.itemID2Index = {};
        this.setItemIDKey(GetValue(config, 'itemIDKey', '__itemID__'));
        this.setMode(GetValue(config, 'mode', 1));
        this.setGetitemCallback(GetValue(config, 'getItemCallback', DefaultGetItemCallback), GetValue(config, 'getItemCallbackScope', this));
        this.setQuery(GetValue(config, 'query', undefined));
    }

    shutdown() {
        this
            .stopUpdate()
            .clear();
    }

    destroy() {
        this.shutdown();
    }

    setItemIDKey(key?: any) {
        this.keyItemID = key;
        return this;
    }

    setMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = MODE[mode];
        }

        this.mode = mode;
        this.updater = Updaters[mode];
        return this;
    }

    setGetitemCallback(callback?: any, scope?: any) {
        this.getItemCallback = callback;
        this.getItemCallbackScope = scope;
        return this;
    }

    setQuery(query?: any) {
        this.query = query;
        return this;
    }

    startUpdate(query?: any) {
        if (query?: any) {
            this.setQuery(query);
        } else if (this.query) {
            query = this.query;
        } else { // !query && !this.query
            return this;
        }

        this
            .stopUpdate()
            .clear();

        this.isUpdating = true;
        this.updater.start.call(this, query);
        return this;
    }

    stopUpdate() {
        if ((!this.query) || (!this.isUpdating)) {
            return this;
        }

        this.isUpdating = false;
        this.updater.stop.call(this);
        return this;
    }
}

var DefaultGetItemCallback = function(snapshot?: any) {
    var item = snapshot.val();
    item[this.keyItemID] = snapshot.key;
    return item;
}

Object.assign(
    ItemList.prototype,
    EventEmitterMethods,
    ItemMethods
);

const DefaultEventNames = {
    update: 'update',
    add: 'add',
    remove: 'remove',
    change: 'change'
}

const Updaters = {
    0: UpdateOnce,
    1: UpdateChild,
    2: UpdateAll
};

const MODE = {
    once: 0,
    child: 1,
    all: 2
}

export default ItemList;