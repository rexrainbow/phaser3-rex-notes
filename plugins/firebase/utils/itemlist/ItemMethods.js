import Clear from '../../../utils/object/Clear.js';
import SpliceOne from '../../../utils/array/SpliceOne.js';

var Methods = {
    clear() {
        this.items.length = 0;
        Clear(this.itemID2Index);
        return this;
    },

    getItems() {
        return this.items;
    },

    hasItem(itemID) {
        return this.itemID2Index.hasOwnProperty(itemID);
    },

    getItemIndexFromItemID(itemID) {
        if (itemID == null) {
            return null;
        }
        return this.itemID2Index[itemID];
    },

    getItemFromItemID(itemID) {
        if (itemID == null) {
            return null;
        }
        var index = this.getItemIndexFromItemID(itemID);
        if (index == null) {
            return null;
        }

        return this.items[index];
    },

    forEach(callback, scope) {
        this.items.forEach(callback, scope);
        return this;
    },

    addItem(snapshot, prevName, pushMode) {
        var item;
        var callback = this.getItemCallback;
        var scope = this.getItemCallbackScope;
        if (scope) {
            item = callback.call(scope, snapshot);
        } else {
            item = callback(snapshot);
        }

        if (pushMode) {
            this.items.push(item);
            return item;
        }

        if (prevName == null) {
            this.items.unshift(item);
        } else {
            var i = this.itemID2Index[prevName];
            if (i === this.items.length - 1) {
                this.items.push(item);
            } else {
                this.items.splice(i + 1, 0, item);
            }
        }
        return item;
    },

    removeItem(snapshot) {
        var index = this.itemID2Index[snapshot.key];
        var item = SpliceOne(this.items, index);
        return item
    },

    updateItemID2Index() {
        Clear(this.itemID2Index);
        var itemID;
        for (var i = 0, cnt = this.items.length; i < cnt; i++) {
            itemID = this.items[i][this.keyItemID];
            this.itemID2Index[itemID] = i;
        }
        return this;
    }
}
export default Methods;