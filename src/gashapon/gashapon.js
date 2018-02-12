'use strict'

import GetFastValue from './../utils/object/GetFastValue.js';
import Clone from './../utils/object/Clone.js';
import IsEmpty from './../utils/Object/IsEmpty.js';

/**
 * @classdesc Gashapon in shuffle or random mode
 */
const MODE = {
    shuffle: 0,
    random: 1
};
class Gashapon {
    constructor(config) {
        this.cfg = {
            mode: null,
            reload: null
        }
        this.resetFromJSON(config);
    }

    toJSON() {
        return {
            // configuration
            mode: this.cfg.mode,
            reload: this.cfg.reload,

            // data
            items: this.items,
            list: this.list,
            remain: this.remain,

            // result
            result: this.result,
            preResult: this.preResult,

            // flags
            restart: this._restartFlag
        };
    };

    resetFromJSON(o) {
        // configuration
        this.setMode(GetFastValue(o, 'mode', 'shuffle'));
        this.setReload(GetFastValue(o, 'reload', true));

        // data
        this.items = GetFastValue(o, 'items', {});
        this.list = GetFastValue(o, 'list', []);
        this.remain = GetFastValue(o, 'remain', {});

        // result
        this.result = GetFastValue(o, 'result', null);
        this.preResult = GetFastValue(o, 'preResult', null);

        // flags
        this._restartFlag = GetFastValue(o, 'restart', true);

        // custom function to return random real number between 0 and 1
        this.customRnd = {
            fn: null,
            ctx: null
        };

        // initialize
        if (this._restartFlag) {
            this.startGen();
        }

        return this;
    }

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


    // configuration
    setMode(m) {
        m = MODE[m];
        this._restartFlag = (this.cfg.mode !== m);
        this.cfg.mode = m;
        return this;
    }
    setReload(isReload) {
        this.cfg.reload = !!isReload;
        return this;
    }

    // data
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

    addItem(name, count) {
        if (name == "")
            return;
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.cfg.mode == 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remain);
        }
        return this;
    }

    putItemBack(name, count) {
        if (this.cfg.mode == 1) // random mode
            return;

        if (name == "")
            return;

        if (!this.items.hasOwnProperty(name))
            return;

        if ((this.cfg.mode == 2) && this.restartGenFlg)
            return;

        // generator had started  
        if (!this.remain.hasOwnProperty(name))
            this.remain[name] = 0;

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    // get next random item
    next(name) {
        var result;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.cfg.mode == 0) { // shuffle mode
                this.resetItemList(this.remain);
                result = this.getRndItem(this.list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this.list);
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

        this.preResult = this.result;
        this.result = result;

        return result;
    }

    // custom random generator
    setRandomGen(fn, context) {
        this.customRnd.fn = fn;
        this.customRnd.context = context;
        return this;
    }

    // internal
    resetItemList(items) {
        // clean list
        this.list.length = 0;
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
                this.list.push([
                    name,
                    count / totalCount
                ]);
            }
        }
        return this;
    }

    addRemainItem(name, inc, maxCount) {
        if ((name == null) || (inc == 0))
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

    getRndValue() {
        var value;
        if (this.customRnd.fn) {
            value = this.customRnd.fn.call(this.customRnd.ctx);
        } else {
            value = Math.random();
        }
        return value;
    };

    getRndItem(list) {
        var value = this.getRndValue();
        var result,
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
    };

}

export default Gashapon;