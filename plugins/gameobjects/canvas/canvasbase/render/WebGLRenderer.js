// copy from Phaser.GameObjects.Text
var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    if (src.dirty) {
        src.updateTexture();
        src.dirty = false;
    }

    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    drawingContext.camera.addToRenderList(src);

    var customRenderNodes = src.customRenderNodes;
    var defaultRenderNodes = src.defaultRenderNodes;

    (customRenderNodes.Submitter || defaultRenderNodes.Submitter).run(
        drawingContext,
        src,
        parentMatrix,
        0,
        customRenderNodes.Texturer || defaultRenderNodes.Texturer,
        customRenderNodes.Transformer || defaultRenderNodes.Transformer
    );
};

export default WebGLRenderer;