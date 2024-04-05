var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    camera.addToRenderList(src);

    renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

export default CanvasRenderer;
