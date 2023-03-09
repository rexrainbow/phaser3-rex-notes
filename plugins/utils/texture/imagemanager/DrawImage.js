var DrawImage = function (key, context, x, y, autoRound) {
    var imgData = this.get(key);
    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

    x += imgData.left - (imgData.originX * frame.cutWidth);
    y += imgData.y - (imgData.originY * frame.cutHeight);
    if (autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    context.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
        x, y, imgData.width, imgData.height
    );
}

export default DrawImage;