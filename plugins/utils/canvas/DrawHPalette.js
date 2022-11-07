import MapRange from '../math/MapRange.js';

const Color = Phaser.Display.Color;

var DrawHPalette = function (canvas, context, verticalMode) {
    if (verticalMode === undefined) {
        verticalMode = false;
    }
    var width = canvas.width;
    var height = canvas.height;
    var color = new Color();
    if (verticalMode) {
        for (var iy = 0; iy < height; iy++) {
            var h = MapRange(iy, 0, height, 0, 1);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(0, iy, width, 1);
        }
    } else {
        for (var ix = 0; ix < width; ix++) {
            var h = MapRange(ix, 0, width, 0, 1);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(ix, 0, 1, height);
        }
    }
}

export default DrawHPalette;