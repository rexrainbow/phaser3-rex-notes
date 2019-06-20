import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';
import ParseCSV from './ParseCSV.js';
import RemoveItem from '../../../utils/array/Remove.js';
import Clear from '../../../utils/object/Clear.js';
import QuestMethods from './QuestMethods.js';

class QuestionManager {
    constructor(config) {
        // Event emitter. Create a private event emitter for private quest task object.
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.items = [];
        this.itemsMap = {};
        this._quest = undefined;

        var questions = GetValue(config, 'questions', undefined);
        if (questions) {
            this.add(questions, config);
        }
        var questConfig = GetValue(config, 'quest', undefined);
        if (questConfig) {           
            this.startQuest(questConfig)
        }
    }

    shutdown() {
        this.destroyEventEmitter();
        if (this._quest) {
            this._quest.destroy();
            this._quest = undefined;
        }        
    }

    destroy() {
        this.shutdown();
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
        var options = item.options;
        if (options) {
            // Apply key via serial number
            var option;
            for (var i = 0, cnt = options.length; i < cnt; i++) {
                option = options[i];
                if (!option.hasOwnProperty('key')) {
                    option.key = `_${i}`;
                }
            }
        }
        if (!item.hasOwnProperty('key')) {
            // Apply key via serial numbers
            item.key = `_${this.items.length}`;
        }
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

    has(key) {
        return this.itemsMap.hasOwnProperty(key);
    }

    get(key) {
        return this.itemsMap[key];
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

    getOption(question, optionKey) {
        if (typeof (question) === 'string') {
            question = this.get(question);
        }
        if (!question) {
            return null;
        }
        var options = question.options;
        if (options) {
            var option;
            for (var i = 0, cnt = options.length; i < cnt; i++) {
                option = options[i];
                if (option.key === optionKey) {
                    return option;
                }
            }
        }
        return null;
    }
}

Object.assign(
    QuestionManager.prototype,
    EventEmitterMethods,
    QuestMethods
);

export default QuestionManager;