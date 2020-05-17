import Tap from '../../tap/Tap.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TapChild = function (config) {
    var tapConfig = GetValue(config, 'press', undefined);
    this._tap = new Tap(this, tapConfig);
    this._tap
        .on('tap', function (tap, gameObject, lastPointer) {
            var eventName = `${this.inputEventPrefix}${tap.tapsCount}tap`
            EmitChildEvent(this.eventEmitter, eventName, tap.gameObject, tap.x, tap.y, lastPointer);
        }, this)
};

export default TapChild;