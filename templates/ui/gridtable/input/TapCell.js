import Tap from '../../tap/Tap.js';
import FireCellEvent from './FireCellEvent.js';

var TapCell = function (table) {
    table._tap = new Tap(table);
    table._tap
        .on('tap', function (tap) {
            var eventName = `cell.${tap.tapsCount}tap`
            FireCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.worldX, tap.worldY);
        }, this)
};

export default TapCell;