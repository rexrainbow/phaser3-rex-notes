const Utils = Phaser.Renderer.WebGL.Utils;

var BlitterWebGLRenderer = function (renderer, blitter, interpolationPercentage, camera, parentMatrix) {
    var list = blitter.getRenderList();

    if (list.length === 0) {
        return;
    }

    var pipeline = this.pipeline;

    var camMatrix = pipeline._tempMatrix1.copyFrom(camera.matrix);
    var calcMatrix = pipeline._tempMatrix2;
    var bobMatrix = pipeline._tempMatrix3;
    var blitterMatrix = pipeline._tempMatrix4.applyITRS(blitter.x, blitter.y, blitter.rotation, blitter.scaleX, blitter.scaleY);

    camMatrix.multiply(blitterMatrix);

    renderer.setPipeline(pipeline, blitter);

    var scrollX = camera.scrollX * blitter.scrollFactorX;
    var scrollY = camera.scrollY * blitter.scrollFactorY;



    calcMatrix.copyFrom(camera.matrix);

    if (parentMatrix) {
        //  Multiply the camera by the parent matrix
        camMatrix.multiplyWithOffset(parentMatrix, -scrollX, -scrollY);

        scrollX = 0;
        scrollY = 0;
    }

    var blitterX = blitter.x - scrollX;
    var blitterY = blitter.y - scrollY;
    var prevTextureSourceIndex = -1;
    var alpha = camera.alpha * blitter.alpha;
    var roundPixels = camera.roundPixels;

    for (var index = 0; index < list.length; index++) {
        var bob = list[index];
        var frame = bob.frame;
        var bobAlpha = bob.alpha * alpha;

        if (bobAlpha === 0) {
            continue;
        }

        var width = frame.width;
        var height = frame.height;

        var x = blitterX + bob.x + frame.x;
        var y = blitterY + bob.y + frame.y;

        if (bob.flipX) {
            width *= -1;
            x += frame.width;
        }

        if (bob.flipY) {
            height *= -1;
            y += frame.height;
        }

        var xw = x + width;
        var yh = y + height;

        bobMatrix.applyITRS(0, 0, bob.rotation, bob.scaleX, bob.scaleY);

        bobMatrix.e = bob.x - scrollX;
        bobMatrix.f = bob.y - scrollY;

        var tx0 = calcMatrix.getX(x, y);
        var ty0 = calcMatrix.getY(x, y);

        var tx1 = calcMatrix.getX(xw, yh);
        var ty1 = calcMatrix.getY(xw, yh);

        var tint = Utils.getTintAppendFloatAlpha(bob.tint, bobAlpha);

        //  Bind texture only if the Texture Source is different from before
        if (frame.sourceIndex !== prevTextureSourceIndex) {
            pipeline.setTexture2D(frame.glTexture, 0);

            prevTextureSourceIndex = frame.sourceIndex;
        }

        if (roundPixels) {
            tx0 = Math.round(tx0);
            ty0 = Math.round(ty0);

            tx1 = Math.round(tx1);
            ty1 = Math.round(ty1);
        }

        //  TL x/y, BL x/y, BR x/y, TR x/y
        if (pipeline.batchQuad(tx0, ty0, tx0, ty1, tx1, ty1, tx1, ty0, frame.u0, frame.v0, frame.u1, frame.v1, tint, tint, tint, tint, bob.tintFill, frame.glTexture, 0)) {
            prevTextureSourceIndex = -1;
        }
    }
};

export default BlitterWebGLRenderer;
