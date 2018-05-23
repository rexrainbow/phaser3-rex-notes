// copy from Phaser.GameObjects.Text

const GameObject = Phaser.GameObjects.GameObject;

var WebGLRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id))) {
        return;
    }

    if (src.dirty) {
        src.canvasTexture = renderer.canvasToTexture(src.canvas, src.canvasTexture, true, src.scaleMode);
        src.dirty = false;
    }

    this.pipeline.batchText(this, camera, parentMatrix);
};

export default WebGLRenderer;