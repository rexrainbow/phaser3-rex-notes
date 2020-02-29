import ContainMethods from './ContainMethods.js';
import ArrayMethods from './ArrayMethods.js';
import SetMethods from './SetMethods.js';
import IsArray from '../../utils/object/IsArray.js';
import Clone from '../../utils/object/Clone.js';

class UniqueItemList {
    constructor(items) {
        this.items = [];
        if (items) {
            this.addMultiple(items);
        }
    }

    destroy(destroyItems) {
        if (destroyItems) {
            this.destroyItems();
        } else {
            this.clear();
        }
        this.items = undefined;
    }

    addDestroyCallback(gameObject) {
        if (!gameObject) {
            return this;
        } else if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.addDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.on) {
            gameObject.on('destroy', this.remove, this);
        }
        return this;
    }

    removeDestroyCallback(gameObject) {
        if (!gameObject) {
            return this;
        } else if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.removeDestroyCallback(gameObjects[i]);
            }
            return this;
        }

        if (gameObject.off) {
            gameObject.off('destroy', this.remove, this);
        }
        return this;
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

    destroyItems() {
        var items = this.cloneItems();
        this.clear();
        for (var i = items.length; i > 0; i--) {
            items[i].destroy();
        }
        return this;
    }
}

Object.assign(
    UniqueItemList.prototype,
    ContainMethods,
    ArrayMethods,
    SetMethods
)

export default UniqueItemList;