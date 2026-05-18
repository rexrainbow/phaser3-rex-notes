import FillPathWebGL from '../../render/FillPathWebGL';
import StrokePathWebGL from '../../render/StrokePathWebGL';

import { GameObjects as PhaserGameObjects } from 'phaser';
const GetCalcMatrix = PhaserGameObjects.GetCalcMatrix;

var PolygonWebGLRenderer = function(renderer?: any, src?: any, drawingContext?: any, parentMatrix?: any) {
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    var camera = drawingContext.camera;
    camera.addToRenderList(src);

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = src.alpha;

    var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

    if (src.isFilled) {
        FillPathWebGL(drawingContext, submitter, calcMatrix, src, src, alpha, dx, dy);
    }

    if (src.isStroked) {
        StrokePathWebGL(drawingContext, submitter, calcMatrix, src, src, alpha, dx, dy);
    }
};

export default PolygonWebGLRenderer;