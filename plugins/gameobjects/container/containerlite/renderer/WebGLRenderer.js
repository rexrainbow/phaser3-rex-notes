import { BlendModes as PhaserBlendModes } from 'phaser';
const SKIP_CHECK_BLEND_MODE = PhaserBlendModes.SKIP_CHECK;

var WebGLRenderer = function (renderer, container, drawingContext, parentMatrix, renderStep, displayList, displayListIndex) {
    var camera = drawingContext.camera;
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

    var currentContext = drawingContext;

    rendererLayer.depthSort();

    var layerHasBlendMode = (container.blendMode !== SKIP_CHECK_BLEND_MODE);
    var useStencilChildrenMask = container.childrenMaskGameObject && container.useStencilChildrenMask;

    if (!layerHasBlendMode && currentContext.blendMode !== 0) {
        //  If Layer is SKIP_CHECK then set blend mode to Normal
        currentContext = currentContext.getClone();
        currentContext.setBlendMode(0);
        currentContext.use();
    }

    if (useStencilChildrenMask) {
        RenderStencilMask(renderer, container.childrenMaskGameObject, currentContext, 'addLayer');
    }

    for (var i = 0; i < childCount; i++) {
        var child = children[i];

        if (!child.willRender(camera)) {
            continue;
        }

        if (
            !layerHasBlendMode &&
            child.blendMode !== currentContext.blendMode &&
            child.blendMode !== SKIP_CHECK_BLEND_MODE
        ) {
            //  If Layer doesn't have its own blend mode, then a child can have one
            currentContext = currentContext.getClone();
            currentContext.setBlendMode(child.blendMode);
            currentContext.use();
        }

        child.renderWebGLStep(renderer, child, currentContext, undefined, undefined, children, i);
    }

    if (useStencilChildrenMask) {
        RenderStencilMask(renderer, container.childrenMaskGameObject, currentContext, 'subtractLayer');
    }

    // Release any remaining context.
    if (currentContext !== drawingContext) {
        currentContext.release();
    }
};

var RenderStencilMask = function (renderer, maskGameObject, drawingContext, layerMode) {
    var gl = renderer.gl;
    var opIncr = gl.INCR_WRAP;
    var opDecr = gl.DECR_WRAP;
    var op = (layerMode === 'subtractLayer') ? opDecr : opIncr;

    var currentContext = drawingContext.getClone();

    currentContext.setAlphaStrategy(renderer.config.stencilAlphaStrategy);
    currentContext.setColorWritemask(false, false, false, false);
    currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, op, op, op, 0, 0xFF);
    currentContext.use();

    // Invert the stencil so the mask interior remains drawable under Phaser's zero-test rule.
    renderer.renderNodes.getNode('FillCamera').run(currentContext, 0xff000000, drawingContext.useCanvas);

    currentContext = currentContext.getClone();
    currentContext.use();

    op = (op === opIncr) ? opDecr : opIncr;
    currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, op, op, op, 0, 0xFF);

    maskGameObject.renderWebGLStep(renderer, maskGameObject, currentContext);

    currentContext.release();
};

export default WebGLRenderer;
