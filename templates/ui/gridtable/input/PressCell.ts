import Press from '../../press/Press';
import EmitCellEvent from './EmitCellEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var PressCell = function(table?: any, tableConfig?: any) {
    var pressConfig = GetValue(tableConfig, 'press', undefined);
    if (pressConfig === false) {
        return;
    }

    table._press = new Press(table, pressConfig);
    table._press
        .on('pressstart', function(press?: any, gameObject?: any, lastPointer?: any) {
            EmitCellEvent(this.eventEmitter, 'cell.pressstart', table, press.worldX, press.worldY, lastPointer);
        }, this)
        .on('pressend', function(press?: any, gameObject?: any, lastPointer?: any) {
            EmitCellEvent(this.eventEmitter, 'cell.pressend', table, press.worldX, press.worldY, lastPointer);
        }, this)
};

export default PressCell;