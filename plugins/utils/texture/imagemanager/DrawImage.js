import DrawFrameToCanvas from '../DrawFrameToCanvas.js';

var DrawImage = function (key, context, x, y, color, autoRound) {
    var imgData = this.get(key);
    if (!imgData) {
        // Invalid key
        return;
    }

    var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

    var width = imgData.width,
        height = imgData.height;
    x += imgData.left - (imgData.originX * width);
    y += imgData.y - (imgData.originY * height);

    if (!imgData.tintFill) {
        color = undefined;
    }

    DrawFrameToCanvas(
        frame, context.canvas,
        x, y, width, height,
        color, autoRound
    );
}

export default DrawImage;