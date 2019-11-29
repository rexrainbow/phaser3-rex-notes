import Clear from '../../utils/object/Clear.js';
import SpliceOne from '../../utils/array/SpliceOne.js';

var Methods = {
    clear() {
        this.items.length = 0;
        Clear(this.itemID2Index);
        return this;
    },

    getItems() {
        return this.items;
    },

    getItemIndexFromItemID(itemID) {
        return this.itemID2Index[itemID];
    },

    getItemFromItemID(itemID) {
        var i = this.getItemIndexFromItemID(itemID);
        if (i == null) {
            return null;
        }

        return this.items[i];
    },

    forEach(callback, scope) {
        this.items.forEach(callback, scope);
        return this;
    },

    addItem(snapshot, prevName, pushMode) {
        var item;
        if (this.getItemCallback) {
            var callback = this.getItemCallback;
            var scope = this.getItemCallbackScope;
            if (scope) {
                item = callback.call(scope, snapshot);
            } else {
                item = callback(snapshot);
            }
        } else {
            item = snapshot.val();
            item[this.keyItemID] = snapshot.key;
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