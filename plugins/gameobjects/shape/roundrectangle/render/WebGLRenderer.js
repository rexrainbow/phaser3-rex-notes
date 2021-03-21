import FillPathWebGL from '../../utils/render/FillPathWebGL.js';
import StrokePathWebGL from '../../utils/render/StrokePathWebGL.js';
import GetCalcMatrix from '../../../utils/GetCalcMatrix.js';

var PolygonWebGLRenderer = function (renderer, src, camera, parentMatrix) {
    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(this.pipeline);

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = camera.alpha * src.alpha;

    if (src.isFilled) {
        FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
    }

    if (src.isStroked) {
        StrokePathWebGL(pipeline, src, alpha, dx, dy);
    }
};

export default PolygonWebGLRenderer;