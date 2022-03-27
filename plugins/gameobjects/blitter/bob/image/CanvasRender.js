var CanvasRender = function (ctx, dx, dy, roundPixels) {

    ctx.save();

    var x = this._displayOriginX,
        y = this._displayOriginY;

    if (roundPixels) {
        x = Math.round(x);
        y = Math.round(y);
    }

    ctx.translate(x, y);

    ctx.rotate(this.rotation);

    ctx.scale(this.scaleX, this.scaleY);

    var frame = this.frame;

    ctx.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY,
        frame.cutWidth, frame.cutHeight,
    );

    ctx.restore();

}
export default CanvasRender;