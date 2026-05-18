import Swipe from '../../swipe/Swipe';
import EmitChildEvent from './EmitChildEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var SwipeChild = function(config?: any) {
    var swipeConfig = GetValue(config, 'swipe', undefined);
    if (swipeConfig === false) {
        return;
    } else if (swipeConfig === true) {
        swipeConfig = undefined;
    }

    if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    if (!swipeConfig.hasOwnProperty('dir')) {
        swipeConfig.dir = '4dir';
    }

    var childrenInteractive = this._childrenInteractive;
    this._swipe = new Swipe(this, swipeConfig);
    this._swipe
        .on('swipe', function(swipe?: any, gameObject?: any, lastPointer?: any) {
            var dirName =
                (swipe.left) ? 'left' :
                    (swipe.right) ? 'right' :
                        (swipe.up) ? 'up' :
                            'down';
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}swipe${dirName}`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                swipe.worldX, swipe.worldY,
                lastPointer, swipe
            );

            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}swipe`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                swipe.worldX, swipe.worldY,
                lastPointer, swipe
            );
        }, this)
};

export default SwipeChild;