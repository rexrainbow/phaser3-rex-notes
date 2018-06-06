'use strict'

import Clone from 'rexPlugins/utils/object/Clone.js';
import IsEmpty from 'rexPlugins/utils/Object/IsEmpty.js';
import Clean from 'rexPlugins/utils/object/Clean.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;
/**
 * Create Gashapon object with configuration
 * @class
 * @classdesc Gashapon in shuffle or random mode
 */
class Gashapon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        // configuration
        if (this.cfg == undefined) {
            this.cfg = {};
        }
        if (this.items == undefined) {
            this.items = {};
        }
        if (this.remain == undefined) {
            this.remain = {};
        }
        if (this._list == undefined) {
            this._list = [];
        }
        if (this.customRnd == undefined) {
            this.customRnd = [null, null];
        }

        this.setMode(GetFastValue(o, 'mode', 0));
        this.setReload(GetFastValue(o, 'reload', true));

        // data

        this.items = Clone(GetFastValue(o, 'items', {}), this.items);
        this._list.length = 0;

        // result
        this.result = GetFastValue(o, 'result', null);

        // flags
        this._restartFlag = true; // force restart to rebuild this._list

        // custom function to return random real number between 0 and 1
        this.customRnd[0] = GetValue(o, 'rnd.fn', null);
        this.customRnd[1] = GetValue(o, 'rnd.ctx', null);

        // initialize
        if (this._restartFlag) {
            this.startGen();
        }
        var remain = GetFastValue(o, 'remain', undefined);
        if (remain) {
            this.remain = Clone(remain, this.remain);
        }

        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            // configuration
            mode: this.cfg.mode,
            reload: this.cfg.reload,

            // data
            items: Clone(this.items),
            remain: Clone(this.remain),

            // result
            result: this.result,

            // flags
            restart: true, // force restart to rebuild this._list

            // custom function to return random real number between 0 and 1
            rnd: Clone(this.customRnd)
        };
    };

    /**
     * Restart generator
     * @returns {object} this object
     */
    startGen() {
        var name;
        // clean remain items
        for (name in this.remain) {
            if (!this.items.hasOwnProperty(name)) {
                delete this.remain[name];
            }
        }
        // init remain items
        for (name in this.items) {
            var count = this.items[name];
            if (count > 0)
                this.remain[name] = count;
        }

        if (this.cfg.mode === 1) { // random mode
            this.resetItemList(this.remain);
        }
        this._restartFlag = false;

        return this;
    }


    /**
     * Set mode
     * @param {number|string} m 'shuffle'(0) or 'random'(1)
     * @returns {object} this object
     */
    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this._restartFlag = (this.cfg.mode !== m);
        this.cfg.mode = m;
        return this;
    }

    /**
     * Set reload mode
     * @param {boolean} isReload reload items when empty
     * @returns {object} this object
     */
    setReload(isReload) {
        this.cfg.reload = !!isReload;
        return this;
    }

    /**
     * Set item
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    setItem(name, count) {
        this._restartFlag = (this.items[name] !== count);
        this.items[name] = count;
        return this;
    }

    /**
     * Remove item
     * @param {string} name item name
     * @returns {object} this object
     */
    removeItem(name) {
        if (this.items.hasOwnProperty(name)) {
            delete this.items[name];
            this._restartFlag = true;
        }
        return this;
    }

    /**
     * Remove all items
     * @returns {object} this object
     */
    removeAllItems() {
        for (var name in this.items) {
            delete this.items[name];
        }
        this._restartFlag = true;
        return this;
    }

    /**
     * Return clone items
     * @returns {object} Cloned items
     */
    getItems() {
        return Clone(this.items);
    }

    /**
     * Return clone remaining items
     * @returns {object} Cloned remaining items
     */
    getRemain() {
        return Clone(this.remain);
    }

    /**
     * Return amount of an item
     * @param {string} name item name
     * @returns {number} Amount of an item
     */
    getItemCount(name) {
        return this.items[name] || 0;
    }

    /**
     * Return amount of a remaining item
     * @param {string} name remaining item name
     * @returns {number} Amount of a remaining item
     */
    getRemainCount(name) {
        return this.remain[name] || 0;
    }

    /**
     * Passes all items to the given callback
     * @param {function} callback the function to call
     * @param {object} [scope] value to use as `this` when executing callback.
     * @param {...*} [arguments] additional arguments that will be passed to the callback, after item name, and amount.
     * @returns {object} this object
     */
    eachItem(callback, scope) {
        var args = [null, undefined];

        for (var i = 2, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.items) {
            args[0] = name;
            args[1] = this.items[name];

            if (scope) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    /**
     * Passes all remaining items to the given callback
     * @param {function} callback the function to call
     * @param {object} [scope] value to use as `this` when executing callback.
     * @param {...*} [arguments] additional arguments that will be passed to the callback, after item name, and amount.
     * @returns {object} this object
     */
    eachRemain(callback, scope) {
        var args = [null, undefined];

        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.remain) {
            args[1] = name;
            args[2] = this.remain[name];
            if (scope) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    /**
     * Add item without changing remaining items
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    addItem(name, count) {
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.cfg.mode === 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remain);
        }
        return this;
    }

    /**
     * Add remaining items without max items
     * @param {string} name item name
     * @param {number} count item count
     * @returns {object} this object
     */
    putItemBack(name, count) {
        if (this.cfg.mode === 1) // random mode
            return;

        if (!this.items.hasOwnProperty(name))
            return;

        if ((this.cfg.mode === 2) && this.restartGenFlg)
            return;

        // generator had started  
        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    /**
     * Return a random item
     * @returns {string} item name
     */
    next(name) {
        var result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.cfg.mode === 0) { // shuffle mode
                this.resetItemList(this.remain);
                result = this.getRndItem(this._list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this._list);
            }

        } else { // force pick
            if (!this.remain.hasOwnProperty(name)) {
                result = null; // can not pick that result
            } else {
                if (this.cfg.mode === 0) {
                    this.addRemainItem(name, -1);
                }
                result = name;
            }
        }

        this.result = result;
        return result;
    }

    /**
     * Set custom random generator
     * @param {function} callback the function to call
     * @param {object} scope value to use as `this` when executing callback
     * @returns {object} this object
     */
    setRandomGen(callback, scope) {
        this.customRnd[0] = callback;
        this.customRnd[1] = scope;
        return this;
    }

    /**
     * Release all resources and references
     * @returns {object} this object
     */
    destroy() {
        // configuration
        this.cfg.mode = undefined;
        this.cfg.reload = undefined;

        // data
        Clean(this.items);
        Clean(this.remain);
        Clean(this._list);

        // result
        this.result = null;

        // flags
        this._restartFlag = false;

        // custom function to return random real number between 0 and 1
        this.customRnd[0] = null;
        this.customRnd[1] = null;

        return this;
    }

    /** @private */
    resetItemList(items) {
        // clean list
        this._list.length = 0;
        var name, count, totalCount = 0;
        // get total count
        for (name in items) {
            count = items[name];
            if (count > 0)
                totalCount += count;
        }
        // set percentage
        for (name in items) {
            count = items[name];
            if (count > 0) {
                this._list.push([
                    name,
                    count / totalCount
                ]);
            }
        }
        return this;
    }

    /** @private */
    addRemainItem(name, inc, maxCount) {
        if ((name == null) || (inc === 0))
            return this;

        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.remain[name] += inc;
        if ((maxCount != null) && (this.remain[name] > maxCount))
            this.remain[name] = maxCount

        if (this.remain[name] <= 0)
            delete this.remain[name];

        if ((this.cfg.mode === 0) && this.cfg.reload && IsEmpty(this.remain))
            this._restartFlag = true;

        return this;
    }

    /** @private */
    getRndValue() {
        var value;
        if (this.customRnd[0]) {
            if (this.customRnd[1]) {
                value = this.customRnd[0].call(this.customRnd[1]);
            } else {
                value = this.customRnd[0]();
            }
        } else {
            value = Math.random();
        }
        return value;
    }

    /** @private */
    getRndItem(list) {
        var value = this.getRndValue();
        var result = null,
            i, cnt = list.length,
            item
        for (i = 0; i < cnt; i++) {
            item = list[i];
            value -= item[1];
            if (value < 0) {
                result = item[0];
                break;
            }
        }
        return result;
    }

}

/** @private */
const MODE = {
    shuffle: 0,
    random: 1
};

export default Gashapon;