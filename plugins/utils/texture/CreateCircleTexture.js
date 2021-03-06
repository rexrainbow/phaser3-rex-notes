import GetStyle from './GetStyle.js';

var CreateCircleTexture = function (scene, key, width, fillStyle, strokeStyle, lineWidth) {

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
    var r = width / 2;
    var x = r;
    r -= (lineWidth / 2);
    context.beginPath();
    context.ellipse(x, x, r, r, 0, 0, (2 * Math.PI));
    if (fillStyle !== undefined) {
        fillStyle = GetStyle(fillStyle);
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle !== undefined) {
        strokeStyle = GetStyle(strokeStyle);
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }

    texture.refresh();
}
export default CreateCircleTexture;