import OnPointerDown from './OnPointerDown.js';
import OnPointerUp from './OnPointerUp.js';
import OnPointerMove from './OnPointerMove.js';

var SetInteractive = function (enable) {
    if (enable === undefined) {
        enable = true;
    }

    if (!this.miniboardInput) {
        InteractiveInitialize.call(this);
    }

    this.miniboardInput.enable = enable;
    if (!enable) {
        this.miniboardInput.pointer = null;
    }

    return this;
};

var InteractiveInitialize = function () {
    this.miniboardInput = {
        enable: true,
        tilePosition: {
            x: undefined,
            y: undefined
        },
        pointer: undefined,
        drag: {
            enable: false,
            state: 0,
            position: {
                x: undefined,
                y: undefined
            }
        }
    };
    this.scene.input.on('pointerdown', OnPointerDown, this);
    this.scene.input.on('pointerup', OnPointerUp, this);
    this.scene.input.on('pointermove', OnPointerMove, this);

    this.once('destroy', function () {
        if (this.scene) {
            this.scene.input.off('pointerdown', OnPointerDown, this);
            this.scene.input.off('pointerup', OnPointerUp, this);
            this.scene.input.off('pointermove', OnPointerMove, this);
        }
    }, this);

}

export default SetInteractive;