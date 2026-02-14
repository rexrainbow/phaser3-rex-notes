var CanvasRenderer = function (renderer, container, camera) {
    camera.addToRenderList(container);

    if (!container.layerRendererEnable) {
        return;
    }

    // Won't apply container's alpha to children

    var rendererLayer = container.rendererLayer;

    if (!rendererLayer) {
        return;
    }

    var children = rendererLayer.list;

    if (children.length === 0) {
        return;
    }

    rendererLayer.depthSort();

    var layerHasBlendMode = (container.blendMode !== -1);

    if (!layerHasBlendMode) {
        //  If Layer is SKIP_TEST then set blend mode to be Normal
        renderer.setBlendMode(0);
    }

    if (container.mask) {
        container.mask.preRenderCanvas(renderer, null, camera);
    }

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (!child.willRender(camera)) {
            continue;
        }

        if (!layerHasBlendMode && child.blendMode !== renderer.currentBlendMode) {
            //  If Layer doesn't have its own blend mode, then a child can have one
            renderer.setBlendMode(child.blendMode);
        }

        //  Render
        child.renderCanvas(renderer, child, camera);
    }

    if (container.mask) {
        container.mask.postRenderCanvas(renderer);
    }
};

export default CanvasRenderer;
