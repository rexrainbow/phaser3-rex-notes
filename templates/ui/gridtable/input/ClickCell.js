import Button from '../../../../plugins/input/button/Button.js';
import FireCellEvent from './FireCellEvent.js';

var ClickCell = function (table) {
    table._click = new Button(table, {
        threshold: 10
    });
    table._click.on('click', function (button, gameObject, pointer) {
        FireCellEvent(this.eventEmitter, 'cell.click', gameObject, pointer.worldX, pointer.worldY);
    }, this);
};

export default ClickCell;