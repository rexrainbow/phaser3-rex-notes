import OnPointerDown from './OnPointerDown.js';
import OnPointerUp from './OnPointerUp.js';
import OnPointerMove from './OnPointerMove.js';

import Tap from '../../../input/gestures/tap/Tap.js';
import OnTap from './OnTap.js';

import Press from '../../../input/gestures/press/Press.js';
import OnPressStart from './OnPressStart.js';
import OnPressEnd from './OnPressEnd.js';

class Input {
    constructor(board) {
        this.board = board;
        this.enable = true;
        this.pointer = null;
        this.tilePosition = {
            x: undefined,
            y: undefined
        };

        var scene = board.scene;
        scene.input.on('pointerdown', OnPointerDown, this);
        scene.input.on('pointerup', OnPointerUp, this);
        scene.input.on('pointermove', OnPointerMove, this);

        this._tap = new Tap(scene);
        this._tap.on('tap', OnTap, this);

        this._press = new Press(scene);
        this._press
            .on('pressstart', OnPressStart, this)
            .on('pressend', OnPressEnd, this);

        board.once('destroy', this.destroy, this);
    }

    destroy() {
        var scene = this.board.scene;
        if (scene) {
            scene.input.off('pointerdown', OnPointerDown, this);
            scene.input.off('pointerup', OnPointerUp, this);
            scene.input.off('pointermove', OnPointerMove, this);
        }

        this._tap.destroy();
        this._press.destroy();
    }

    setEnable(enable) {
        this.enable = enable;
        if (!enable) {
            this.pointer = null;
        }

        this._tap.setEnable(enable);
        this._press.setEnable(enable);
        return this;
    }
}
export default Input;