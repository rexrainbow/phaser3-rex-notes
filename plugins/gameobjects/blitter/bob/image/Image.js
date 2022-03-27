import RenderBase from '../RenderBase.js';
import { ImageTypeName } from '../Types.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
const Utils = Phaser.Renderer.WebGL.Utils;

class ImageData extends RenderBase {
    constructor(parent, frame) {
        super(parent, ImageTypeName);

        this.setFrame(frame);
    }

    get texture() {
        return this.parent.texture;
    }

    setFrame(frame) {
        if (arguments.length > 0 && !IsPlainObject(frame)) {
            frame = this.texture.get(frame);
        }
        this.frame = frame;
        this.width = (frame) ? frame.width : 0;
        this.height = (frame) ? frame.height : 0;
        return this;
    }

    reset() {
        super.reset()
        this
            .setColor(0xffffff)
            .setTintEffect()
            .setFrame();
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

    modifyPorperties(o) {
        if (!o) {
            return this;
        }

        super.modifyPorperties(o);

        if (o.hasOwnProperty('frame')) {
            this.setFrame(o.frame);
        }
        if (o.hasOwnProperty('color')) {
            this.setColor(o.color);
        }
        if (o.hasOwnProperty('tintEffect')) {
            this.setTintEffect(o.tintEffect);
        }

        return this;
    }

    // Override
    webglRender(pipeline, calcMatrix, alpha, dx, dy, textureUnit, roundPixels) {
        FrameMatrix.applyITRS(this.x - dx, this.y - dy, this.rotation, this.scaleX, this.scaleY);
        calcMatrix.multiply(FrameMatrix, FrameMatrix);

        var x = - this._displayOriginX;
        var y = - this._displayOriginY;
        var xw = x + this.width;
        var yh = y + this.height;

        var tx0 = FrameMatrix.getXRound(x, y, roundPixels);
        var tx1 = FrameMatrix.getXRound(x, yh, roundPixels);
        var tx2 = FrameMatrix.getXRound(xw, yh, roundPixels);
        var tx3 = FrameMatrix.getXRound(xw, y, roundPixels);

        var ty0 = FrameMatrix.getYRound(x, y, roundPixels);
        var ty1 = FrameMatrix.getYRound(x, yh, roundPixels);
        var ty2 = FrameMatrix.getYRound(xw, yh, roundPixels);
        var ty3 = FrameMatrix.getYRound(xw, y, roundPixels);

        var u0 = this.frame.u0;
        var v0 = this.frame.v0;
        var u1 = this.frame.u1;
        var v1 = this.frame.v1;

        var tint = Utils.getTintAppendFloatAlpha(this.color, this.alpha * alpha);

        pipeline.batchQuad(
            this.parent,
            tx0, ty0,
            tx1, ty1,
            tx2, ty2,
            tx3, ty3,
            u0, v0,
            u1, v1,
            tint, tint, tint, tint,
            this.tintEffect,
            this.frame.glTexture,
            textureUnit
        );
    }
    // Override
    canvasRender(ctx, dx, dy) {
    }
}

var FrameMatrix = new TransformMatrix();

export default ImageData;