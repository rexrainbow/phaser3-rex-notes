const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

var FrameMatrix = new TransformMatrix();

var WebglRender = function (pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
    var frame = this.frame;
    if (!frame) {
        return;
    }

    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - dx,
        y = this.y - dy;

    var u0, v0, u1, v1;
    var frameX, frameY;
    var frameWidth, frameHeight;
    if (this.isCropped) {
        var crop = this._crop;

        if (crop.flipX !== this.flipX || crop.flipY !== this.flipY) {
            frame.updateCropUVs(crop, this.flipX, this.flipY);
        }

        u0 = crop.u0;
        v0 = crop.v0;
        u1 = crop.u1;
        v1 = crop.v1;

        frameWidth = crop.width;
        frameHeight = crop.height;

        frameX = crop.x;
        frameY = crop.y;

    } else {
        u0 = this.frame.u0;
        v0 = this.frame.v0;
        u1 = this.frame.u1;
        v1 = this.frame.v1;

        frameWidth = width;
        frameHeight = height;

        frameX = 0;
        frameY = 0;
    }

    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
        x += width - (displayOriginX * 2);
        flipX = -1;
    }
    if (this.flipY) {
        y += height - (displayOriginY * 2);
        flipY = -1;
    }

    FrameMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
    calcMatrix.multiply(FrameMatrix, FrameMatrix);

    var tx = -displayOriginX + frameX;
    var ty = -displayOriginY + frameY;
    var tw = tx + frameWidth;
    var th = ty + frameHeight;

    var quad = FrameMatrix.setQuad(tx, ty, tw, th, roundPixels);

    var tint = GetTint(this.tint, this.alpha * alpha);

    pipeline.batchQuad(
        this.parent,
        quad[0], quad[1], quad[2], quad[3], quad[4], quad[5], quad[6], quad[7],
        u0, v0,
        u1, v1,
        tint, tint, tint, tint,
        this.tintFill,
        texture,
        textureUnit
    );
}

export default WebglRender;