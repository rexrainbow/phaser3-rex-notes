import FillPathWebGL from '../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../utils/render/StrokePathWebGL.js';

const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var PolygonWebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
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