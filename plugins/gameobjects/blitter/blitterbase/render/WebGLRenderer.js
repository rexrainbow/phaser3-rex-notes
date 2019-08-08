const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha

var BlitterWebGLRenderer = function (renderer, blitter, interpolationPercentage, camera, parentMatrix) {
    var list = blitter.getRenderList();

    if (list.length === 0) {
        return;
    }

    var alpha = camera.alpha * blitter.alpha;

    if (alpha === 0) {
        //  Nothing to see, so abort early
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

    if (parentMatrix) {
        //  Multiply the camera by the parent matrix
        camMatrix.multiplyWithOffset(parentMatrix, -scrollX, -scrollY);

        scrollX = 0;
        scrollY = 0;
    }

    var prevTextureSourceIndex = -1;
    var roundPixels = camera.roundPixels;

    for (var index = 0; index < list.length; index++) {
        var bob = list[index];
        var frame = bob.frame;
        var bobAlpha = bob.alpha * alpha;

        if (bobAlpha === 0) {
            continue;
        }

        var x = -(frame.halfWidth);
        var y = -(frame.halfHeight);
        var xw = x + frame.width;
        var yh = y + frame.height;
        var flipX = (bob.flipX) ? -1 : 1;
        var flipY = (bob.flipY) ? -1 : 1;

        bobMatrix.applyITRS(0, 0, bob.rotation, bob.scaleX * flipX, bob.scaleY * flipY);

        bobMatrix.e = bob.x - scrollX;
        bobMatrix.f = bob.y - scrollY;

        camMatrix.multiply(bobMatrix, calcMatrix);

        var tx0 = calcMatrix.getX(x, y);
        var ty0 = calcMatrix.getY(x, y);

        var tx1 = calcMatrix.getX(x, yh);
        var ty1 = calcMatrix.getY(x, yh);

        var tx2 = calcMatrix.getX(xw, yh);
        var ty2 = calcMatrix.getY(xw, yh);

        var tx3 = calcMatrix.getX(xw, y);
        var ty3 = calcMatrix.getY(xw, y);

        if (roundPixels) {
            tx0 = Math.round(tx0);
            ty0 = Math.round(ty0);

            tx1 = Math.round(tx1);
            ty1 = Math.round(ty1);

            tx2 = Math.round(tx2);
            ty2 = Math.round(ty2);

            tx3 = Math.round(tx3);
            ty3 = Math.round(ty3);
        }

        var tint = GetTint(bob.tint, bobAlpha);

        //  Bind texture only if the Texture Source is different from before
        if (frame.sourceIndex !== prevTextureSourceIndex) {
            pipeline.setTexture2D(frame.glTexture, 0);

            prevTextureSourceIndex = frame.sourceIndex;
        }

        //  TL x/y, BL x/y, BR x/y, TR x/y
        if (pipeline.batchQuad(tx0, ty0, tx1, ty1, tx2, ty2, tx3, ty3, frame.u0, frame.v0, frame.u1, frame.v1, tint, tint, tint, tint, bob.tintFill, frame.glTexture, 0)) {
            prevTextureSourceIndex = -1;
        }
    }
};

export default BlitterWebGLRenderer;
