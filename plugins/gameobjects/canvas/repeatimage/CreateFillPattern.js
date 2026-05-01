import CopyFrameToCanvas from '../../../utils/texture/CopyFrameToCanvas.js';

import { Display as PhaserDisplay } from 'phaser';
const CanvasPool = PhaserDisplay.Canvas.CanvasPool;

var CreateFillPattern = function (textureFrame) {
    var canvas = CanvasPool.create(this);
    CopyFrameToCanvas(textureFrame, canvas);
    var fillPattern = this.context.createPattern(canvas, 'repeat');
    CanvasPool.remove(canvas);
    return fillPattern;
}

export default CreateFillPattern;