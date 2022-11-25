import InputRow from '../gameobjects/inputrow/InputRow.js';
import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import CreateInputField from './CreateInputField.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateInputRow = function (scene, config, style) {
    // Title
    var titleStyle = GetValue(style, 'title') || {};
    var inputTitle = CreateTitleLabel(scene, config, titleStyle);

    // InputField
    var inputField = CreateInputField(scene, config, style);

    // Background
    var backgroundStyle = GetValue(style, 'background') || {};
    var background = CreateRoundRectangle(scene, backgroundStyle);

    var inputRow = new InputRow(scene, {
        ...config,
        ...style,

        inputTitle: inputTitle,
        inputField: inputField,
        background: background,
    });
    scene.add.existing(inputRow);

    inputRow.setTitle(config);

    return inputRow;
}

export default CreateInputRow;