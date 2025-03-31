const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;
const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
var tempMatrix = new TransformMatrix();

var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    var bobs = src.getRenderList();
    var camera = drawingContext.camera;

    if (bobs.length === 0 || alpha === 0) {
        //  Nothing to see, so abort early
        return;
    }

    var result = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas);
    var calcMatrix = tempMatrix.copyFrom(result.calc);

    var alpha = camera.alpha * src.alpha;
    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var customRenderNodes = src.customRenderNodes;
    var defaultRenderNodes = src.defaultRenderNodes;
    var Submitter = customRenderNodes.Submitter || defaultRenderNodes.Submitter;

    for (var i = 0, cnt = bobs.length; i < cnt; i++) {
        bobs[i].webglRender(Submitter, drawingContext, parentMatrix, calcMatrix, alpha, dx, dy);
    }
};

export default WebGLRenderer;