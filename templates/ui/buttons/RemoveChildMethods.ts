import Sizer from '../sizer/Sizer';
import IsArray from '../../../plugins/utils/object/IsArray';

const SizerRmove = Sizer.prototype.remove;
const SizerClear = Sizer.prototype.clear;

var Remove = function(gameObject?: any, destroyChild?: any) {
    if (this.getParentSizer(gameObject) !== this) {
        return this;
    }

    this.buttonGroup.remove(gameObject);
    SizerRmove.call(this, gameObject, destroyChild);
    return this;
};

export default {
    remove(gameObject?: any, destroyChild?: any) {
        // Remove gameObject no matter it is a button or not
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

    clear(destroyChild?: any) {
        var buttons = this.buttonGroup.buttons;
        buttons.length = 0;
        SizerClear.call(this, destroyChild);
        return this;
    },

    removeButton(gameObject?: any, destroyChild?: any) {
        var gameObject = this.getButton(gameObject);
        // Don't remove this gameObject, it is not a button
        if (!gameObject) {
            return this;
        }
        this.remove(gameObject, destroyChild);
        return this;
    },

    clearButtons(destroyChild?: any) {
        var buttons = this.buttonGroup.buttons;
        for (var i = buttons.length - 1; i >= 0; i--) {
            Remove.call(this, buttons[i], destroyChild);
        }
        return this;
    }
}