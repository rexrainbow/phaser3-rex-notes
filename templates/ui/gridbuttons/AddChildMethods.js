import GridSizer from '../gridsizer/GridSizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';

const GridSizerAdd = GridSizer.prototype.add;

export default {
    addButton(gameObject, columnIndex, rowIndex) {
        GridSizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, 0, this.buttonsExpand);
        this.buttons.push(gameObject);
        ButtonSetInteractive.call(this, gameObject, this.clickConfig);
        return this;
    }
}