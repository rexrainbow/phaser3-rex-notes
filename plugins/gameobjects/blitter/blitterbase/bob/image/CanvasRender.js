var CanvasRender = function (ctx, dx, dy, roundPixels) {
    var frame = this.frame;
    if (!frame) {
        return;
    }

    ctx.save();

    var width = this._width,
        height = this._height;
    var displayOriginX = width * this.originX,
        displayOriginY = height * this.originY;
    var x = this.x - displayOriginX,
        y = this.y - displayOriginY;

    var frameX, frameY;
    var frameWidth, frameHeight;
    if (this.isCropped) {
        var crop = this._crop;

        if (crop.flipX !== this.flipX || crop.flipY !== this.flipY) {
            frame.updateCropUVs(crop, this.flipX, this.flipY);
        }

        frameWidth = crop.cw;
        frameHeight = crop.ch;

        frameX = crop.cx;
        frameY = crop.cy;
    } else {
        frameWidth = frame.cutWidth;
        frameHeight = frame.cutHeight;

        frameX = frame.cutX;
        frameY = frame.cutY;
    }

    var flipX = 1;
    var flipY = 1;

    if (this.flipX) {
        x += width;
        flipX = -1;
    }
    if (this.flipY) {
        y += height;
        flipY = -1;
    }

    var res = frame.source.resolution;
    var fw = frameWidth / res;
    var fh = frameHeight / res;

    if (roundPixels) {
        x = Math.floor(x + 0.5);
        y = Math.floor(y + 0.5);

        fw += 0.5;
        fh += 0.5;
    }

    ctx.translate(x, y);

    ctx.rotate(this.rotation);

    ctx.scale(this.scaleX * flipX, this.scaleY * flipY);

    ctx.drawImage(
        frame.source.image,
        frameX, frameY, frameWidth, frameHeight,
        0, 0, fw, fh,
    );

    ctx.restore();

}
export default CanvasRender;