import Tap from '../../tap/Tap.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TapChild = function (config) {
    var tapConfig = GetValue(config, 'tap', undefined);
    if (tapConfig === false) {
        return;
    }

    this._tap = new Tap(this, tapConfig);
    this._tap
        .on('tap', function (tap, gameObject, lastPointer) {
            EmitChildEvent(
                this.eventEmitter,
                `${this.input.eventNamePrefix}${tap.tapsCount}tap`,
                this.input.targetSizers,
                tap.x, tap.y,
                lastPointer
            );
        }, this)
};

export default TapChild;