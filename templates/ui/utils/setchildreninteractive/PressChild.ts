import Press from '../../press/Press';
import EmitChildEvent from './EmitChildEvent';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var PressChild = function(config?: any) {
    var pressConfig = GetValue(config, 'press', undefined);
    if (pressConfig === false) {
        return;
    } else if (pressConfig === true) {
        pressConfig = undefined;
    }

    var childrenInteractive = this._childrenInteractive;
    this._press = new Press(this, pressConfig);
    this._press
        .on('pressstart', function(press?: any, gameObject?: any, lastPointer?: any) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}pressstart`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                press.worldX, press.worldY,
                lastPointer, press
            );
        }, this)
        .on('pressend', function(press?: any, gameObject?: any, lastPointer?: any) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}pressend`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                press.worldX, press.worldY,
                lastPointer, press
            );
        }, this)
};

export default PressChild;