import Swipe from '../../swipe/Swipe.js';
import EmitCellEvent from './EmitCellEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SwipeCell = function (table, tableConfig) {
    var swipeConfig = GetValue(tableConfig, 'swipe', undefined);
    if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    swipeConfig.dir = '4dir';
    table._swipe = new Swipe(table, swipeConfig);
    table._swipe
        .on('swipe', function (swipe) {
            var isValidSwipe = (table.scrollMode === 0) ? (swipe.left || swipe.right) : (swipe.up || swipe.down);
            if (isValidSwipe) {
                var cellIndex = table.pointerToCellIndex(swipe.x, swipe.y);
                var dirName =
                    (swipe.left) ? 'left' :
                        (swipe.right) ? 'right' :
                            (swipe.up) ? 'up' :
                                'down';
                EmitCellEvent(this.eventEmitter, `cell.swipe${dirName}`, table, cellIndex);
            }
        }, this)
};

export default SwipeCell;