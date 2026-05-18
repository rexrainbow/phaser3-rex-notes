import IsPlainObject from '../../utils/object/IsPlainObject';
import GetValue from '../../utils/object/GetValue';
import DestroyCallbackMethods from './DestroyCallbackMethods';
import ContainMethods from './ContainMethods';
import ArrayMethods from './ArrayMethods';
import SetMethods from './SetMethods';
import Clone from '../../utils/object/Clone';
import ArrayCopy from '../../utils/array/Copy';

class UniqueItemList {
    items: any;

    addMultiple: any;
    autoCleanupEnable: any;
    clear: any;
    setAutoCleanupEnable: any;

    constructor(items?: any, config?: any) {
        if (IsPlainObject(items)) {
            config = items;
            items = GetValue(config, 'items', undefined);
        }

        this.items = [];
        this.setAutoCleanupEnable(GetValue(config, 'autoCleanup', true));
        if (items?: any) {
            this.addMultiple(items);
        }
    }

    destroy(destroyItems?: any) {
        this.clear(destroyItems);
        this.items = undefined;
    }

    getItems() {
        return this.items;
    }

    cloneItems(out?: any) {
        return Clone(this.items, out);
    }

    isList(item?: any) {
        return (item instanceof UniqueItemList);
    }

    newList(items?: any) {
        var config = {
            autoCleanup: this.autoCleanupEnable
        }
        return new UniqueItemList(items, config);
    }

    get length() {
        return this.items.length;
    }

    call(callback?: any, scope?: any) {
        if (this.items.length === 0) {
            return this;
        }

        if (typeof (callback) === 'string') {
            var fnName = callback;
            ArrayCopy(ARGS, arguments, 1);
            var item;
            for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                item = this.items[i];
                item[fnName].apply(item, ARGS);
            }
            ARGS.length = 0;

        } else {
            for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                if (scope?: any) {
                    callback.call(scope, this.items[i], i);
                } else {
                    callback(this.items[i], i);
                }
            }
        }
        return this;
    }
}

var ARGS = []; // reuse this array

Object.assign(
    UniqueItemList.prototype,
    DestroyCallbackMethods,
    ContainMethods,
    ArrayMethods,
    SetMethods
)

export default UniqueItemList;