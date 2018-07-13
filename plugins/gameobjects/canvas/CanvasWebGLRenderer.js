// copy from Phaser.GameObjects.Text

const GameObject = Phaser.GameObjects.GameObject;
const Utils = Phaser.Renderer.WebGL.Utils;

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id))) {
        return;
    }

    if (src.dirty) {
        src.canvasTexture = renderer.canvasToTexture(src.canvas, src.canvasTexture, true, src.scaleMode);
        src.dirty = false;
    }

    var getTint = Utils.getTintAppendFloatAlpha;

    this.pipeline.batchTexture(
        src,
        src.canvasTexture,
        src.canvasTexture.width, src.canvasTexture.height,
        src.x, src.y,
        src.canvasTexture.width, src.canvasTexture.height,
        src.scaleX, src.scaleY,
        src.rotation,
        src.flipX, src.flipY,
        src.scrollFactorX, src.scrollFactorY,
        src.displayOriginX, src.displayOriginY,
        0, 0, src.canvasTexture.width, src.canvasTexture.height,
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