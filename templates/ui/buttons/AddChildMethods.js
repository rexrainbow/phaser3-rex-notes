import Sizer from '../sizer/Sizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerAdd = Sizer.prototype.add;
const SizerAddSpace = Sizer.prototype.addSpace;
const SizerInsert = Sizer.prototype.insert;

var Add = function (gameObject) {
    var buttonCount = this.buttons.length;
    var padding = {
        top: this.buttonSpace.top,
        bottom: this.buttonSpace.bottom,
        left: this.buttonSpace.left,
        right: this.buttonSpace.right
    };
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

        SizerAdd.call(this, gameObject, this.buttonProportion, 'center', padding, true);

        // Add space
        if (!this.buttonsExpand) {
            if (this.buttonsAlign === 'center') {
                SizerAddSpace.call(this);
            }
        }
    } else {
        if (this.orientation === 0) { // x
            padding.left = this.buttonSpace.item;            
        } else { // y
            padding.top = this.buttonSpace.item;
        }

        var lastIndex = this.sizerChildren.length - 1;
        var lastChild = this.sizerChildren[lastIndex];
        if (lastChild.isRexSpace) { // Last child is Space, insert new button in front of Space.
            SizerInsert.call(this, lastIndex, gameObject, this.buttonProportion, 'center', padding, true);
        } else {  // Last child is not Space, append new button directly.
            SizerAdd.call(this, gameObject, this.buttonProportion, 'center', padding, true);
        }
    }

    if (buttonCount > 0) {
        var lastButton = this.buttons[this.buttons.length - 1];
        var config = this.getSizerConfig(lastButton);
        if (this.orientation === 0) { // x
            config.padding.right = 0;
        } else {  // y
            config.padding.bottom = 0;
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