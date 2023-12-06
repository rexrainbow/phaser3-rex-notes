import CopyFrameToCanvas from '../../../utils/texture/CopyFrameToCanvas.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;

var CreateFillPattern = function (textureFrame) {
    var canvas = CanvasPool.create(this);
    CopyFrameToCanvas(textureFrame, canvas);
    var fillPattern = this.context.createPattern(canvas, 'repeat');
    CanvasPool.remove(canvas);
    return fillPattern;
}

export default CreateFillPattern;