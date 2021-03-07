import GetStyle from '../canvas/GetStyle.js';
import DrawRoundRectangle from '../canvas/DrawRoundRectangle.js';

var CreateRectangleTexture = function (scene, key, width, height, radiusConfig, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient, iteration) {
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
    DrawRoundRectangle(
        canvas, context,
        x, x,
        width, height,
        radiusConfig,
        GetStyle(fillStyle),
        GetStyle(strokeStyle), lineWidth,
        GetStyle(fillColor2), isHorizontalGradient,
        iteration
    );

    texture.refresh();
}
export default CreateRectangleTexture;