import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var DownChild = function (config) {
    var overConfig = GetValue(config, 'down', undefined);
    if (overConfig === false) {
        return;
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
        pointer.worldX, pointer.worldY,
        pointer, event
    );
}

export default DownChild;