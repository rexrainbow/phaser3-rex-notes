import RenderBase from '../renderbase/RenderBase.js';
import { ImageTypeName } from '../Types.js';
import DrawFrameToCanvas from '../../../../../utils/texture/DrawFrameToCanvas.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;

class ImageData extends RenderBase {
    constructor(
        parent,
        key, frame
    ) {
        super(parent, ImageTypeName);
        this.setTexture(key, frame);
        this.color = undefined;
    }

    get frameWidth() {
        return (this.frameObj) ? this.frameObj.cutWidth : 0;
    }

    get frameHeight() {
        return (this.frameObj) ? this.frameObj.cutHeight : 0;
    }

    get offsetY() {
        return -this.height;
    }

    set offsetY(value) { }

    get key() {
        return this._key;
    }

    set key(value) {
        this.setDirty(this._key != value);
        this._key = value;
    }

    get frame() {
        return this._frame;
    }

    set frame(value) {
        this.setDirty(this._frame != value);
        this._frame = value;
    }

    setTexture(key, frame) {
        this.key = key;
        this.frame = frame;

        this.frameObj = this.scene.sys.textures.getFrame(key, frame);
        return this;
    }

    get width() {
        return this.frameWidth * this.scaleX;
    }

    set width(value) {
        this.setDirty(this.width !== value);
        this.scaleX = value / this.frameWidth;
    }

    get height() {
        return this.frameHeight * this.scaleY;
    }

    set height(value) {
        this.setDirty(this.height !== value);
        this.scaleY = value / this.frameHeight;
    }

    setHeight(height, keepAspectRatio) {
        if (keepAspectRatio === undefined) {
            keepAspectRatio = false;
        }
        this.height = height;

        if (keepAspectRatio) {
            this.scaleX = this.scaleY;
        }
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    modifyPorperties(o) {
        if (o.hasOwnProperty('color')) {
            this.setColor(o.color);
        }

        super.modifyPorperties(o);
        return this;
    }

    renderContent() {
        DrawFrameToCanvas(
            this.frameObj, this.canvas,
            0, 0, this.frameWidth, this.frameHeight,
            this.color, false
        );

    }

    get drawTLX() { return -this.leftSpace; }
    get drawTLY() { return 0; }
    get drawBLX() { return -this.leftSpace; }
    get drawBLY() { return this.frameHeight; }
    get drawTRX() { return this.frameWidth + this.rightSpace; }
    get drawTRY() { return 0; }
    get drawBRX() { return this.frameWidth + this.rightSpace; }
    get drawBRY() { return this.frameHeight; }
}

export default ImageData;