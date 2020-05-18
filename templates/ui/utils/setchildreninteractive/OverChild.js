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

var OnMove = function (pointer) {
    var child = this.pointToChild(pointer.x, pointer.y);
    var childIndex;
    if (child) {
        childIndex = this.sizerChildren.indexOf(child);
    }
    if (childIndex === this.input.lastOverChildIndex) {
        return;
    }

    var preChildIndex = this.input.lastOverChildIndex;
    this.input.lastOverChildIndex = childIndex;
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}out`, this, preChildIndex, undefined, pointer);
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}over`, this, childIndex, undefined, pointer);
}

var OnOut = function (pointer) {
    var childIndxe = this.input.lastOverChildIndex;
    this.input.lastOverChildIndex = undefined;
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}out`, this, childIndxe, undefined, pointer);
}

export default OverChild;