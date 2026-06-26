import { BlendModes as PhaserBlendModes } from 'phaser';
const SKIP_CHECK_BLEND_MODE = PhaserBlendModes.SKIP_CHECK;

import { PushStencilMask, PopStencilMask } from '../../stencilmaskbase/RenderStencilMask.js';

var WebGLRenderer = function (renderer, container, drawingContext, parentMatrix, renderStep, displayList, displayListIndex) {
    var camera = drawingContext.camera;
    camera.addToRenderList(container);

    var children = container.list;
    var childCount = children.length;

    if (childCount === 0) {
        return;
    }

    var baseContext = drawingContext;
    var transformMatrix = container.localTransform;

    if (parentMatrix) {
        transformMatrix.loadIdentity();
        transformMatrix.multiply(parentMatrix);
        transformMatrix.translate(container.x, container.y);
        transformMatrix.rotate(container.rotation);
        transformMatrix.scale(container.scaleX, container.scaleY);
    } else {
        transformMatrix.applyITRS(container.x, container.y, container.rotation, container.scaleX, container.scaleY);
    }

    var containerHasBlendMode = (container.blendMode !== SKIP_CHECK_BLEND_MODE);

    if (!containerHasBlendMode && baseContext.blendMode !== 0) {
        //  If Container is SKIP_TEST then set blend mode to be Normal
        baseContext = baseContext.getClone();
        baseContext.setBlendMode(0);
        baseContext.use();
    }

    var currentContext = baseContext;
    var alpha = container.alpha;
    var scrollFactorX = container.scrollFactorX;
    var scrollFactorY = container.scrollFactorY;
    var useStencilMask = (container.maskGameObjects.length > 0);
    var maskMatrix = (container.maskLocal) ? transformMatrix : undefined;

    if (useStencilMask) {
        PushStencilMask(renderer, container.maskGameObjects, container.stencilInvert, currentContext, maskMatrix);
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

        var childScrollFactorX = child.scrollFactorX;
        var childScrollFactorY = child.scrollFactorY;

        if (
            !containerHasBlendMode &&
            child.blendMode !== currentContext.blendMode &&
            child.blendMode !== SKIP_CHECK_BLEND_MODE
        ) {
            //  If Container doesn't have its own blend mode, then a child can have one
            currentContext = baseContext.getClone();
            currentContext.setBlendMode(child.blendMode);
            currentContext.use();
        }

        if (child.setScrollFactor) {
            child.setScrollFactor(childScrollFactorX * scrollFactorX, childScrollFactorY * scrollFactorY);
        }

        if (child.setAlpha) {
            child.setAlpha(childAlphaTopLeft * alpha, childAlphaTopRight * alpha, childAlphaBottomLeft * alpha, childAlphaBottomRight * alpha);
        }

        child.renderWebGLStep(renderer, child, currentContext, transformMatrix, undefined, children, i);

        if (child.setAlpha) {
            child.setAlpha(childAlphaTopLeft, childAlphaTopRight, childAlphaBottomLeft, childAlphaBottomRight);
        }

        if (child.setScrollFactor) {
            child.setScrollFactor(childScrollFactorX, childScrollFactorY);
        }
    }

    if (useStencilMask) {
        PopStencilMask(renderer, container.maskGameObjects, container.stencilInvert, currentContext, maskMatrix);
    }

    // Release any remaining context.
    if (currentContext !== drawingContext) {
        currentContext.release();
    }
};

export default WebGLRenderer;
