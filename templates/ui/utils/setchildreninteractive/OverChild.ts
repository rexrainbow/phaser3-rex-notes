import { Utils as PhaserUtils } from 'phaser';
import ContainsPoint from './ContainsPoint';
import EmitChildEvent from './EmitChildEvent';

const GetValue = PhaserUtils.Objects.GetValue;

var OverChild = function(config?: any) {
    var overConfig = GetValue(config, 'over', undefined);
    if (overConfig === false) {
        return;
    } else if (overConfig === true) {
        overConfig = undefined;
    }

    this
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this)  // pointer-up is included too
}

var OnMove = function(pointer?: any, localX?: any, localY?: any, event?: any) {
    var childrenInteractive = this._childrenInteractive;
    var firstChild = childrenInteractive.targetSizers[0];
    if (!firstChild) {
        return;
    }
    var camera = pointer.camera;
    var px = pointer.worldX + camera.scrollX * (firstChild.scrollFactorX - 1);
    var py = pointer.worldY + camera.scrollY * (firstChild.scrollFactorY - 1);

    var child = ContainsPoint(childrenInteractive.targetMode, childrenInteractive.targetSizers, px, py);
    var preChild = childrenInteractive.lastOverChild;
    if (child && preChild &&
        (child === preChild)) {
        return;
    }

    childrenInteractive.lastOverChild = child;
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}out`,
        childrenInteractive.targetSizers,
        childrenInteractive.targetMode,
        preChild, undefined,
        pointer, event
    );
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}over`,
        childrenInteractive.targetSizers,
        childrenInteractive.targetMode,
        child, undefined,
        pointer, event
    );
}

var OnOut = function(pointer?: any, event?: any) {
    var childrenInteractive = this._childrenInteractive;
    var child = childrenInteractive.lastOverChild;
    childrenInteractive.lastOverChild = null;
    EmitChildEvent(
        childrenInteractive.eventEmitter,
        `${childrenInteractive.eventNamePrefix}out`,
        childrenInteractive.targetSizers,
        childrenInteractive.targetMode,
        child, undefined,
        pointer, event
    );
}

export default OverChild;