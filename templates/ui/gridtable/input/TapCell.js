import Tap from '../../tap/Tap.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TapCell = function (table, tableConfig) {
    table._tap = new Tap(table, GetValue(tableConfig, 'tap', undefined));
    table._tap
        .on('tap', function (tap) {
            var eventName = `cell.${tap.tapsCount}tap`
            EmitCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.x, tap.y);
        }, this)
};

export default TapCell;