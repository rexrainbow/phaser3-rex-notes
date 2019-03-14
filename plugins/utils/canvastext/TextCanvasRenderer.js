var CanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix) {
    if (src.text !== '') {
        renderer.batchSprite(src, src.frame, camera, parentMatrix);
    }
};

export default CanvasRenderer;