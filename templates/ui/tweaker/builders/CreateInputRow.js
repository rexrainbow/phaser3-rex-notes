import InputRow from '../gameobjects/inputrow/InputRow.js';
import CreateBackground from './utils/CreateBackground.js';
import CreateTitleLabel from './utils/CreateTitleLabel.js';
import CreateInputField from './CreateInputField.js';

var CreateInputRow = function (tweaker, config, inputRowStyle, styles) {
    if (!config) { config = {}; }
    if (!inputRowStyle) { inputRowStyle = {}; }

    var scene = tweaker.scene;

    // Background
    var background = CreateBackground(scene, (config.background || {}), (inputRowStyle.background || {}));

    // InputField
    var inputField = CreateInputField(tweaker, config, inputRowStyle, styles);
    if (!inputField) {
        // Can't create inputField
        return null;
    }

    // Title
    var inputTitle;
    if ((config.title) !== false && (config.title !== null)) {
        var titleStyle = inputRowStyle.title || {};
        inputTitle = CreateTitleLabel(scene, config, titleStyle);
    }

    // Border
    var border = CreateBackground(scene, (config.border || {}), (inputRowStyle.border || {}));

    var inputRow = new InputRow(scene, {
        ...inputRowStyle,
        ...config,  // config can overwrite inputRowStyle

        inputTitle: inputTitle,
        inputField: inputField,
        background: background,
        border: border,
    });
    scene.add.existing(inputRow);

    inputRow.setTitle(config);

    inputRow.setValueCallbacks(config);

    return inputRow;
}

export default CreateInputRow;