const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var DrawImage = function (key, context, x, y, color, autoRound) {
    var imgData = this.get(key);
    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

    var width = imgData.width,
        height = imgData.height;
    x += imgData.left - (imgData.originX * width);
    y += imgData.y - (imgData.originY * height);
    if (autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    if (imgData.tintFill && color) {
        // Draw image at tempCanvas

        // Get tempCanvas
        var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);

        var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

        tempContext.drawImage(
            frame.source.image,
            frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
            0, 0, width, height
        );

        // Tint-fill
        tempContext.globalCompositeOperation = 'source-in';
        tempContext.fillStyle = color;
        tempContext.fillRect(0, 0, width, height);

        // Draw tempCanvas at context
        context.drawImage(
            tempCanvas,
            0, 0, width, height,
            x, y, width, height
        );

        // Release tempCanvas
        CanvasPool.remove(tempCanvas);

    } else {

        context.drawImage(
            frame.source.image,
            frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
            x, y, width, height
        );
    }
}

export default DrawImage;