import InputRow from '../gameobjects/inputrow/InputRow.js';
import CreateRoundRectangle from '../../utils/build/CreateRoundRectangle.js';
import CreateTitleLabel from './CreateTitleLabel.js';
import CreateInputField from './CreateInputField.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateInputRow = function (scene, config, style) {
    var titleStyle = GetValue(style, 'title') || {};
    var inputTitle = CreateTitleLabel(scene, config, titleStyle);

    var inputField = CreateInputField(scene, config, style);

    var backgroundStyle = GetValue(style, 'background') || {};
    var background = CreateRoundRectangle(scene, backgroundStyle);

    var inputSizerconfig = {
        ...config,
        ...style,

        inputTitle: inputTitle,
        inputField: inputField,
        background: background,
    }
    var gameObject = new InputRow(scene, inputSizerconfig);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateInputRow;