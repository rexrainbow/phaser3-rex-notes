import Press from '../../press/Press.js';
import FireCellEvent from './FireCellEvent.js';

var PressCell = function (table) {
    table._press = new Press(table);
    table._press
        .on('pressstart', function (press) {
            var table = press.gameObject;
            var cellIndex = table.pointerToCellIndex(press.worldX, press.worldY);
            press._cellIndex = cellIndex;
            FireCellEvent(this.eventEmitter, 'cell.pressstart', table, cellIndex);
        }, this)
        .on('pressend', function (press) {
            var table = press.gameObject;
            var cellIndex = press._cellIndex;
            press._cellIndex = undefined;
            FireCellEvent(this.eventEmitter, 'cell.pressend', table, cellIndex);
        }, this)
};

export default PressCell;