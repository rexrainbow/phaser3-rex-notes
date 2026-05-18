import { Utils as PhaserUtils } from 'phaser';
import EmitChildEvent from './EmitChildEvent';

const GetValue = PhaserUtils.Objects.GetValue;

var DownChild = function(config?: any) {
    var downConfig = GetValue(config, 'down', undefined);
    if (downConfig === false) {
        return;
    } else if (downConfig === true) {
        downConfig = undefined;
    }

    this
        .on('pointerdown', OnDown, this)
}

var OnDown = function(pointer?: any, localX?: any, localY?: any, event?: any) {
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