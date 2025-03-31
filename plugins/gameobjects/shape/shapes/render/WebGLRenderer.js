const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    src.updateData();

    var camera = drawingContext.camera;
    camera.addToRenderList(src);

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = src.alpha;

    var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

    var shapes = src.geom,
        shape;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shape = shapes[i];
        if (shape.visible) {
            shape.webglRender(drawingContext, submitter, calcMatrix, src, alpha, dx, dy);
        }
    }
};

export default WebGLRenderer;