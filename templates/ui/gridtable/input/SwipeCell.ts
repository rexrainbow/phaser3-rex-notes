import Swipe from '../../swipe/Swipe';
import EmitCellEvent from './EmitCellEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var SwipeCell = function(table?: any, tableConfig?: any) {
    var swipeConfig = GetValue(tableConfig, 'swipe', undefined);
    if (swipeConfig === false) {
        return;
    } else if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    swipeConfig.dir = '4dir';
    table._swipe = new Swipe(table, swipeConfig);
    table._swipe
        .on('swipe', function(swipe?: any, gameObject?: any, lastPointer?: any) {
            var dirName =
                (swipe.left) ? 'left' :
                    (swipe.right) ? 'right' :
                        (swipe.up) ? 'up' :
                            'down';
            EmitCellEvent(this.eventEmitter, `cell.swipe${dirName}`, table, swipe.worldX, swipe.worldY, lastPointer);
        }, this)
};

export default SwipeCell;