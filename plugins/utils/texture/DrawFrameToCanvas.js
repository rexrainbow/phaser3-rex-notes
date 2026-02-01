const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const TintModes = Phaser.TintModes;

var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound, tintMode) {
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

    if (tintMode === true) {
        tintMode = TintModes.FILL;
    } else if (tintMode === false) {
        tintMode = undefined;
    }

    if (color === undefined || color === null || typeof tintMode !== 'number') {
        // Draw image directly
        context.drawImage(
            frame.source.image,
            frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
            x, y, width, height
        );

    } else {
        // Apply effect
        // Draw image at tempCanvas

        // Get tempCanvas
        var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);

        var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

        var sourceImage = frame.source.image;
        var sourceX = frame.cutX;
        var sourceY = frame.cutY;
        var sourceWidth = frame.cutWidth;
        var sourceHeight = frame.cutHeight;

        tempContext.drawImage(
            sourceImage,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, width, height
        );

        if (tintMode === TintModes.FILL) {
            tempContext.globalCompositeOperation = 'source-in';
            tempContext.fillStyle = color;
            tempContext.fillRect(0, 0, width, height);
        } else {
            var compositeOperation = 'source-in';

            switch (tintMode) {
                case TintModes.MULTIPLY:
                    compositeOperation = 'multiply';
                    break;
                case TintModes.ADD:
                    compositeOperation = 'lighter';
                    break;
                case TintModes.SCREEN:
                    compositeOperation = 'screen';
                    break;
                case TintModes.OVERLAY:
                    compositeOperation = 'overlay';
                    break;
                case TintModes.HARD_LIGHT:
                    compositeOperation = 'hard-light';
                    break;
            }

            if (compositeOperation === 'source-in') {
                tempContext.globalCompositeOperation = 'source-in';
                tempContext.fillStyle = color;
                tempContext.fillRect(0, 0, width, height);
            } else {
                tempContext.globalCompositeOperation = compositeOperation;
                tempContext.fillStyle = color;
                tempContext.fillRect(0, 0, width, height);
                tempContext.globalCompositeOperation = 'destination-in';
                tempContext.drawImage(
                    sourceImage,
                    sourceX, sourceY, sourceWidth, sourceHeight,
                    0, 0, width, height
                );
            }
        }

        // Draw tempCanvas at context
        context.drawImage(
            tempCanvas,
            0, 0, width, height,
            x, y, width, height
        );

        // Release tempCanvas
        CanvasPool.remove(tempCanvas);

    }

}

export default DrawFrameToCanvas;
