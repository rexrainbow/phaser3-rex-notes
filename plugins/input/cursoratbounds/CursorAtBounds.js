import CursorKeys from '../../utils/input/CursorKeys.js'
import GetViewport from '../../utils/system/GetViewport.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class CursorAtBounds extends CursorKeys {
    constructor(scene, config) {
        super(scene);

        this.scene = scene;

        this._enable = undefined;
        this.setEnable(GetValue(config, 'enable', true));

        this.setSensitiveDistance(GetValue(config, 'sensitiveDistance', 20));

        var bounds = GetValue(config, 'bounds', undefined);
        if (bounds === undefined) {
            bounds = GetViewport(scene);
            this.autoUpdateViewportBounds = true;
        } else {
            this.autoUpdateViewportBounds = false;
        }
        this.setBounds(bounds);

        this.pointerOutGameReleaseEnable = GetValue(config, 'pointerOutGameRelease', true);
        this.pointerOutBoundsReleaseEnable = GetValue(config, 'pointerOutBoundsRelease', false);

        this.boot();
    }

    boot() {
        this.scene.input.on('pointermove', this.onPointerMove, this);

        if (this.pointerOutGameReleaseEnable) {
            this.scene.input.on('gameout', this.clearAllKeysState, this);
        }

        if (this.autoUpdateViewportBounds) {
            this.scene.scale.on('resize', this.updateBoundsByViewport, this);
        }

        this.scene.sys.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        if (!this.scene) {
            return;
        }

        this.scene.input.off('pointermove', this.onPointerMove, this);

        if (this.pointerOutGameReleaseEnable) {
            this.scene.input.off('gameout', this.clearAllKeysState, this);
        }

        if (this.autoUpdateViewportBounds) {
            this.scene.scale.off('resize', this.updateBoundsByViewport, this);
        }

        this.scene.sys.events.off('shutdown', this.destroy, this);

        this.scene = undefined;

        super.shutdown();
    }

    destroy() {
        this.shutdown();
    }

    updateBoundsByViewport() {
        GetViewport(this.scene, this.bounds);
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.clearAllKeysState();
        }
        this._enable = e;
        return this;
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }

    setBounds(bounds) {
        this.bounds = bounds;
        return this;
    }

    getBounds() {
        return this.bounds;
    }

    setSensitiveDistance(distance) {
        this.sensitiveDistance = distance;
        return this;
    }

    onPointerMove(pointer) {
        if (!this.enable) {
            return;
        }

        var cursorX = pointer.x,
            cursorY = pointer.y;
        var left = this.bounds.left,
            right = this.bounds.right,
            top = this.bounds.top,
            bottom = this.bounds.bottom,
            sensitiveDistance = this.sensitiveDistance;
        var pressLeftKey = (cursorX >= left) && (cursorX <= (left + sensitiveDistance)),
            pressRightKey = (cursorX <= right) && (cursorX >= (right - sensitiveDistance)),
            pressUpKey = (cursorY >= top) && (cursorY <= (top + sensitiveDistance)),
            pressDownKey = (cursorY <= bottom) && (cursorY >= (bottom - sensitiveDistance))

        if (!this.pointerOutBoundsReleaseEnable) {
            pressLeftKey |= (cursorX < left);
            pressRightKey |= (cursorX > right);
            pressUpKey |= (cursorY < top);
            pressDownKey |= (cursorY > bottom);
        }

        this.setKeyState('left', pressLeftKey);
        this.setKeyState('right', pressRightKey);
        this.setKeyState('up', pressUpKey);
        this.setKeyState('down', pressDownKey);
    }

    get up() {
        return this.upKeyDown;
    }

    get down() {
        return this.downKeyDown;
    }

    get left() {
        return this.leftKeyDown;
    }

    get right() {
        return this.rightKeyDown;
    }

    get noKey() {
        return this.noKeyDown;
    }
}

export default CursorAtBounds;