import Button from '../../../../plugins/input/button/Button';
import EmitCellEvent from './EmitCellEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var ClickCell = function(table?: any, tableConfig?: any) {
    var buttonConfig = GetValue(tableConfig, 'click', undefined);
    if (buttonConfig === false) {
        return;
    } else if (buttonConfig === undefined) {
        buttonConfig = {};
    }
    buttonConfig.threshold = 10;
    table._click = new Button(table, buttonConfig);
    table._click.on('click', function(button?: any, gameObject?: any, pointer?: any, event?: any) {
        EmitCellEvent(this.eventEmitter, 'cell.click', gameObject, pointer.worldX, pointer.worldY, pointer, event);
    }, this);
};

export default ClickCell;