import Sizer from '../sizer/Sizer.js';
import { ButtonSetInteractive } from './ButtonSetInteractive.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerAdd = Sizer.prototype.add;
const SizerAddSpace = Sizer.prototype.addSpace;
const SizerInsert = Sizer.prototype.insert;

var Add = function (gameObject) {
    var childrenCount = this.sizerChildren.length;
    if (childrenCount === 0) { // 1st button
        // Add space
        if (!this.buttonsExpand) {
            switch (this.buttonsAlign) {
                case 'right':
                case 'bottom':
                case 'center':
                    SizerAddSpace.call(this);
                    break;
            }
        }

        SizerAdd.call(this, gameObject, this.buttonProportion, 'center', 0, true);

        // Add space
        if (!this.buttonsExpand) {
            if (this.buttonsAlign === 'center') {
                SizerAddSpace.call(this);
            }
        }
    } else {
        var padding;
        if (this.buttonSpace === 0) {
            padding = 0;
        } else if (this.orientation === 0) {
            padding = { left: this.buttonSpace };
        } else {
            padding = { top: this.buttonSpace };
        }

        var lastIndex = childrenCount - 1;
        var lastChild = this.sizerChildren[lastIndex];
        if (lastChild.isRexSpace) { // Last child is Space, insert new button in front of Space.
            SizerInsert.call(this, lastIndex, gameObject, this.buttonProportion, 'center', padding, true);
        } else {  // Last child is not Space, append new button directly.
            SizerAdd.call(this, gameObject, this.buttonProportion, 'center', padding, true);
        }
    }

    this.buttons.push(gameObject);
    ButtonSetInteractive.call(this, gameObject, this.clickConfig);
    return this;
};

export default {
    add(gameObject) {
        if (IsArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Add.call(this, gameObjects[i]);
            }
        } else {
            Add.call(this, gameObject);
        }
        return this;
    },

    addButton(gameObject) {
        this.add(gameObject);
        return this;
    },

    addButtons(gameObjects) {
        this.add(gameObjects);
        return this;
    }
}