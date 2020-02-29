import ContainMethods from './ContainMethods.js';
import ArrayMethods from './ArrayMethods.js';
import SetMethods from './SetMethods.js';
import Clone from '../../utils/object/Clone.js';

class UniqueItemList {
    constructor(items) {
        this.items = [];
        if (items) {
            this.addMultiple(items);
        }
    }

    getItems() {
        return this.items;
    }

    cloneItems(out) {
        return Clone(this.items, out);
    }

    newList() {
        return new UniqueItemList();
    }

    get length() {
        return this.items.length;
    }
}

Object.assign(
    UniqueItemList.prototype,
    ContainMethods,
    ArrayMethods,
    SetMethods
)

export default UniqueItemList;