// copy from Phaser.GameObjects.Text

const Utils = Phaser.Renderer.WebGL.Utils;

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (src.dirty) {
        src.updateTexture();
        src.dirty = false;
    }

    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    var frame = src.frame;
    var width = frame.width;
    var height = frame.height;
    var getTint = Utils.getTintAppendFloatAlpha;

    this.pipeline.batchTexture(
        src,
        frame.glTexture,
        width, height,
        src.x, src.y,
        width / src.resolution, height / src.resolution,
        src.scaleX, src.scaleY,
        src.rotation,
        src.flipX, src.flipY,
        src.scrollFactorX, src.scrollFactorY,
        src.displayOriginX, src.displayOriginY,
        0, 0, width, height,
        getTint(src._tintTL, camera.alpha * src._alphaTL),
        getTint(src._tintTR, camera.alpha * src._alphaTR),
        getTint(src._tintBL, camera.alpha * src._alphaBL),
        getTint(src._tintBR, camera.alpha * src._alphaBR),
        (src._isTinted && src.tintFill),
        0, 0,
        camera,
        parentMatrix
    );
};

export default WebGLRenderer;