// copy from Phaser.GameObjects.Text

import Phaser from 'phaser';
import GameObject from './../utils/system/GameObject.js';  // TODO:

var CanvasRenderer = function (renderer, src, interpolationPercentage, camera)
{
    if (GameObject.RENDER_MASK !== src.renderFlags || (src.cameraFilter > 0 && (src.cameraFilter & camera._id)))
    {
        return;
    }
    
    var ctx = renderer.currentContext;

    // var resolution = src.resolution;

    //  Blend Mode
    if (renderer.currentBlendMode !== src.blendMode)
    {
        renderer.currentBlendMode = src.blendMode;
        ctx.globalCompositeOperation = renderer.blendModes[src.blendMode];
    }

    //  Alpha
    if (renderer.currentAlpha !== src.alpha)
    {
        renderer.currentAlpha = src.alpha;
        ctx.globalAlpha = src.alpha;
    }

    //  Smoothing
    if (renderer.currentScaleMode !== src.scaleMode)
    {
        renderer.currentScaleMode = src.scaleMode;
    }

    var canvas = src.canvas;

    ctx.save();

    var tx = src.x - camera.scrollX * src.scrollFactorX;
    var ty = src.y - camera.scrollY * src.scrollFactorY;

    if (renderer.config.roundPixels)
    {
        tx |= 0;
        ty |= 0;
    }

    ctx.translate(tx, ty);

    ctx.rotate(src.rotation);

    ctx.scale(src.scaleX, src.scaleY);

    ctx.translate(canvas.width * (src.flipX ? 1 : 0), canvas.height * (src.flipY ? 1 : 0));

    ctx.scale(src.flipX ? -1 : 1, src.flipY ? -1 : 1);

    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, -src.displayOriginX, -src.displayOriginY, canvas.width, canvas.height);

    ctx.restore();
};

export default CanvasRenderer;