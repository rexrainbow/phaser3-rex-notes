import Sizer from '../sizer/Sizer.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const RemoveItem = Phaser.Utils.Array.Remove;
const SizerRmove = Sizer.prototype.remove;
const SizerClear = Sizer.prototype.clear;

var Remove = function (gameObject, destroyChild) {
    var gameObject = this.getButton(gameObject);
    if (!gameObject) {
        return this;
    }

    if (this.buttons.length === 1) {
        this.clear(destroyChild);
    } else {
        // Remove last button, change the last 2 child's padding config
        if (this.buttons.indexOf(gameObject) === (this.buttons.length - 1)) {            
            var last2Button = this.buttons[this.buttons.length - 2];
            var config = this.getSizerConfig(last2Button);
            if (this.orientation === 0) { // x
                config.padding.right = this.buttonSpace.right;
            } else {  // y
                config.padding.bottom = this.buttonSpace.bottom;
            }
        }

        RemoveItem(this.buttons, gameObject);
        SizerRmove.call(this, gameObject, destroyChild);
    }
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
        this.clear(destroyChild);
        return this;
    }
}