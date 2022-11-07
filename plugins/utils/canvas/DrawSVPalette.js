const Color = Phaser.Display.Color;
const Percent = Phaser.Math.Percent;

var DrawSVPalette = function (canvas, context, h) {
    var width = canvas.width;
    var height = canvas.height;
    var imgData = context.getImageData(0, 0, width, height);
    var data = imgData.data;
    var color = new Color();
    for (var iy = 0; iy < height; iy++) {
        for (var ix = 0; ix < width; ix++) {
            var s = Percent(ix, 0, width);
            var v = 1 - Percent(iy, 0, height);
            color.setFromHSV(h, s, v);
            var i = ((iy * width) + ix) * 4;
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = 255;
        }
    }
    context.putImageData(imgData, 0, 0);
}

export default DrawSVPalette;