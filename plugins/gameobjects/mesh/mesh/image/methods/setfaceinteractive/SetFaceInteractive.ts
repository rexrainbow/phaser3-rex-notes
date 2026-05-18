import Contains from './Contains';
import OnPointerDown from './OnPointerDown';
import OnPointerUp from './OnPointerUp';
import OnPointerMove from './OnPointerMove';
import OnPointerOut from './OnPointerOut';

var SetFaceInteractive = function(config?: any) {
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