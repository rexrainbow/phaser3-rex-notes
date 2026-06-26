import { BlendModes as PhaserBlendModes } from 'phaser';
const SKIP_CHECK_BLEND_MODE = PhaserBlendModes.SKIP_CHECK;

import { PushStencilMask, PopStencilMask } from '../../stencilmaskbase/RenderStencilMask.js';

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
    var useStencilMask = (layer.maskGameObjects.length > 0);

    if (!layerHasBlendMode && currentContext.blendMode !== 0) {
        //  If Layer is SKIP_TEST then set blend mode to be Normal
        currentContext = currentContext.getClone();
        currentContext.setBlendMode(0);
        currentContext.use();
    }

    var alpha = layer.alpha;

    if (useStencilMask) {
        PushStencilMask(renderer, layer.maskGameObjects, layer.stencilInvert, currentContext);
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
        PopStencilMask(renderer, layer.maskGameObjects, layer.stencilInvert, currentContext);
    }

    // Release any remaining context.
    if (currentContext !== drawingContext) {
        currentContext.release();
    }
};

export default WebGLRenderer;
