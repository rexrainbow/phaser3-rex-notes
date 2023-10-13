const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound) {
    if (x === undefined) { x = 0; }
    if (y === undefined) { y = 0; }
    if (width === undefined) { width = frame.cutWidth; }
    if (height === undefined) { height = frame.cutHeight; }
    if (autoRound === undefined) { autoRound = false };

    if (autoRound) {
        x = Math.round(x);
        y = Math.round(y);
    }

    var context = canvas.getContext('2d', { willReadFrequently: true });

    if (color) {
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

export default DrawFrameToCanvas;