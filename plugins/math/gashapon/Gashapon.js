'use strict'

import Clone from 'rexPlugins/utils/object/Clone.js';
import IsEmpty from 'rexPlugins/utils/Object/IsEmpty.js';
import Clean from 'rexPlugins/utils/object/Clean.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;

class Gashapon {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
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

    toJSON() {
        return {
            // configuration
            mode: this.mode,
            reload: this.reload,

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

    startGen() {
        var name;
        // clear remain items
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

        if (this.mode === 1) { // random mode
            this.resetItemList(this.remain);
        }
        this._restartFlag = false;

        return this;
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this._restartFlag = (this.mode !== m);
        this.mode = m;
        return this;
    }

    setReload(isReload) {
        this.reload = !!isReload;
        return this;
    }

    setItem(name, count) {
        this._restartFlag = (this.items[name] !== count);
        this.items[name] = count;
        return this;
    }

    removeItem(name) {
        if (this.items.hasOwnProperty(name)) {
            delete this.items[name];
            this._restartFlag = true;
        }
        return this;
    }

    removeAllItems() {
        for (var name in this.items) {
            delete this.items[name];
        }
        this._restartFlag = true;
        return this;
    }

    getItems() {
        return Clone(this.items);
    }

    getRemain() {
        return Clone(this.remain);
    }

    getItemCount(name) {
        return this.items[name] || 0;
    }

    getRemainCount(name) {
        return this.remain[name] || 0;
    }

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

    addItem(name, count) {
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.mode === 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remain);
        }
        return this;
    }

    putItemBack(name, count) {
        if (this.mode === 1) // random mode
            return;

        if (!this.items.hasOwnProperty(name))
            return;

        if ((this.mode === 2) && this.restartGenFlg)
            return;

        // generator had started  
        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    next(name) {
        var result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.mode === 0) { // shuffle mode
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
                if (this.mode === 0) {
                    this.addRemainItem(name, -1);
                }
                result = name;
            }
        }

        this.result = result;
        return result;
    }

    setRandomGen(callback, scope) {
        this.customRnd[0] = callback;
        this.customRnd[1] = scope;
        return this;
    }

    destroy() {
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
        // clear list
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

        if ((this.mode === 0) && this.reload && IsEmpty(this.remain))
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

const MODE = {
    shuffle: 0,
    random: 1
};

export default Gashapon;