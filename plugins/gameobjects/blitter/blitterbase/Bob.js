const Clamp = Phaser.Math.Clamp;

class Bob {
    constructor(blitter, x, y, frame, visible) {
        this.parent = blitter;
        this.x = x;
        this.y = y;
        this.frame = frame;
        this.data = {};
        this._visible = visible;
        this._alpha = 1;
        this.tint = 0xffffff;
        this.tintFill = false;
        this.flipX = false;
        this.flipY = false;
    }

    setFrame(frame) {
        if (frame === undefined) {
            this.frame = this.parent.frame;
        }
        else if (frame instanceof Frame && frame.texture === this.parent.texture) {
            this.frame = frame;
        }
        else {
            this.frame = this.parent.texture.get(frame);
        }

        return this;
    }

    resetFlip() {
        this.flipX = false;
        this.flipY = false;

        return this;
    }

    reset(x, y, frame) {
        this.x = x;
        this.y = y;

        this.flipX = false;
        this.flipY = false;

        this._alpha = 1;
        this._visible = true;

        this.parent.dirty = true;

        if (frame) {
            this.setFrame(frame);
        }

        return this;
    }

    setFlipX(flipX) {
        this.flipX = flipX;

        return this;
    }

    setFlipY(flipY) {
        this.flipY = flipY;

        return this;
    }

    setFlip(flipX, flipY) {
        this.flipX = flipX;
        this.flipY = flipY;

        return this;
    }

    setVisible(value) {
        this.visible = value;

        return this;
    }

    setAlpha(value) {
        this.alpha = value;

        return this;
    }

    setTint(value) {
        this.tint = value;
        this.tintFill = false;

        return this;
    }

    setTintFill(value) {
        this.tint = value;
        this.tintFill = true;

        return this;
    }

    clearTint() {
        this.setTint(0xffffff);

        return this;
    }

    destroy() {
        this.parent.dirty = true;

        this.parent.children.remove(this);

        this.parent = undefined;
        this.frame = undefined;
        this.data = undefined;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this.parent.dirty |= (this._visible !== value);
        this._visible = value;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        value = Clamp(value, 0, 1);
        this.parent.dirty |= (this._alpha > 0) !== (value > 0);
        this._alpha = value;
    }
}

const Components = Phaser.GameObjects.Components;
Phaser.Class.mixin(Bob, Components.Transform);

export default Bob;