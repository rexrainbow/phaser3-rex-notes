import GetStyle from '../canvas/GetStyle.js';
import DrawRectangle from '../canvas/DrawRectangle.js';

var CreateRectangleTexture = function (scene, key, width, height, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient) {
    if (height === undefined) {
        height = width;
    }
    if (isHorizontalGradient === undefined) {
        isHorizontalGradient = true;
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
    var canvas = texture.getCanvas();
    var context = texture.getContext();

    // Draw canvas
    var x = lineWidth / 2;
    width -= lineWidth;
    height -= lineWidth;
    DrawRectangle(
        canvas, context,
        x, x,
        width, height,
        GetStyle(fillStyle),
        GetStyle(strokeStyle), lineWidth,
        GetStyle(fillColor2), isHorizontalGradient
    );

    texture.refresh();
}
export default CreateRectangleTexture;