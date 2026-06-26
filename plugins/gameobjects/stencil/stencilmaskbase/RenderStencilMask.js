var PushStencilMask = function (renderer, maskGameObjects, stencilInvert, drawingContext, parentMatrix) {
    RenderStencilMask(renderer, maskGameObjects, stencilInvert, drawingContext, true, parentMatrix);
};

var PopStencilMask = function (renderer, maskGameObjects, stencilInvert, drawingContext, parentMatrix) {
    RenderStencilMask(renderer, maskGameObjects, stencilInvert, drawingContext, false, parentMatrix);
};

var RenderStencilMask = function (renderer, maskGameObjects, stencilInvert, drawingContext, push, parentMatrix) {
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

    for (var i = 0, cnt = maskGameObjects.length; i < cnt; i++) {
        maskGameObjects[i].renderWebGLStep(renderer, maskGameObjects[i], currentContext, parentMatrix);
    }

    currentContext.release();
};

export {
    PushStencilMask,
    PopStencilMask
};
