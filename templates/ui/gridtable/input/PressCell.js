import Press from '../../press/Press.js';
import EmitCellEvent from './EmitCellEvent.js';

var PressCell = function (table) {
    table._press = new Press(table);
    table._press
        .on('pressstart', function (press) {
            var table = press.gameObject;
            var cellIndex = table.pointerToCellIndex(press.x, press.y);
            press._cellIndex = cellIndex;
            EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, cellIndex);
        }, this)
        .on('pressend', function (press) {
            var table = press.gameObject;
            var cellIndex = press._cellIndex;
            press._cellIndex = undefined;
            EmitCellEvent(this.eventEmitter, 'cell.pressend', table, cellIndex);
        }, this)
};

export default PressCell;