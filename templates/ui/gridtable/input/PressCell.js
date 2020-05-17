import Press from '../../press/Press.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var PressCell = function (table, tableConfig) {
    var pressConfig = GetValue(tableConfig, 'press', undefined);
    table._press = new Press(table, pressConfig);
    table._press
        .on('pressstart', function (press, gameObject, lastPointer) {
            var cellIndex = table.pointToCellIndex(press.x, press.y);
            press._cellIndex = cellIndex;
            EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, cellIndex, undefined, lastPointer);
        }, this)
        .on('pressend', function (press, gameObject, lastPointer) {
            var cellIndex = press._cellIndex;
            press._cellIndex = undefined;
            EmitCellEvent(this.eventEmitter, 'cell.pressend', table, cellIndex, undefined, lastPointer);
        }, this)
};

export default PressCell;