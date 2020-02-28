import Press from '../../press/Press.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var PressCell = function (table, tableConfig) {
    var pressConfig = GetValue(tableConfig, 'press', undefined);
    table._press = new Press(table, pressConfig);
    table._press
        .on('pressstart', function (press) {
            var cellIndex = table.pointerToCellIndex(press.x, press.y);
            press._cellIndex = cellIndex;
            EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, cellIndex);
        }, this)
        .on('pressend', function (press) {
            var cellIndex = press._cellIndex;
            press._cellIndex = undefined;
            EmitCellEvent(this.eventEmitter, 'cell.pressend', table, cellIndex);
        }, this)
};

export default PressCell;