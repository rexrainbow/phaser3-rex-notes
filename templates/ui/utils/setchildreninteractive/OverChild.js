import EmitChildEvent from './EmitChildEvent.js';

var OverChild = function (config) {
    this
        .on('pointermove', OnMove, this)
        .on('pointerover', OnMove, this)
        .on('pointerout', OnOut, this);
}

var OnMove = function (pointer) {
    if (pointer.isDown) {
        return;
    }

    var child = this.pointToChild(pointer.x, pointer.y);
    var childIndex;
    if (child) {
        childIndex = this.sizerChildren.indexOf(child);
    }
    if (childIndex === this._lastOverChildIndex) {
        return;
    }

    var preChildIndex = this._lastOverChildIndex;
    this._lastOverChildIndex = childIndex;
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}out`, this, preChildIndex, undefined, pointer);
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}over`, this, childIndex, undefined, pointer);
}

var OnOut = function (pointer) {
    var childIndxe = this._lastOverChildIndex;
    this._lastOverChildIndex = undefined;
    EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}out`, this, childIndxe, undefined, pointer);
}

export default OverChild;