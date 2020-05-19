import Swipe from '../../swipe/Swipe.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var SwipeChild = function (config) {
    var swipeConfig = GetValue(config, 'swipe', undefined);
    if (swipeConfig === false) {
        return;
    }

    if (swipeConfig === undefined) {
        swipeConfig = {};
    }
    swipeConfig.dir = '4dir';
    this._swipe = new Swipe(this, swipeConfig);
    this._swipe
        .on('swipe', function (swipe, gameObject, lastPointer) {
            var dirName =
                (swipe.left) ? 'left' :
                    (swipe.right) ? 'right' :
                        (swipe.up) ? 'up' :
                            'down';
            EmitChildEvent(
                this.eventEmitter,
                `${this.input.eventNamePrefix}swipe${dirName}`,
                this.input.targetSizers,
                swipe.x, swipe.y,
                lastPointer
            );
        }, this)
};

export default SwipeChild;