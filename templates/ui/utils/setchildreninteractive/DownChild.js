import { Utils as PhaserUtils } from 'phaser';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = PhaserUtils.Objects.GetValue;

var DownChild = function (config) {
    var downConfig = GetValue(config, 'down', undefined);
    if (downConfig === false) {
        return;
    } else if (downConfig === true) {
        downConfig = undefined;
    }

    this
        .on('pointerdown', OnDown, this)
}

var OnDown = function (pointer, localX, localY, event) {
    var childrenInteractive = this._childrenInteractive;

    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}down`,
        childrenInteractive.targetSizers,
        childrenInteractive.targetMode,
        pointer.worldX, pointer.worldY,
        pointer, event
    );
}

export default DownChild;