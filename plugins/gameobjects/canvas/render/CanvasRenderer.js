// copy from Phaser.GameObjects.Text

var CanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if ((src.width === 0) || (src.height === 0)) {
        return;
    }
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

export default CanvasRenderer;