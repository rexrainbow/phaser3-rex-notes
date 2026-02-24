var WebGLRenderer = function (renderer, container, camera) {
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
    var childCount = children.length;

    if (childCount === 0) {
        return;
    }

    rendererLayer.depthSort();

    renderer.pipelines.preBatch(container);

    var layerHasBlendMode = (container.blendMode !== -1);

    if (!layerHasBlendMode) {
        //  If Layer is SKIP_TEST then set blend mode to be Normal
        renderer.setBlendMode(0);
    }

    for (var i = 0; i < childCount; i++) {
        var child = children[i];

        if (!child.willRender(camera)) {
            continue;
        }

        if (!layerHasBlendMode && child.blendMode !== renderer.currentBlendMode) {
            //  If Layer doesn't have its own blend mode, then a child can have one
            renderer.setBlendMode(child.blendMode);
        }

        var mask = child.mask;

        if (mask) {
            mask.preRenderWebGL(renderer, child, camera);
        }

        var type = child.type;

        if (type !== renderer.currentType) {
            renderer.newType = true;
            renderer.currentType = type;
        }

        renderer.nextTypeMatch = (i < childCount - 1) ? (children[i + 1].type === renderer.currentType) : false;

        //  Render
        child.renderWebGL(renderer, child, camera);

        if (mask) {
            mask.postRenderWebGL(renderer, camera);
        }

        renderer.newType = false;
    }

    renderer.pipelines.postBatch(container);
};

export default WebGLRenderer;
