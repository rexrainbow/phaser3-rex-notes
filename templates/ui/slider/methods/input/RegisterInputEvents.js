import OnDragThumb from './OnDragThumb.js';
import OnTouchTrack from './OnTouchTrack.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var RegisterInputEvents = function (config) {
    this.inputActive = false;

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
                    .on('dragstart', function (pointer) {
                        this.inputActive = true;
                        this.eventEmitter.emit('inputstart', pointer);
                    }, this)
                    .on('dragend', function (pointer) {
                        this.inputActive = false;
                        this.eventEmitter.emit('inputend', pointer);
                    }, this)
                    .on('drag', OnDragThumb, this)
            }
            break;
        case 1: // 'click'
            this
                .setInteractive()
                .on('pointerdown', function (pointer) {
                    this.inputActive = true;
                    this.eventEmitter.emit('inputstart', pointer);
                }, this)
                .on('pointerdown', OnTouchTrack, this)

            var OnReleaseTrack = function (pointer) {
                if (!this.inputActive) {
                    return;
                }
                this.inputActive = false;
                this.eventEmitter.emit('inputend', pointer);
            }

            this.scene.input
                // pointerup event
                .on('pointerup', OnReleaseTrack, this)
                // pointermove event
                .on('pointermove', OnTouchTrack, this)

            this
                .once('destroy', function () {
                    this.scene.input
                        .on('pointerup', OnReleaseTrack, this)
                        .off('pointermove', OnTouchTrack, this);

                }, this)

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