import OnDragThumb from './OnDragThumb.js';
import OnTouchTrack from './OnTouchTrack.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterInputEvents = function (config) {
    var inputMode = GetValue(config, 'input', 0);
    if (typeof (inputMode) === 'string') {
        inputMode = INPUTMODE[inputMode];
    }

    var thumb = this.childrenMap.thumb;

    switch (inputMode) {
        case 0: // 'drag'
            if (thumb) {
                thumb.setInteractive();
                this.scene.input.setDraggable(thumb);
                thumb
                    .on('drag', OnDragThumb, this)
                    .on('dragstart', function (pointer) {
                        this.eventEmitter.emit('inputstart', pointer);
                    }, this)
                    .on('dragend', function (pointer) {
                        this.eventEmitter.emit('inputend', pointer);
                    }, this)

            }
            break;
        case 1: // 'click'
            this
                .on('pointerdown', OnTouchTrack, this)
                .on('pointermove', OnTouchTrack, this)
                .on('pointerdown', function (pointer) {
                    this.eventEmitter.emit('inputstart', pointer);
                }, this)
                .on('pointerup', function (pointer) {
                    this.eventEmitter.emit('inputend', pointer);
                }, this)
                .on('pointerover', function (pointer) {
                    if (pointer.isDown) {
                        this.eventEmitter.emit('inputstart', pointer);
                    }
                }, this)
                .on('pointerout', function (pointer) {
                    if (pointer.isDown) {
                        this.eventEmitter.emit('inputend', pointer);
                    }
                }, this)
                .setInteractive()

            break;
    }
}

const INPUTMODE = {
    pan: 0,
    drag: 0,
    click: 1,
    none: -1,
}

export default RegisterInputEvents;