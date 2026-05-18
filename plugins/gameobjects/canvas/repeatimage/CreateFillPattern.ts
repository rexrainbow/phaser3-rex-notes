import CopyFrameToCanvas from '../../../utils/texture/CopyFrameToCanvas';

import { Display as PhaserDisplay } from 'phaser';
const CanvasPool = PhaserDisplay.Canvas.CanvasPool;

var CreateFillPattern = function(textureFrame?: any) {
    var canvas = CanvasPool.create(this);
    CopyFrameToCanvas(textureFrame, canvas);
    var fillPattern = this.context.createPattern(canvas, 'repeat');
    CanvasPool.remove(canvas);
    return fillPattern;
}

export default CreateFillPattern;