import CursorKeys from '../../utils/input/CursorKeys.js'
import GetDefaultBounds from '../../utils/bounds/GetDefaultBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CursorAtBound extends CursorKeys {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.sensitiveDistance = GetValue(config, 'sensitiveDistance', 20);

        var bounds = GetValue(config, 'bounds', undefined);
        if (bounds === undefined) {
            bounds = GetDefaultBounds(scene);
        }
        this.bounds = bounds;

        this.boot();
    }

    boot() {
        this.scene.input.on('pointermove', this.onPointerMove, this);
        this.scene.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (this.scene) {
            this.scene.input.off('pointermove', this.onPointerMove, this);
        }
    }

    destroy() {
        this.shutdown();
    }

    onPointerMove(pointer) {
        var cursorX = pointer.x,
            cursorY = pointer.y;
        var left = this.bounds.left,
            right = this.bounds.right,
            top = this.bounds.top,
            bottom = this.bounds.bottom,
            sensitiveDistance = this.sensitiveDistance;
        var atLeftBound = (cursorX >= left) && (cursorX <= (left + sensitiveDistance)),
            atRightBound = (cursorX <= right) && (cursorX >= (right - sensitiveDistance)),
            atTopBound = (cursorY >= top) && (cursorY <= (top + sensitiveDistance)),
            atBottomBound = (cursorY <= bottom) && (cursorY >= (bottom - sensitiveDistance))

        this.clearAllKeysState();
        this.setKeyState('left', atLeftBound);
        this.setKeyState('right', atRightBound);
        this.setKeyState('up', atTopBound);
        this.setKeyState('down', atBottomBound);
    }
}

export default CursorAtBound;