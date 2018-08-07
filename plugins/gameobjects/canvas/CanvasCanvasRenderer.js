// copy from Phaser.GameObjects.Text

const GameObject = Phaser.GameObjects.GameObject;

var CanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

export default CanvasRenderer;