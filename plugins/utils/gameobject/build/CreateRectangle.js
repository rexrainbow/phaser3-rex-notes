const GetValue = Phaser.Utils.Objects.GetValue;

var CreateRectangle = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', 1);
    var height = GetValue(config, 'height', 1);
    var color = GetValue(config, 'color', undefined);
    var alpha = GetValue(config, 'alpha', 1);
    var strokeColor = GetValue(config, 'strokeColor', undefined);
    var strokeAlpha = GetValue(config, 'strokeAlpha', 1);
    var strokeWidth = GetValue(config, 'strokeWidth', 2);

    var gameObject = scene.add.rectangle(x, y, width, height);
    if (color !== undefined) {
        gameObject.setFillStyle(color, alpha);
    }
    if (strokeColor !== undefined) {
        gameObject.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);
    }
    return gameObject;
}

export default CreateRectangle;