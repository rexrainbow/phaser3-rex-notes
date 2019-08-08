var BlitterCanvasRenderer = function (renderer, blitter, interpolationPercentage, camera, parentMatrix) {
    var list = blitter.getRenderList();

    if (list.length === 0) {
        return;
    }

    var ctx = renderer.currentContext;

    var alpha = camera.alpha * blitter.alpha;

    if (alpha === 0) {
        //  Nothing to see, so abort early
        return;
    }

    //  Blend Mode
    ctx.globalCompositeOperation = renderer.blendModes[blitter.blendMode];

    var camMatrix = renderer._tempMatrix1.copyFrom(camera.matrix);
    var calcMatrix = renderer._tempMatrix2;
    var bobMatrix = renderer._tempMatrix3;
    var blitterMatrix = renderer._tempMatrix4.applyITRS(blitter.x, blitter.y, blitter.rotation, blitter.scaleX, blitter.scaleY);

    camMatrix.multiply(blitterMatrix);

    var scrollX = camera.scrollX * blitter.scrollFactorX;
    var scrollY = camera.scrollY * blitter.scrollFactorY;

    if (parentMatrix) {
        //  Multiply the camera by the parent matrix
        camMatrix.multiplyWithOffset(parentMatrix, -scrollX, -scrollY);

        scrollX = 0;
        scrollY = 0;
    }

    var roundPixels = camera.roundPixels;

    //  Render bobs
    for (var index = 0; index < list.length; index++) {
        var bob = list[index];
        var frame = bob.frame;
        var cd = frame.canvasData;
        var bobAlpha = bob.alpha * alpha;

        if (bobAlpha === 0) {
            continue;
        }

        var x = -(frame.halfWidth);
        var y = -(frame.halfHeight);
        var flipX = (bob.flipX) ? -1 : 1;
        var flipY = (bob.flipY) ? -1 : 1;

        bobMatrix.applyITRS(0, 0, bob.rotation, bob.scaleX * flipX, bob.scaleY * flipY);

        bobMatrix.e = bob.x - scrollX;
        bobMatrix.f = bob.y - scrollY;

        camMatrix.multiply(bobMatrix, calcMatrix);

        ctx.save();

        calcMatrix.setToContext(ctx);

        ctx.globalCompositeOperation = renderer.blendModes[blitter.blendMode];

        ctx.globalAlpha = alpha;

        if (roundPixels) {
            x = Math.round(x);
            y = Math.round(y);
        }

        ctx.drawImage(frame.source.image, cd.x, cd.y, cd.width, cd.height, x, y, cd.width, cd.height);

        ctx.restore();
    }
};

export default BlitterCanvasRenderer;
