var DrawImage = function (key, context, x, y, autoRound) {
    var imgData = this.get(key);

    x += imgData.left;
    y += imgData.y;
    if (autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

    context.drawImage(
        frame.source.image,
        frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
        x, y, imgData.width, imgData.height
    );
}

export default DrawImage;