import ParseCSV from './ParseCSV.js';
import Clear from '../../utils/object/Clear.js';
import Quest from './Quest.js';

const RemoveItem = Phaser.Utils.Array.Remove;

class Form {
    constructor(config) {
        this.items = [];
        this.itemsMap = {};
        this._quest = undefined;
    }

    add(item, config) {
        if (typeof (item) === 'string') {
            var csvString = item;
            item = ParseCSV(csvString, config);
        }

        if (Array.isArray(item)) {
            var items = item;
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                this._add(items[i]);
            }
        } else {
            this._add(itme);
        }
        return this;
    }

    _add(item) {
        var key = item.key;
        if (this.itemsMap.hasOwnProperty(key)) {
            this.remove(key);
        }
        this.items.push(item);
        this.itemsMap[key] = item;
    }

    remove(key) {
        if (this.itemsMap.hasOwnProperty(key)) {
            RemoveItem(this.items, this.itemsMap[key]);
            delete this.itemsMap[key];
        }
        return this;
    }

    removeAll() {
        this.items.length = 0;
        Clear(this.itemsMap);
    }

    getKeys(out) {
        if (out === undefined) {
            out = [];
        }
        for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            out.push(this.items[i].key);
        }
        return out;
    }

    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    }

    startQuest(config) {
        this._quest = this.newQuest(config);
        return this;
    }

    getNextQuest() {
        return this._quest.getNext();
    }
}

export default Form;