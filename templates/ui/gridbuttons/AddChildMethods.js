import GridSizer from '../gridsizer/GridSizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';

const SizerAdd = GridSizer.prototype.add;

export default {
    addButton(gameObject, columnIndex, rowIndex) {
        SizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
        this.buttons.push(gameObject);
        ButtonSetInteractive.call(this, gameObject, this.clickConfig);
        return this;
    },

    addButtons(gameObjects, rowThenColumn) {
        for (var i = 0, cnt = gameObjects; i < cnt; i++) {
            this.addButton(gameObjects[i], undefined, rowThenColumn);
        }
        return this;
    }
}