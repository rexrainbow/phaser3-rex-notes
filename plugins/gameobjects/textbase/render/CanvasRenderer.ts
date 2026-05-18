var CanvasRenderer = function(renderer?: any, src?: any, camera?: any, parentMatrix?: any) {
    if ((src.width === 0) || (src.height === 0)) {
        return;
    }

    camera.addToRenderList(src);

    renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

export default CanvasRenderer;