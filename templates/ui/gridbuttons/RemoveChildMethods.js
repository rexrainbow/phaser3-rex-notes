import GridSizer from '../gridsizer/GridSizer.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const GridSizerRmove = GridSizer.prototype.remove;
const GridSizerClear = GridSizer.prototype.clear;

var Remove = function (gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
        return this;
    }

    RemoveItem(this.buttons, gameObject);
    GridSizerRmove.call(this, gameObject, destroyChild);
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
        GridSizerClear.call(this, destroyChild);
        return this;
    },

    removeButton(gameObject, destroyChild) {
        this.remove(gameObject, destroyChild);
        return this;
    },

    clearButtons(destroyChild) {
        this.clear(destroyChild);
        return this;
    }
}