import Contains from './Contains.js';
import OnPointerDown from './OnPointerDown.js';
import OnPointerUp from './OnPointerUp.js';
import OnPointerMove from './OnPointerMove.js';
import OnPointerOut from './OnPointerOut.js';

var SetFaceInteractive = function (config) {
    if (this.input) {
        return;
    }

    if (config === undefined) {
        config = {};
    }
    config.hitArea = {};
    config.hitAreaCallback = Contains;

    this
        .setInteractive(config)
        .on('pointerdown', OnPointerDown, this)
        .on('pointerup', OnPointerUp, this)
        .on('pointermove', OnPointerMove, this)
        .on('pointerover', OnPointerMove, this)
        .on('pointerout', OnPointerOut, this)

    return this;
}

export default SetFaceInteractive;