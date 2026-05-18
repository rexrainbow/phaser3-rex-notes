import Tap from '../../tap/Tap';
import EmitChildEvent from './EmitChildEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var TapChild = function(config?: any) {
    var tapConfig = GetValue(config, 'tap', undefined);
    if (tapConfig === false) {
        return;
    } else if (tapConfig === true) {
        tapConfig = undefined;
    }

    var childrenInteractive = this._childrenInteractive;
    this._tap = new Tap(this, tapConfig);
    this._tap
        .on('tap', function(tap?: any, gameObject?: any, lastPointer?: any) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}${tap.tapsCount}tap`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                tap.worldX, tap.worldY,
                lastPointer, tap
            );

            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}tap`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                tap.worldX, tap.worldY,
                lastPointer, tap
            );
        }, this)
};

export default TapChild;