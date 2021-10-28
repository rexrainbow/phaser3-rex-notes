import Sizer from '../sizer/Sizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';
import IsArray from '../../../plugins/utils/object/IsArray.js';

const SizerAdd = Sizer.prototype.add;
const SizerAddSpace = Sizer.prototype.addSpace;

var Add = function (gameObject) {
    if (!this.buttonsExpand) {
        if (this.buttons.length === 0) { // 1st button
            // Add space at first element
            if (this.hasHeadSpace) {
                SizerAddSpace.call(this);
            }

            SizerAdd.call(this,
                gameObject,
                { proportion: 1, expand: true }
            );

            // Add space at last element
            if (this.hasTailSpace) {
                SizerAddSpace.call(this);
            }

        } else { // Other buttons
            if (this.hasTailSpace) {
                var lastIndex = this.sizerChildren.length - 1;
                SizerAdd.call(this,
                    gameObject,
                    { index: lastIndex, proportion: 1, expand: true }
                );

            } else {
                SizerAdd.call(this,
                    gameObject,
                    { proportion: 1, expand: true }
                );
            }

        }

    } else {
        SizerAdd.call(this,
            gameObject,
            { expand: true }
        );

    }

    // Space or other game object as button
    if (!gameObject.isRexSpace) {
        this.buttons.push(gameObject);
        ButtonSetInteractive.call(this, gameObject, this.clickConfig);
    }
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