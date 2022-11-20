import ColorPicker from './ColorPicker.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateColorPicker = function (scene) {
    var scene = this.scene;

    var background;
    var createBackgroundCallback = this.colorPickerCreateBackgroundCallback;
    if (createBackgroundCallback) {
        background = createBackgroundCallback.call(this, scene);
        scene.add.existing(background);
    }

    var width = this.colorPickerWidth;
    if (width === undefined) {
        width = this.width;
    }

    var height = this.colorPickerHeight;
    if (height === undefined) {
        height = width;
    }

    var colorPicker = new ColorPicker(scene, {
        width: width, height: height,

        background: background,
        space: this.colorPickerSpace,

        value: this.value
    });
    scene.add.existing(colorPicker);

    return colorPicker;
}

export default CreateColorPicker;