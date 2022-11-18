import ColorPickerPanel from './ColorPickerPanel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateColorPickerPanel = function (scene, config) {
    var colorPickerConfig = GetValue(config, 'colorPicker');
    if (colorPickerConfig === undefined) {
        colorPickerConfig = {};
    }

    var colorPickerPanel = new ColorPickerPanel(scene, colorPickerConfig);
    scene.add.existing(colorPickerPanel);

    return colorPickerPanel;
}

export default CreateColorPickerPanel;