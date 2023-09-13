import { GetDisplayWidth, GetDisplayHeight } from '../../../utils/size/GetDisplaySize.js';

var Paste = function (frameName, gameObject) {
    var drawCallback;
    if (this.useDynamicTexture) {
        var srcWidth = GetDisplayWidth(gameObject),
            srcHeight = GetDisplayHeight(gameObject);

        var scale;
        if ((srcWidth <= this.cellWidth) && (srcHeight <= this.cellHeight)) {
            scale = 1;
        } else {
            // Scale down and keep ratio
            scale = Math.max((srcWidth / this.cellWidth), (srcHeight / this.cellHeight));
        }

        drawCallback = function (texture, frameSize) {
            var originXSave = gameObject.originX,
                originYSave = gameObject.originY;
            var scaleXSave = gameObject.scaleX,
                scaleYSave = gameObject.scaleY;

            gameObject
                .setOrigin(0, 0)
                .setScale(scale, scale);

            texture.draw(gameObject);

            gameObject
                .setOrigin(originXSave, originYSave)
                .setScale(scaleXSave, scaleYSave);

            frameSize.width = srcWidth / scale;
            frameSize.height = srcHeight / scale;
        }

    } else {
        var srcCanvas = gameObject.canvas;
        if (!srcCanvas) {
            console.warn(`Can't get canvas of game object.`);
            return this;
        }

        var srcWidth = srcCanvas.width,
            srcHeight = srcCanvas.height;
        var dWidth, dHeight;
        if ((srcWidth <= this.cellWidth) && (srcHeight <= this.cellHeight)) {
            dWidth = srcWidth;
            dHeight = srcHeight;
        } else {
            // Scale down and keep ratio
            var scale = Math.max((srcWidth / this.cellWidth), (srcHeight / this.cellHeight));
            dWidth = srcWidth / scale;
            dHeight = srcHeight / scale;
        }

        drawCallback = function (canvas, context, frameSize) {
            context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);

            frameSize.width = dWidth;
            frameSize.height = dHeight;
        }
    }

    this.draw(frameName, drawCallback);

    return this;
}

export default Paste;