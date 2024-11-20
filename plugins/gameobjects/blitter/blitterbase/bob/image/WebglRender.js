const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

var tempMatrix = new TransformMatrix();
var tempTransformer = {
    quad: new Float32Array(8)
};
var tempTexturer = {};
var tempTinter = {};

var WebglRender = function (Submitter, drawingContext, parentMatrix, calcMatrix, alpha, dx, dy) {
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

    tempMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
    calcMatrix.multiply(tempMatrix, tempMatrix);

    var tx = -displayOriginX + frameX;
    var ty = -displayOriginY + frameY;
    var tw = tx + frameWidth;
    var th = ty + frameHeight;

    tempMatrix.setQuad(tx, ty, tw, th, false, tempTransformer.quad);

    tempTexturer.frame = frame;
    tempTexturer.uvSource = frame;    

    var tint = GetTint(this.tint, this.alpha * alpha);

    tempTinter.tintTopLeft = tint;
    tempTinter.tintBottomLeft = tint;
    tempTinter.tintTopRight = tint;
    tempTinter.tintBottomRight = tint;

    Submitter.run(
        drawingContext,
        this.parent,
        parentMatrix,
        0,
        tempTexturer,
        tempTransformer,
        tempTinter,

        // Optional normal map parameters.
        undefined,
        0
    );
}

export default WebglRender;