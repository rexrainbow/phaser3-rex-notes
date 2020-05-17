import Sizer from '../sizer/Sizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerAdd = Sizer.prototype.add;
const SizerAddSpace = Sizer.prototype.addSpace;
const SizerInsert = Sizer.prototype.insert;

var Add = function (gameObject) {
    var buttonCount = this.buttons.length;
    if (buttonCount === 0) { // 1st button
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
        var lastIndex = this.sizerChildren.length - 1;
        var lastChild = this.sizerChildren[lastIndex];
        if (lastChild.isRexSpace) { // Last child is Space, insert new button in front of Space.
            SizerInsert.call(this, lastIndex, gameObject, this.buttonProportion, 'center', 0, true);
        } else {  // Last child is not Space, append new button directly.
            SizerAdd.call(this, gameObject, this.buttonProportion, 'center', 0, true);
        }
    }

    this.buttons.push(gameObject);
    ButtonSetInteractive.call(this, gameObject, this.clickConfig);
    return this;
};

export default {
    addButton(gameObject) {
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

    addButtons(gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Add.call(this, gameObjects[i]);
        }
        return this;
    }
}