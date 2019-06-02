import Tap from '../../tap/Tap.js';
import EmitCellEvent from './EmitCellEvent.js';

var TapCell = function (table) {
    table._tap = new Tap(table);
    table._tap
        .on('tap', function (tap) {
            var eventName = `cell.${tap.tapsCount}tap`
            EmitCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.x, tap.y);
        }, this)
};

export default TapCell;