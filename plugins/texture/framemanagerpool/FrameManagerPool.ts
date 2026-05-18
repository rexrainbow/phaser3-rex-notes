import FrameManager from '../framemanager/FrameManager';

import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class FrameManagerPool {
    keyGenerator: any;

    firstItem: any;
    lastKey: any;
    list: any;

    constructor(scene?: any, keyGenerator?: any, width?: any, height?: any, cellWidth?: any, cellHeight?: any, fillColor?: any, useDynamicTexture?: any) {
        this.list = [];

        var config;
        if (IsPlainObject(keyGenerator)) {
            config = keyGenerator;
            keyGenerator = GetValue(config, 'key');
        }
        this.keyGenerator = keyGenerator;

        var key = this.generateKey();
        if (config?: any) {
            config.key = key;
            key = config;
        }

        // Store properties in firstItem
        this.firstItem = new FrameManager(
            scene, key,
            width, height, cellWidth, cellHeight,
            fillColor, useDynamicTexture
        );

        this.list.push(this.firstItem);
        this.lastKey = undefined;
    }

    get scene() {
        return this.firstItem.scene;
    }

    get useDynamicTexture() {
        return this.firstItem.useDynamicTexture;
    }

    get cellWidth() {
        return this.firstItem.cellWidth;
    }

    get cellHeight() {
        return this.firstItem.cellHeight;
    }

    get cellPadding() {
        return this.firstItem.cellPadding;
    }

    get outerCellWidth() {
        return this.firstItem.outerCellWidth;
    }

    get outerCellHeight() {
        return this.firstItem.outerCellHeight;
    }

    get width() {
        return this.firstItem.width;
    }

    get height() {
        return this.firstItem.height;
    }

    get columns() {
        return this.firstItem.columns;
    }

    get rows() {
        return this.firstItem.rows;
    }

    get totalCount() {
        return this.firstItem.totalCount;
    }

    get fillColor() {
        return this.firstItem.fillColor;
    }

    // Internal
    generateKey() {
        var keyGenerator = this.keyGenerator;
        var index = this.list.length;
        if (typeof (keyGenerator) === 'string') {
            return `${keyGenerator}_${index}`;
        }
        return keyGenerator(index);
    }

    getFrameManager(frameName?: any) {
        var items = this.list;
        for (var i = 0, cnt = this.list.length; i < cnt; i++) {
            var item = items[i];
            if (item.contains(frameName)) {
                return item;
            }
        }

        return undefined;
    }

    getAvailableFrameManager() {
        var items = this.list;
        var item;
        for (var i = 0, cnt = this.list.length; i < cnt; i++) {
            item = items[i];
            if (!item.isFull) {
                return item;
            }
        }

        // Does not have available item, create a new one
        item = new FrameManager(
            this.scene, this.generateKey(),
            this.width, this.height, this.cellWidth, this.cellHeight,
            this.fillColor, this.useDynamicTexture
        );

        items.push(item);

        this.lastKey = item.key;

        return item;
    }

    // Interface
    destroy() {
        var items = this.list;
        for (var i = 0, cnt = this.list.length; i < cnt; i++) {
            items[i].destroy();
        }

        return this;
    }

    draw(frameName?: any, callback?: any, scope?: any) {
        var item = this.getAvailableFrameManager();
        item.draw(frameName, callback, scope);
        return this;
    }

    paste(frameName?: any, gameObject?: any) {
        var item = this.getAvailableFrameManager();
        item.paste(frameName, gameObject);
        return this;
    }

    addEmptyFrame(frameName?: any, width?: any, height?: any) {
        var item = this.getAvailableFrameManager();
        item.addEmptyFrame(frameName, width, height);
        return this;
    }

    updateTexture() {
        var items = this.list;
        for (var i = 0, cnt = this.list.length; i < cnt; i++) {
            var item = items[i];
            if (item.dirty) {
                item.updateTexture();
            }
        }

        return this;
    }

    remove(frameName?: any) {
        var items = this.list;
        for (var i = 0, cnt = this.list.length; i < cnt; i++) {
            var item = items[i];
            if (item.contains(frameName)) {
                item.remove(frameName);
                return this;
            }
        }

        return this;
    }

    clear() {
        var items = this.list;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            items[i].clear();
        }

        return this;
    }

    contains(frameName?: any) {
        var items = this.list;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            if (items[i].contains(frameName)) {
                return true;
            }
        }

        return false;
    }

    getKey(frameName?: any) {
        var item = this.getFrameManager(frameName);
        if (item?: any) {
            return item.key;
        }

        return undefined;
    }

    get keys() {
        return this.getKeys();
    }

    getKeys() {
        var keys = [];
        var items = this.list;
        for (var i = 0, cnt = items.length; i < cnt; i++) {
            keys.push(items[i].key);
        }

        return keys;
    }

    getTexture(frameName?: any) {
        var item = this.getFrameManager(frameName);
        if (item?: any) {
            return item.texture;
        }

        return undefined;
    }

    getCanvas(frameName?: any) {
        var item = this.getFrameManager(frameName);
        if (item?: any) {
            return item.canvas;
        }

        return undefined;
    }

    getContext(frameName?: any) {
        var item = this.getFrameManager(frameName);
        if (item?: any) {
            return item.context;
        }

        return undefined;
    }
}

export default FrameManagerPool;