import PointToChild from './PointToChild.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var OverChild = function (config) {
    var overConfig = GetValue(config, 'over', undefined);
    if (overConfig === false) {
        return;
    }

    this
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this)  // pointer-up is included too
}

var OnMove = function (pointer, localX, localY, event) {
    var child = PointToChild(this.input.targetSizers, pointer.x, pointer.y);
    var preChild = this.input.lastOverChild;
    if (child && preChild &&
        (child === preChild)) {
        return;
    }

    this.input.lastOverChild = child;
    EmitChildEvent(
        this.eventEmitter,
        `${this.input.eventNamePrefix}out`,
        this.input.targetSizers,
        preChild, undefined,
        pointer, event
    );
    EmitChildEvent(
        this.eventEmitter,
        `${this.input.eventNamePrefix}over`,
        this.input.targetSizers,
        child, undefined,
        pointer, event
    );
}

var OnOut = function (pointer, event) {
    var child = this.input.lastOverChild;
    this.input.lastOverChild = null;
    EmitChildEvent(
        this.eventEmitter,
        `${this.input.eventNamePrefix}out`,
        this.input.targetSizers,
        child, undefined,
        pointer, event
    );
}

export default OverChild;