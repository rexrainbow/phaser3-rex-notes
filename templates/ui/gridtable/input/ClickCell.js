import Button from '../../../../plugins/input/button/Button.js';
import EmitCellEvent from './EmitCellEvent.js';

var ClickCell = function (table) {
    table._click = new Button(table, {
        threshold: 10
    });
    table._click.on('click', function (button, gameObject, pointer) {
        EmitCellEvent(this.eventEmitter, 'cell.click', gameObject, pointer.x, pointer.y);
    }, this);
};

export default ClickCell;