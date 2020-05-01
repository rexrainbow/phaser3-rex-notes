import GridSizer from '../gridsizer/GridSizer.js';
import { ButtonSetInteractive } from '../utils/buttons/ButtonSetInteractive.js';

const GridSizerAdd = GridSizer.prototype.add;

export default {
    addButton(gameObject, columnIndex, rowIndex) {
        var padding = {};
        if (columnIndex === 0) {
            padding.left = this.buttonSpace.left;
        } else {
            padding.left = this.buttonSpace.itemX;
        }
        if (columnIndex === (this.columnCount - 1)) {
            padding.right = this.buttonSpace.right;
        }
        if (rowIndex === 0) {
            padding.top = this.buttonSpace.top;
        } else {
            padding.top = this.buttonSpace.itemY;
        }
        if (rowIndex === (this.rowCount - 1)) {
            padding.bottom = this.buttonSpace.bottom;
        }
        GridSizerAdd.call(this, gameObject, columnIndex, rowIndex, undefined, padding, this.buttonsExpand);
        this.buttons.push(gameObject);
        ButtonSetInteractive.call(this, gameObject, this.clickConfig);
        return this;
    }
}