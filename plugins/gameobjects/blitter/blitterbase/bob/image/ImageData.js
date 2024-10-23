import RenderBase from '../RenderBase.js';
import { ImageTypeName } from '../Types.js';
import WebglRender from './WebglRender.js';
import CanvasRender from './CanvasRender.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class ImageData extends RenderBase {
    constructor(parent, frame) {
        super(parent, ImageTypeName);

        this._crop = ResetCropObject();
        this.setFrame(frame);
    }

    get width() {
        return this._width;
    }

    set width(value) {
    }

    get height() {
        return this._height;
    }

    set height(value) {
    }

    setFrame(frame) {
        if (arguments.length > 0 && !IsPlainObject(frame)) {
            frame = this.parent.texture.get(frame);
        }
        this.frame = frame;

        if (frame) {
            this._width = frame.realWidth;
            this._height = frame.realHeight;
        } else {
            this._width = 0;
            this._height = 0;
        }

        return this;
    }

    setFlipX(flipX) {
        if (flipX === undefined) {
            flipX = true;
        }
        this.flipX = flipX;
        return this;
    }

    setFlipY(flipY) {
        if (flipY === undefined) {
            flipY = true;
        }
        this.flipY = flipY;
        return this;
    }

    resetFlip() {
        this.flipX = false;
        this.flipY = false;
        return this;
    }

    get tint() {
        if (this._tint === undefined) {
            return this.parent.tint;
        } else {
            return this._tint;
        }
    }

    set tint(value) {
        this._tint = value;
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

    resetTint() {
        this.tint = undefined;
        this.tintFill = undefined;
        return this;
    }

    get tintFill() {
        if (this._tintFill === undefined) {
            return this.parent.tintFill;
        } else {
            return this._tintFill;
        }
    }

    set tintFill(value) {
        this._tintFill = value;
    }

    setCrop(x, y, width, height) {
        if (x === undefined) {
            this.isCropped = false;
            return this;
        }

        if (!this.frame) {
            return this;
        }

        if ((x === 0) && (y === 0) && (width === this._width) && (height === this._height)) {
            this.isCropped = false;
            return this;
        }

        this.frame.setCropUVs(this._crop, x, y, width, height, this.flipX, this.flipY);
        this.isCropped = true;

        return this;
    }

    reset() {
        super.reset();

        this
            .resetFlip()
            .resetTint()
            .setFrame()
            .setCrop();

        return this;
    }

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        // Size of Image is equal to frame size,
        // Move width, height properties to displayWidth,displayHeight
        if (o.hasOwnProperty('width')) {
            o.displayWidth = o.width;
            delete o.width;
        }
        if (o.hasOwnProperty('height')) {
            o.displayHeight = o.height;
            delete o.height;
        }

        if (o.hasOwnProperty('frame')) {
            this.setFrame(o.frame);
        }

        super.modifyPorperties(o);

        if (o.hasOwnProperty('flipX')) {
            this.setFlipX(o.flipX);
        }
        if (o.hasOwnProperty('flipY')) {
            this.setFlipY(o.flipY);
        }

        if (o.hasOwnProperty('tint')) {
            this.setTint(o.tint);
        }

        if (o.hasOwnProperty('tintFill')) {
            this.setTintFill(o.tintFill);
        }

        return this;
    }

}

var ResetCropObject = function (out) {
    if (out === undefined) {
        out = {};
    }
    out.u0 = 0; out.v0 = 0; out.u1 = 0; out.v1 = 0;
    out.x = 0; out.y = 0; out.width = 0; out.height = 0;
    out.flipX = false; out.flipY = false;
    out.cx = 0; out.cy = 0; out.cw = 0, out.ch = 0;
    return out;
}

var methods = {
    webglRender: WebglRender,
    canvasRender: CanvasRender,
}

Object.assign(
    ImageData.prototype,
    methods
);

export default ImageData;