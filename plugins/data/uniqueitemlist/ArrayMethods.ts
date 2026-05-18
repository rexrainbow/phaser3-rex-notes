import SpliceOne from '../../utils/array/SpliceOne';
import RandomBetween from '../../utils/math/Between';
import Shuffle from '../../utils/array/Shuffle';
import Clone from '../../utils/object/Clone';

export default {
    isEmpty() {
        return (this.items.length === 0);
    },

    get(index?: any) {
        return this.items[index];
    },

    getFirst() {
        return this.items[0];
    },

    getLast() {
        return this.items[this.items.length - 1];
    },

    getRandom() {
        var index = RandomBetween(0, this.items.length - 1);
        return this.items[index];
    },

    add(item?: any, index?: any, moveToNewPosition?: any) {
        var currentIndex = this.items.indexOf(item);
        if (currentIndex !== -1) {
            if (moveToNewPosition && (index !== currentIndex)) {
                this.remove(undefined, currentIndex);
                this.add(item, index);
            }
            return this;
        }

        if ((index === undefined) || (index >= this.items.length)) {
            this.items.push(item);
        } else {
            this.items.splice(index, 0, item);
        }

        this.addDestroyCallback(item);

        return this;
    },

    addFirst(item?: any, moveToNewPosition?: any) {
        this.add(item, 0, moveToNewPosition);
        return this;
    },

    addLast(item?: any, moveToNewPosition?: any) {
        this.add(item, undefined, moveToNewPosition);
        return this;
    },

    addMultiple(items?: any, index?: any, moveToNewPosition?: any) {
        if (index === undefined) {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                this.add(items[i]);
            }
        } else {
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                if (this.contains(items[i])) {
                    continue;
                }
                this.add(items[i], index, moveToNewPosition);
                index++;
            }
        }
        return this;
    },

    remove(item?: any, index?: any) {
        if (item?: any) {
            index = this.items.indexOf(item);
            if (index === -1) {
                return this;
            }
        } else {
            item = this.items[index];
            if (!item) {
                return this;
            }
        }


        if (index === (this.items.length - 1)) {
            this.items.length -= 1;
        } else {
            SpliceOne(this.items, index);
        }

        this.removeDestroyCallback(item);

        return this;
    },

    onChildDestroy(child?: any, fromScene?: any) {
        this.remove(child);
    },

    removeFirst() {
        this.remove(undefined, 0);
        return this;
    },

    removeLast() {
        this.remove(undefined, (this.item.length - 1));
        return this;
    },

    removeMultiple(items?: any) {
        for (var i = items.length; i > 0; i--) {
            this.remove(items[i - 1]);
        }
        return this;
    },

    clear(destroyItems?: any) {
        var items;
        if (destroyItems?: any) {
            items = this.cloneItems();
        }

        this.removeDestroyCallback(this.items);
        this.items.length = 0;

        if (destroyItems?: any) {
            for (var i = items.length; i > 0; i--) {
                items[i].destroy();
            }
        }
        return this;
    },

    clone(out?: any) {
        if (out === this) {
            return this;
        } else if (out === undefined) {
            out = this.newList();
        }

        out.clear();
        Clone(this.items, out.items);
        out.addDestroyCallback(out.items)
        return out;
    },

    pop(index?: any) {
        if (index === undefined) {
            index = 0;
        }

        var item = this.items[index];
        this.remove(undefined, index);
        return item;
    },

    popFirst() {
        return this.pop(0);
    },

    popLast() {
        return this.pop(this.items.length - 1);
    },

    popRandom() {
        var index = RandomBetween(0, this.items.length - 1);
        return this.pop(index);
    },

    slice(start?: any, end?: any, out?: any) {
        var result = this.items.slice(start, (end + 1));

        if (out === undefined) {
            out = this.newList();
        }
        out.clear();
        Clone(result, out.items);
        out.addDestroyCallback(out.items);
        return out;
    },

    reverse() {
        this.items.reverse();
        return this;
    },

    sort(callback?: any) {
        this.items.sort(callback);
        return this;
    },

    shuffle() {
        Shuffle(this.items);
        return this;
    }
};