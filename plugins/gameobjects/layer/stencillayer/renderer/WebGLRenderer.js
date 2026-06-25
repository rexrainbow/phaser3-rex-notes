import { BlendModes as PhaserBlendModes } from 'phaser';
const SKIP_CHECK_BLEND_MODE = PhaserBlendModes.SKIP_CHECK;

var WebGLRenderer = function (renderer, layer, drawingContext, parentMatrix, renderStep, displayList, displayListIndex) {
    var children = layer.list;
    var childCount = children.length;

    if (childCount === 0) {
        return;
    }

    var currentContext = drawingContext;
    var camera = currentContext.camera;

    layer.depthSort();

    var layerHasBlendMode = (layer.blendMode !== SKIP_CHECK_BLEND_MODE);
    var useStencilMask = (layer.stencilGameObjects.length > 0);

    if (!layerHasBlendMode && currentContext.blendMode !== 0) {
        //  If Layer is SKIP_TEST then set blend mode to be Normal
        currentContext = currentContext.getClone();
        currentContext.setBlendMode(0);
        currentContext.use();
    }

    var alpha = layer.alpha;

    if (useStencilMask) {
        PushStencilMask(renderer, layer.stencilGameObjects, layer.stencilInvert, currentContext);
    }

    for (var i = 0; i < childCount; i++) {
        var child = children[i];

        if (!child.willRender(camera)) {
            continue;
        }

        var childAlphaTopLeft;
        var childAlphaTopRight;
        var childAlphaBottomLeft;
        var childAlphaBottomRight;

        if (child.alphaTopLeft !== undefined) {
            childAlphaTopLeft = child.alphaTopLeft;
            childAlphaTopRight = child.alphaTopRight;
            childAlphaBottomLeft = child.alphaBottomLeft;
            childAlphaBottomRight = child.alphaBottomRight;
        }
        else {
            var childAlpha = child.alpha;

            childAlphaTopLeft = childAlpha;
            childAlphaTopRight = childAlpha;
            childAlphaBottomLeft = childAlpha;
            childAlphaBottomRight = childAlpha;
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

        child.setAlpha(childAlphaTopLeft * alpha, childAlphaTopRight * alpha, childAlphaBottomLeft * alpha, childAlphaBottomRight * alpha);

        //  Render
        child.renderWebGLStep(renderer, child, currentContext, undefined, undefined, children, i);

        //  Restore original values
        child.setAlpha(childAlphaTopLeft, childAlphaTopRight, childAlphaBottomLeft, childAlphaBottomRight);
    }

    if (useStencilMask) {
        PopStencilMask(renderer, layer.stencilGameObjects, layer.stencilInvert, currentContext);
    }

    // Release any remaining context.
    if (currentContext !== drawingContext) {
        currentContext.release();
    }
}


var PushStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext) {
    RenderStencilMask(renderer, stencilGameObjects, stencilInvert, drawingContext, true);
};

var PopStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext) {
    RenderStencilMask(renderer, stencilGameObjects, stencilInvert, drawingContext, false);
};

var RenderStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext, push) {
    var gl = renderer.gl;
    var opIncr = gl.INCR_WRAP;
    var opDecr = gl.DECR_WRAP;
    var fillOp;
    var maskOp;
    var maskFunc;
    var maskRef;

    if (stencilInvert) {
        fillOp = (push) ? opIncr : opDecr;
        maskOp = (push) ? opDecr : opIncr;
        maskFunc = gl.EQUAL;
        maskRef = (push) ? 1 : 0xFF;

    } else {
        maskOp = (push) ? opIncr : opDecr;
        maskFunc = gl.ALWAYS;
        maskRef = 0;
    }

    var currentContext = drawingContext.getClone();

    currentContext.setAlphaStrategy(renderer.config.stencilAlphaStrategy);
    currentContext.setColorWritemask(false, false, false, false);

    if (stencilInvert) {
        currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, fillOp, fillOp, fillOp, 0, 0xFF);
        currentContext.use();

        renderer.renderNodes.getNode('FillCamera').run(currentContext, 0xff000000, drawingContext.useCanvas);

        currentContext = currentContext.getClone();
    }

    currentContext.setStencil(true, maskFunc, maskRef, 0xFF, gl.KEEP, gl.KEEP, maskOp, 0, 0xFF);
    currentContext.use();

    for (var i = 0, cnt = stencilGameObjects.length; i < cnt; i++) {
        stencilGameObjects[i].renderWebGLStep(renderer, stencilGameObjects[i], currentContext);
    }

    currentContext.release();
};

export default WebGLRenderer;
