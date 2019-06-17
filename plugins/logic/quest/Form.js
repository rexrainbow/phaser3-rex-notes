import ParseCSV from './ParseCSV.js';
import Clear from '../../utils/object/Clear.js';
import Quest from './Quest.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const Shuffle = Phaser.Utils.Array.Shuffle;

class Form {
    constructor(config) {
        this.items = [];
        this.itemsMap = {};
        this.quest = undefined;
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
        var name = item.name;
        if (this.itemsMap.hasOwnProperty(name)) {
            this.remove(name);
        }
        this.items.push(item);
        this.itemsMap[name] = item;
    }

    remove(name) {
        if (this.itemsMap.hasOwnProperty(name)) {
            RemoveItem(this.items, this.itemsMap[name]);
            delete this.itemsMap[name];
        }
        return this;
    }

    removeAll() {
        this.items.length = 0;
        Clear(this.itemsMap);
    }

    shuffle() {
        Shuffle(this.items);
        return this;
    }

    newQuest(config) {
        var quest = new Quest(this, config);
        return quest;
    }

    startQuest(config) {
        this.quest = this.newQuest(config);
        return this;
    }
}

export default Form;