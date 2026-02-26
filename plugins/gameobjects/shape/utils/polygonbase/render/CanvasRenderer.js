import FillPathCanvas from '../../render/FillPathCanvas.js';
import StrokePathCanvas from '../../render/StrokePathCanvas.js';

const SetTransform = Phaser.Renderer.Canvas.SetTransform;

var PolygonCanvasRenderer = function (renderer, src, camera, parentMatrix) {
    if (src.dirty) {
        src.updateData();
        src.dirty = false;
    }

    camera.addToRenderList(src);

    var ctx = renderer.currentContext;

    if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        if (src.isFilled) {
            FillPathCanvas(ctx, src, dx, dy);
        }

        if (src.isStroked) {
            StrokePathCanvas(ctx, src, dx, dy);
        }

        //  Restore the context saved in SetTransform
        ctx.restore();
    }
};

export default PolygonCanvasRenderer;
