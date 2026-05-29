import { GameObjects as PhaserGameObjects } from 'phaser';
const GetCalcMatrix = PhaserGameObjects.GetCalcMatrix;

var renderOptions = {
    multiTexturing: true,
    lighting: null,
    smoothPixelArt: false
};

var lightingOptions = {
    normalGLTexture: null,
    normalMapRotation: 0,
    selfShadow: {
        enabled: false,
        penumbra: 0,
        diffuseFlatThreshold: 0
    }
};

var SetRenderOptions = function (renderer, src) {
    var srcTexture = src.texture;
    var sourceIndex = src.frame.sourceIndex;

    if (src.lighting) {
        var normalMap = srcTexture.dataSource[sourceIndex];
        if (!normalMap) {
            normalMap = renderer.normalTexture;
        } else {
            normalMap = normalMap.glTexture;
        }

        var normalMapRotation = src.rotation;
        if (src.parentContainer) {
            normalMapRotation = src.getWorldTransformMatrix().rotationNormalized;
        }

        var selfShadow = src.selfShadow;
        var selfShadowEnabled = selfShadow.enabled;
        if (selfShadowEnabled === null) {
            selfShadowEnabled = src.scene.sys.game.config.selfShadow;
        }

        lightingOptions.normalGLTexture = normalMap;
        lightingOptions.normalMapRotation = normalMapRotation;
        lightingOptions.selfShadow.enabled = selfShadowEnabled;
        lightingOptions.selfShadow.penumbra = selfShadow.penumbra;
        lightingOptions.selfShadow.diffuseFlatThreshold = selfShadow.diffuseFlatThreshold;

        renderOptions.lighting = lightingOptions;
    } else {
        renderOptions.lighting = null;
    }

    // Get smooth pixel art option.
    var smoothPixelArt;
    if (srcTexture && srcTexture.smoothPixelArt !== null) {
        smoothPixelArt = srcTexture.smoothPixelArt;
    }
    else {
        smoothPixelArt = src.scene.sys.game.config.smoothPixelArt;
    }
    renderOptions.smoothPixelArt = smoothPixelArt;
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

    SetRenderOptions(renderer, src);

    (src.customRenderNodes.BatchHandler || src.defaultRenderNodes.BatchHandler).batchTriangles(
        drawingContext,
        src,
        calcMatrix,
        src.frame.source.glTexture,
        src.vertexBuffer,
        src.uvBuffer,
        src.colorBuffer,
        src.alphaBuffer,
        src.alpha,
        src.tintMode,
        renderOptions,
        src.debugCallback
    );
};

export default WebGLRenderer;
