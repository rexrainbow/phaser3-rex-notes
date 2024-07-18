(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexuniqueitemlistplugin = factory());
})(this, (function () { 'use strict';

    var IsPlainObject = function (obj)
    {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
        {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try
        {
            if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
            {
                return false;
            }
        }
        catch (e)
        {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    var GetValue = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var DestroyCallbackMethods = {
        setAutoCleanupEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.autoCleanupEnable = enabled;
            return this;
        },

        addDestroyCallback(gameObject) {
            if ((!gameObject) || (!this.autoCleanupEnable)) {
                return this;
            }

            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.addDestroyCallback(gameObjects[i]);
                }
                return this;
            }

            if (gameObject.on) {
                gameObject.once('destroy', this.onChildDestroy, this);
            }
            return this;
        },

        removeDestroyCallback(gameObject) {
            if ((!gameObject) || (!this.autoCleanupEnable)) {
                return this;
            }

            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    this.removeDestroyCallback(gameObjects[i]);
                }
                return this;
            }

            if (gameObject.off) {
                gameObject.off('destroy', this.onChildDestroy, this);
            }
            return this;
        }
    };

    var ContainMethods = {
        contains(item) {
            return (this.items.indexOf(item) !== -1);
        },

        any(listB) {
            var items = (this.isList(listB)) ? listB.items : listB;
            for (var i = 0, cnt = items; i < cnt; i++) {
                if (this.contains(items[i])) {
                    return true;
                }
            }
            return false;
        },

        all(listB) {
            var items = (this.isList(listB)) ? listB.items : listB;
            for (var i = 0, cnt = items; i < cnt; i++) {
                if (!this.contains(items[i])) {
                    return false;
                }
            }
            return true;
        }
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    /**
     * Removes a single item from an array and returns it without creating gc, like the native splice does.
     * Based on code by Mike Reinstein.
     *
     * @function Phaser.Utils.Array.SpliceOne
     * @since 3.0.0
     *
     * @param {array} array - The array to splice from.
     * @param {integer} index - The index of the item which should be spliced.
     *
     * @return {*} The item which was spliced (removed).
     */
    var SpliceOne = function (array, index)
    {
        if (index >= array.length)
        {
            return;
        }

        var len = array.length - 1;

        var item = array[index];

        for (var i = index; i < len; i++)
        {
            array[i] = array[i + 1];
        }

        array.length = len;

        return item;
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    /**
     * Compute a random integer between the `min` and `max` values, inclusive.
     *
     * @function Phaser.Math.Between
     * @since 3.0.0
     *
     * @param {integer} min - The minimum value.
     * @param {integer} max - The maximum value.
     *
     * @return {integer} The random integer.
     */
    var Between = function (min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    /**
     * Shuffles the contents of the given array using the Fisher-Yates implementation.
     *
     * The original array is modified directly and returned.
     *
     * @function Phaser.Utils.Array.Shuffle
     * @since 3.0.0
     *
     * @param {array} array - The array to shuffle. This array is modified in place.
     *
     * @return {array} The shuffled array.
     */
    var Shuffle = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    };

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    var ArrayMethods = {
        isEmpty() {
            return (this.items.length === 0);
        },

        get(index) {
            return this.items[index];
        },

        getFirst() {
            return this.items[0];
        },

        getLast() {
            return this.items[this.items.length - 1];
        },

        getRandom() {
            var index = Between(0, this.items.length - 1);
            return this.items[index];
        },

        add(item, index, moveToNewPosition) {
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

        addFirst(item, moveToNewPosition) {
            this.add(item, 0, moveToNewPosition);
            return this;
        },

        addLast(item, moveToNewPosition) {
            this.add(item, undefined, moveToNewPosition);
            return this;
        },

        addMultiple(items, index, moveToNewPosition) {
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

        remove(item, index) {
            if (item) {
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

        onChildDestroy(child, fromScene) {
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

        removeMultiple(items) {
            for (var i = items.length; i > 0; i--) {
                this.remove(items[i - 1]);
            }
            return this;
        },

        clear(destroyItems) {
            var items;
            if (destroyItems) {
                items = this.cloneItems();
            }

            this.removeDestroyCallback(this.items);
            this.items.length = 0;

            if (destroyItems) {
                for (var i = items.length; i > 0; i--) {
                    items[i].destroy();
                }
            }
            return this;
        },

        clone(out) {
            if (out === this) {
                return this;
            } else if (out === undefined) {
                out = this.newList();
            }

            out.clear();
            Clone(this.items, out.items);
            out.addDestroyCallback(out.items);
            return out;
        },

        pop(index) {
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
            var index = Between(0, this.items.length - 1);
            return this.pop(index);
        },

        slice(start, end, out) {
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

        sort(callback) {
            this.items.sort(callback);
            return this;
        },

        shuffle() {
            Shuffle(this.items);
            return this;
        }
    };

    var SetMethods = {
        union(listB, out) {    
            if (this === listB) {
                if (this !== out) {
                    out = this.clone(out);
                }
            } else if (this === out) {
                this.addMultiple(listB.items);
            } else if (listB === out) {
                listB.addMultiple(this.items);
            } else {
                if (this.items.length >= listB.items.length) {
                    out = this.clone(out);
                    out.addMultiple(listB.items);
                } else {
                    out = listB.clone(out);
                    out.addMultiple(this.items);
                }
            }
            return out;
        },

        intersect(listB, out) {
            if (this === listB) {
                if (this !== out) {
                    out = this.clone(out);
                }
            } else if (this === out) {
                var itemsA = Clone(this.items);
                this.clear();

                var item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsA[i];
                    if (listB.contains(item)) {
                        this.add(item);
                    }
                }
            } else if (listB === out) {
                var itemsB = Clone(listB.items);
                listB.clear();

                var item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsB[i];
                    if (this.contains(item)) {
                        listB.add(item);
                    }
                }
            } else {
                out = this.newList();
                if (this.items.length >= listB.items.length) {
                    var itemsB = listB.items, item;
                    for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
                        item = itemsB[i];
                        if (this.contains(item)) {
                            out.add(item);
                        }
                    }
                } else {
                    var itemsA = this.items, item;
                    for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                        item = itemsA[i];
                        if (listB.contains(item)) {
                            out.add(item);
                        }
                    }
                }
            }
            return out;
        },

        difference(listB, out) {
            if (this === listB) {
                if (this === out) {
                    this.clear();
                } else {
                    out = this.newList();
                }
            } else if (this === out) {
                var itemsA = Clone(this.items);
                this.clear();

                var item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsA[i];
                    if (!listB.contains(item)) {
                        this.add(item);
                    }
                }
            } else if (listB === out) {
                var itemsB = Clone(listB.items);
                listB.clear();

                var item;
                for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                    item = itemsB[i];
                    if (!this.contains(item)) {
                        listB.add(item);
                    }
                }
            } else {
                out = this.newList();
                if (this.items.length >= listB.items.length) {
                    var itemsB = listB.items, item;
                    for (var i = 0, cnt = itemsB.length; i < cnt; i++) {
                        item = itemsB[i];
                        if (!this.contains(item)) {
                            out.add(item);
                        }
                    }
                } else {
                    var itemsA = this.items, item;
                    for (var i = 0, cnt = itemsA.length; i < cnt; i++) {
                        item = itemsA[i];
                        if (!listB.contains(item)) {
                            out.add(item);
                        }
                    }
                }
            }
            return out;
        },
    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    class UniqueItemList {
        constructor(items, config) {
            if (IsPlainObject(items)) {
                config = items;
                items = GetValue(config, 'items', undefined);
            }

            this.items = [];
            this.setAutoCleanupEnable(GetValue(config, 'autoCleanup', true));
            if (items) {
                this.addMultiple(items);
            }
        }

        destroy(destroyItems) {
            this.clear(destroyItems);
            this.items = undefined;
        }

        getItems() {
            return this.items;
        }

        cloneItems(out) {
            return Clone(this.items, out);
        }

        isList(item) {
            return (item instanceof UniqueItemList);
        }

        newList(items) {
            var config = {
                autoCleanup: this.autoCleanupEnable
            };
            return new UniqueItemList(items, config);
        }

        get length() {
            return this.items.length;
        }

        call(callback, scope) {
            if (this.items.length === 0) {
                return this;
            }

            if (typeof (callback) === 'string') {
                var fnName = callback;
                Copy(ARGS, arguments, 1);
                var item;
                for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                    item = this.items[i];
                    item[fnName].apply(item, ARGS);
                }
                ARGS.length = 0;

            } else {
                for (var i = 0, cnt = this.items.length; i < cnt; i++) {
                    if (scope) {
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
    );

    class UniqueItemListPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(config) {
            return new UniqueItemList(config);
        }

    }

    return UniqueItemListPlugin;

}));
