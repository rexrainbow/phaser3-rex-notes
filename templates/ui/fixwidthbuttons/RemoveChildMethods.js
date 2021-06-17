import FixWidthSizer from '../fixwidthsizer/FixWidthSizer.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const SizerRmove = FixWidthSizer.prototype.remove;
const SizerClear = FixWidthSizer.prototype.clear;

var Remove = function (gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
        return this;
    }

    RemoveItem(this.buttons, gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
};

export default {
    remove(gameObject, destroyChild) {
        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Remove.call(this, gameObjects[i], destroyChild);
            }
        } else {
            Remove.call(this, gameObject, destroyChild);
        }
        return this;
    },

    clear(destroyChild) {
        this.buttons.length = 0;
        SizerClear.call(this, destroyChild);
        return this;
    },

    removeButton(gameObject, destroyChild) {
        this.remove(gameObject, destroyChild);
        return this;
    },

    clearButtons(destroyChild) {
        for (var i = this.buttons.length - 1; i >= 0; i--) {
            Remove.call(this, this.buttons[i], destroyChild);
        }
        return this;
    }
}