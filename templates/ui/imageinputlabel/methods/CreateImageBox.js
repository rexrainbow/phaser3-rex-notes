import ImageBox from '../../imagebox/ImageBox.js';
import Canvas from '../../canvas/Canvas.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCanvas = function (scene, config) {
    var canvasConfig = GetValue(config, 'canvas');
    var width = GetValue(canvasConfig, 'width', 128);
    var height = GetValue(canvasConfig, 'height', 128);

    var canvas = new Canvas(scene, 0, 0, width, height);
    scene.add.existing(canvas);

    var key = GetValue(canvasConfig, 'key');
    var frame = GetValue(canvasConfig, 'frame');
    var fillColor = GetValue(canvasConfig, 'fill');
    if (fillColor !== undefined) {
        canvas.fill(fillColor);
    } else if (key !== undefined) {
        canvas.loadTexture(key, frame);
    }

    // Compatible with Image game object for ImageBox
    canvas.setTexture = canvas.loadTexture.bind(canvas);

    return canvas;
}

var CreateImageBox = function (scene, config) {
    var icon = new ImageBox(scene, {
        scaleUp: GetValue(config, 'scaleUpIcon', false),
        background: GetValue(config, 'iconBackground'),
        image: CreateCanvas(scene, config)
    })
    scene.add.existing(icon);

    return icon;
}

export default CreateImageBox;