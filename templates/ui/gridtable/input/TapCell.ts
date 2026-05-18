import Tap from '../../tap/Tap';
import EmitCellEvent from './EmitCellEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var TapCell = function(table?: any, tableConfig?: any) {
    var tapConfig = GetValue(tableConfig, 'tap', undefined);
    if (tapConfig === false) {
        return;
    }

    table._tap = new Tap(table, tapConfig);
    table._tap
        .on('tap', function(tap?: any, gameObject?: any, lastPointer?: any) {
            var eventName = `cell.${tap.tapsCount}tap`
            EmitCellEvent(this.eventEmitter, eventName, tap.gameObject, tap.worldX, tap.worldY, lastPointer);
        }, this)
};

export default TapCell;