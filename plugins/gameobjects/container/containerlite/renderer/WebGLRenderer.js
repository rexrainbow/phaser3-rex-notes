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
        PushStencilMask(renderer, container.childrenMaskGameObject, currentContext);
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
        PopStencilMask(renderer, container.childrenMaskGameObject, currentContext);
    }

    // Release any remaining context.
    if (currentContext !== drawingContext) {
        currentContext.release();
    }
};

var PushStencilMask = function (renderer, maskGameObject, drawingContext) {
    RenderStencilMask(renderer, maskGameObject, drawingContext, true);
};

var PopStencilMask = function (renderer, maskGameObject, drawingContext) {
    RenderStencilMask(renderer, maskGameObject, drawingContext, false);
};

var RenderStencilMask = function (renderer, maskGameObject, drawingContext, push) {
    var gl = renderer.gl;
    var opIncr = gl.INCR_WRAP;
    var opDecr = gl.DECR_WRAP;
    var fillOp = (push) ? opIncr : opDecr;
    var maskOp = (push) ? opDecr : opIncr;

    var currentContext = drawingContext.getClone();

    currentContext.setAlphaStrategy(renderer.config.stencilAlphaStrategy);
    currentContext.setColorWritemask(false, false, false, false);
    currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, fillOp, fillOp, fillOp, 0, 0xFF);
    currentContext.use();

    // Push adds a blocking layer everywhere, then removes it inside the mask.
    // Pop applies the inverse operations to restore the previous stencil state.
    renderer.renderNodes.getNode('FillCamera').run(currentContext, 0xff000000, drawingContext.useCanvas);

    currentContext = currentContext.getClone();
    currentContext.use();

    currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, maskOp, maskOp, maskOp, 0, 0xFF);

    maskGameObject.renderWebGLStep(renderer, maskGameObject, currentContext);

    currentContext.release();
};

export default WebGLRenderer;
