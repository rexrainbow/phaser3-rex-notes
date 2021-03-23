import GetCalcMatrix from '../../../utils/GetCalcMatrix.js';

var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    camera.addToRenderList(src);

    var pipeline = renderer.pipelines.set(this.pipeline);

    var result = GetCalcMatrix(src, camera, parentMatrix);

    var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = camera.alpha * src.alpha;

    var shapes = src.geom;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shapes[i].webglRender(renderer, calcMatrix, dx, dy, alpha);
    }

};

export default WebGLRenderer;