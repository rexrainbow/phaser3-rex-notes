import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var UpChild = function (config) {
    var overConfig = GetValue(config, 'up', undefined);
    if (overConfig === false) {
        return;
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
        pointer.worldX, pointer.worldY,
        pointer, event
    );
}

export default UpChild;