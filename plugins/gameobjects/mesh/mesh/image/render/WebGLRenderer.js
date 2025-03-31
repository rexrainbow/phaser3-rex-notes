const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

var renderOptions = {
    multiTexturing: false,
    smoothPixelArt: false
};

var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    var camera = drawingContext.camera;
    camera.addToRenderList(src);

    if (src.skipRender()) {
        return;
    }

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

    if (src.dirty) {
        src.updateBuffers();
    }

    // Get smooth pixel art option.
    var smoothPixelArt;
    var srcTexture = src.texture;
    if (srcTexture && srcTexture.smoothPixelArt !== null) {
        smoothPixelArt = srcTexture.smoothPixelArt;
    }
    else {
        smoothPixelArt = src.scene.sys.game.config.smoothPixelArt;
    }
    renderOptions.smoothPixelArt = smoothPixelArt;

    (src.customRenderNodes.BatchHandler || src.defaultRenderNodes.BatchHandler).batchTriangles(
        drawingContext,
        src,
        calcMatrix,
        src.texture.source[0].glTexture,
        src.vertexBuffer,
        src.uvBuffer,
        src.colorBuffer,
        src.alphaBuffer,
        src.alpha,
        src.tintFill,
        renderOptions,
        src.debugCallback
    );
};

export default WebGLRenderer;