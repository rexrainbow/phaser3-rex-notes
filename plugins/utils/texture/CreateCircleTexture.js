const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCircleTexture = function (textureManager, config) {
    var w = GetValue(config, 'width', undefined);
    var radius = (w === undefined) ? GetValue(config, 'radius', 4) : w / 2;
    var fillColor = GetValue(config, 'color', 0xffffff);
    var fillAlpha = GetValue(config, 'alpha', 1);
    var strokeColor = GetValue(config, 'stroke.color', undefined);
    var strokeAlpha = GetValue(config, 'stroke.alpha', 1);
    var strokeLineWidth = GetValue(config, 'stroke.lineWidth', 1);
    var key = GetValue(config, 'key', undefined);

    if (key === undefined) {
        key = Date.now().toString();
    }
    var width = radius * 2,
        height = width,
        x = radius,
        y = radius;

    var texture = textureManager.createCanvas(key, width, height);

    var ctx = texture.getContext();
    if (fillColor !== undefined) {
        var red = (fillColor >> 16) & 0xff;
        var green = (fillColor >> 8) & 0xff;
        var blue = (fillColor) & 0xff;
        ctx.fillStyle = `rgba(${red},${green},${blue},${fillAlpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, PI2);
        ctx.fill();
        ctx.closePath();
    }
    if (strokeColor !== undefined) {
        var red = (strokeColor >> 16) & 0xff;
        var green = (strokeColor >> 8) & 0xff;
        var blue = (strokeColor) & 0xff;
        ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
        ctx.lineWidth = strokeLineWidth;
        ctx.beginPath();
        var strokeRadius = Math.floor(radius - (strokeLineWidth / 2));
        ctx.arc(x, y, strokeRadius, 0, PI2);
        ctx.stroke();
        ctx.closePath();
    }

    texture.refresh();
    return texture;
}

const PI2 = Math.PI * 2;

export default CreateCircleTexture;