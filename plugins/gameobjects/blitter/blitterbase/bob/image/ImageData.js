import RenderBase from '../RenderBase.js';
import { ImageTypeName } from '../Types.js';
import WebglRender from './WebglRender.js';
import CanvasRender from './CanvasRender.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class ImageData extends RenderBase {
    constructor(parent, frame) {
        super(parent, ImageTypeName);

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
        this._width = (frame) ? frame.width : 0;
        this._height = (frame) ? frame.height : 0;
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

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value
    }

    setColor(value) {
        this.color = value;
        return this;
    }

    setTintEffect(value) {
        if (value === undefined) {
            value = 0;
        }
        // 1: Solid color + texture alpha
        // 2: Solid color, no texture
        this.tintEffect = value;
        return this;
    }

    reset() {
        super.reset();

        this
            .resetFlip()
            .setColor(0xffffff)
            .setTintEffect()
            .setFrame();

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

        if (o.hasOwnProperty('color')) {
            this.setColor(o.color);
        }

        if (o.hasOwnProperty('tintEffect')) {
            this.setTintEffect(o.tintEffect);
        }

        return this;
    }

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