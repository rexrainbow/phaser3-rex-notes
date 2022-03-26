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
        return this;
    }

    get height() {
        return this.frame.height;
    }

    get width() {
        return this.frame.width;
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
    webglRender(pipeline, calcMatrix, alpha, dx, dy, textureUnit) {
        var x, y,
            w = this.width, h = this.height,
            ws = this.scaleX, hs = this.scaleY,
            rotation = this.rotation;

        x = (this.x * ws) - dx;
        y = (this.y * hs) - dy;

        FrameMatrix.applyITRS(x, y, rotation, ws, hs);
        calcMatrix.multiply(FrameMatrix, FrameMatrix);

        var tx0 = FrameMatrix.e;
        var ty0 = FrameMatrix.f;
        var tx1 = h * FrameMatrix.c + FrameMatrix.e;
        var ty1 = h * FrameMatrix.d + FrameMatrix.f;
        var tx2 = w * FrameMatrix.a + h * FrameMatrix.c + FrameMatrix.e;
        var ty2 = w * FrameMatrix.b + h * FrameMatrix.d + FrameMatrix.f;
        var tx3 = w * FrameMatrix.a + FrameMatrix.e;
        var ty3 = w * FrameMatrix.b + FrameMatrix.f;

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