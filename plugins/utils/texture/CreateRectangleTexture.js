const GetValue = Phaser.Utils.Objects.GetValue;

var CreateRectangleTexture = function (textureManager, config) {
    var width = GetValue(config, 'width', 8);
    var height = GetValue(config, 'height', width);
    var fillColor = GetValue(config, 'color', 0xffffff);
    var fillAlpha = GetValue(config, 'alpha', 1);
    var strokeColor = GetValue(config, 'stroke.color', undefined);
    var strokeAlpha = GetValue(config, 'stroke.alpha', 1);
    var strokeLineWidth = GetValue(config, 'stroke.lineWidth', 1);
    var key = GetValue(config, 'key', undefined);

    if (key === undefined) {
        key = Date.now().toString();
    }

    var texture = textureManager.createCanvas(key, width, height);

    var ctx = texture.getContext();
    if (fillColor !== undefined) {
        var red = (fillColor >> 16) & 0xff;
        var green = (fillColor >> 8) & 0xff;
        var blue = (fillColor) & 0xff;
        ctx.fillStyle = `rgba(${red},${green},${blue},${fillAlpha})`;
        ctx.fillRect(0, 0, width, height);
    }
    if (strokeColor !== undefined) {
        var red = (strokeColor >> 16) & 0xff;
        var green = (strokeColor >> 8) & 0xff;
        var blue = (strokeColor) & 0xff;
        ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
        ctx.lineWidth = strokeLineWidth;
        var strokeX = Math.floor(0 + (strokeLineWidth / 2));
        var strokeY = strokeX;
        var strokeWidth = Math.floor(width - (strokeLineWidth / 2));
        var strokeHeight = Math.floor(height - (strokeLineWidth / 2));
        ctx.strokeRect(strokeX, strokeY, strokeWidth, strokeHeight);
    }

    texture.refresh();
    return texture;
}

const PI2 = Math.PI * 2;

export default CreateRectangleTexture;