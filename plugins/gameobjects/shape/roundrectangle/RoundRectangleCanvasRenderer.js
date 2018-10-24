import FillStyleCanvas from '../utils/FillStyleCanvas.js';
import LineStyleCanvas from '../utils/LineStyleCanvas.js';

const SetTransform = Phaser.Renderer.Canvas.SetTransform;

var RoundRectangleCanvasRenderer = function (renderer, src, interpolationPercentage, camera, parentMatrix)
{  
    var ctx = renderer.currentContext;

    if (SetTransform(renderer, ctx, src, camera, parentMatrix))
    {
        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var path = src.pathData;
        var pathLength = path.length - 1;
    
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        ctx.beginPath();

        ctx.moveTo(px1, py1);
    
        if (!src.closePath)
        {
            pathLength -= 2;
        }
    
        for (var i = 2; i < pathLength; i += 2)
        {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;
    
            ctx.lineTo(px2, py2);
        }

        ctx.closePath();

        if (src.isFilled)
        {
            FillStyleCanvas(ctx, src);

            ctx.fill();
        }

        if (src.isStroked)
        {
            LineStyleCanvas(ctx, src);

            ctx.stroke();
        }
    }
};

export default RoundRectangleCanvasRenderer;
