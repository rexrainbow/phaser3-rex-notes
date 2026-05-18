import Clone from '../../utils/object/Clone';
import IsEmpty from '../../utils/object/IsEmpty';
import Clear from '../../utils/object/Clear';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Gashapon {
    _list: any;
    _restartFlag: any;
    addShadowPattern: any;
    restartGenFlg: any;

    constructor(config?: any) {
        this.resetFromJSON(config);
    }

    destroy() {
        this.items = undefined;
        this.remainder = undefined;
        this._list = undefined;
    }

    resetFromJSON(o?: any) {
        if (this.items == undefined) {
            this.items = {};
        }
        if (this.remainder == undefined) {
            this.remainder = {};
        }
        if (this._list == undefined) {
            this._list = [];
        }

        this.setMode(GetValue(o, 'mode', 0));
        this.setReload(GetValue(o, 'reload', true));
        this.setRND(GetValue(o, 'rnd', undefined));

        // data

        this.items = Clone(GetValue(o, 'items', {}), this.items);
        this._list.length = 0;

        // result
        this.result = GetValue(o, 'result', null);

        // flags
        this._restartFlag = true; // force restart to rebuild this._list

        // initialize
        if (this._restartFlag) {
            this.startGen();
        }
        var remainder = GetValue(o, 'remainder', undefined);
        if (remainder?: any) {
            this.remainder = Clone(remainder, this.remainder);
        }

        return this;
    }

    toJSON() {
        return {
            // configuration
            mode: this.mode,
            reload: this.reload,
            rnd: this.rnd,

            // data
            items: Clone(this.items),
            remainder: Clone(this.remainder),

            // result
            result: this.result,

            // flags
            restart: true // force restart to rebuild this._list
        };
    };

    startGen() {
        var name;
        // clear remainder items
        for (name in this.remainder) {
            if (!this.items.hasOwnProperty(name)) {
                delete this.remainder[name];
            }
        }
        // init remainder items
        for (name in this.items) {
            var count = this.items[name];
            if (count > 0) {
                this.remainder[name] = count;
            }
        }

        if (this.mode === 1) { // random mode
            this.resetItemList(this.remainder);
        }
        this._restartFlag = false;

        return this;
    }

    setMode(m?: any) {
        if (typeof (m) === 'string') {
            m = MODE[m];
        }
        this._restartFlag = (this.mode !== m);
        this.mode = m;
        return this;
    }

    setReload(isReload?: any) {
        this.reload = !!isReload;
        return this;
    }

    setRND(rnd?: any) {
        this.rnd = rnd;
        return this;
    }

    setItem(name?: any, count?: any) {
        this._restartFlag = (this.items[name] !== count);
        this.items[name] = count;
        return this;
    }

    removeItem(name?: any) {
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
        return Clone(this.remainder);
    }

    getItemCount(name?: any) {
        return this.items[name] || 0;
    }

    getRemainCount(name?: any) {
        return this.remainder[name] || 0;
    }

    forEachItem(callback?: any, scope?: any) {
        var args = [null, undefined];

        for (var i = 2, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.items) {
            args[0] = name;
            args[1] = this.items[name];

            if (scope?: any) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    forEachRemain(callback?: any, scope?: any) {
        var args = [null, undefined];

        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (var name in this.remainder) {
            args[1] = name;
            args[2] = this.remainder[name];
            if (scope?: any) {
                callback.apply(scope, args);
            } else {
                callback(args);
            }

        }

        return this;
    }

    addItem(name?: any, count?: any) {
        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag)
            return;

        if (this.mode === 0) { // shuffle mode
            this.addRemainItem(name, count);
        } else { // random mode
            this.resetItemList(this.remainder);
        }
        return this;
    }

    putItemBack(name?: any, count?: any) {
        if (this.mode === 1) // random mode
            return;

        if (!this.items.hasOwnProperty(name)) {
            return;
        }

        if ((this.mode === 2) && this.restartGenFlg) {
            return;
        }

        // generator had started  
        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.addShadowPattern(name, count, this.items[name]);
        return this;
    };

    next(name?: any) {
        var result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name == null) {
            if (this.mode === 0) { // shuffle mode
                this.resetItemList(this.remainder);
                result = this.getRndItem(this._list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this._list);
            }

        } else { // force pick
            if (!this.remainder.hasOwnProperty(name)) {
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

    /** @private */
    resetItemList(items?: any) {
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
    addRemainItem(name?: any, inc?: any, maxCount?: any) {
        if ((name == null) || (inc === 0)) {
            return this;
        }

        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.remainder[name] += inc;
        if ((maxCount != null) && (this.remainder[name] > maxCount)) {
            this.remainder[name] = maxCount
        }

        if (this.remainder[name] <= 0) {
            delete this.remainder[name];
        }

        if ((this.mode === 0) && this.reload && IsEmpty(this.remainder)) {
            this._restartFlag = true;
        }

        return this;
    }

    /** @private */
    getRndItem(list?: any) {
        var value = (this.rnd) ? this.rnd.frac() : Math.random();
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