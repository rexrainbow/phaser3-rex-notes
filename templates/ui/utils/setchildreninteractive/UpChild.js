import EmitChildEvent from './EmitChildEvent.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var UpChild = function (config) {
    var upConfig = GetValue(config, 'up', undefined);
    if (upConfig === false) {
        return;
    } else if (upConfig === true) {
        upConfig = undefined;
    }

    this
        .on('pointerup', OnUp, this)
}

var OnUp = function (pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;

    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}up`,
        childrenInteractive.targetSizers,
        childrenInteractive.targetMode,
        pointer.worldX, pointer.worldY,
        pointer, event
    );
}

export default UpChild;