import GetStyle from './GetStyle.js';

var CreateRectangleTexture = function (scene, key, width, height, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
    if (height === undefined) {
        height = width;
    }
    if ((fillStyle === undefined) && (strokeStyle === undefined)) {
        fillStyle = 0xffffff;
    }
    if (strokeStyle === undefined) {
        lineWidth = 0;
    } else if (lineWidth === undefined) {
        lineWidth = 2;
    }


    var texture = scene.textures.createCanvas(key, width, width);
    var context = texture.getContext();

    // Draw canvas
    var x = lineWidth / 2;
    width -= lineWidth;
    height -= lineWidth;
    context.beginPath();
    context.rect(x, x, width, height);

    if (fillStyle !== undefined) {
        fillStyle = GetStyle(fillStyle);
        if (fillColor2 !== undefined) {
            fillColor2 = GetStyle(fillColor2);
            var grd;
            if (isHorizontalGradient) {
                grd = context.createLinearGradient(0, 0, width, 0);
            } else {
                grd = context.createLinearGradient(0, 0, 0, height);
            }
            grd.addColorStop(0, fillStyle);
            grd.addColorStop(1, fillColor2);
            fillStyle = grd;
        }

        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle !== undefined) {
        context.strokeStyle = GetStyle(strokeStyle);
        context.lineWidth = lineWidth;
        context.stroke();
    }

    texture.refresh();
}
export default CreateRectangleTexture;