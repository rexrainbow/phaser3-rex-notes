import GetStyle from '../canvas/GetStyle.js';
import DrawCircle from '../canvas/DrawCircle.js';

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
    var canvas = texture.getCanvas();
    var context = texture.getContext();

    var r = width / 2;
    var x = r;
    r -= (lineWidth / 2);
    DrawCircle(
        canvas, context,
        x, x, r, r,
        GetStyle(fillStyle),
        GetStyle(strokeStyle), lineWidth
    );

    texture.refresh();
}
export default CreateCircleTexture;