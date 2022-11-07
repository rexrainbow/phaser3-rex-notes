const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;

var DrawHPalette = function (canvas, context, verticalMode) {
    if (verticalMode === undefined) {
        verticalMode = false;
    }
    var width = canvas.width;
    var height = canvas.height;
    var color = new Color();
    if (verticalMode) {
        for (var iy = 0; iy < height; iy++) {
            var h = Percent(iy, 0, height);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(0, iy, width, 1);
        }
    } else {
        for (var ix = 0; ix < width; ix++) {
            var h = Percent(ix, 0, width);
            color.setFromHSV(h, 1, 1);
            context.fillStyle = color.rgba;
            context.fillRect(ix, 0, 1, height);
        }
    }
}

export default DrawHPalette;