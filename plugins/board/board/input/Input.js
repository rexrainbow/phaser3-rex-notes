import OnPointerDown from './OnPointerDown.js';
import OnPointerUp from './OnPointerUp.js';
import OnPointerMove from './OnPointerMove.js';

import InstallTap from './InstallTap.js';
import InstallPress from './InstallPress.js';
import InstallSwipe from './InstallSwipe.js';

class Input {
    constructor(board) {
        this.board = board;
        this._enable = true;
        this.pointer = null;
        this.tilePosition = { x: undefined, y: undefined };
        this.prevTilePosition = { x: undefined, y: undefined };

        var scene = board.scene;
        scene.input.on('pointerdown', OnPointerDown, this);
        scene.input.on('pointerup', OnPointerUp, this);
        scene.input.on('pointermove', OnPointerMove, this);

        this.tap = InstallTap.call(this);
        this.press = InstallPress.call(this);
        this.swipe = InstallSwipe.call(this);

        board.on('destroy', this.destroy, this);
    }

    destroy() {
        var scene = this.board.scene;
        if (scene) {
            scene.input.off('pointerdown', OnPointerDown, this);
            scene.input.off('pointerup', OnPointerUp, this);
            scene.input.off('pointermove', OnPointerMove, this);
        }

        this.tap.destroy();
        this.press.destroy();
        this.swipe.destroy();
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }

        if (!e) {
            this.pointer = null;
        }
        this._enable = e;
        this.tap.setEnable(e);
        this.press.setEnable(e);
        this.swipe.setEnable(e)
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }
}
export default Input;