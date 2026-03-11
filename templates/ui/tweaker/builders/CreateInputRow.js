import InputRow from '../gameobjects/inputrow/InputRow.js';
import CreateBackground from './utils/CreateBackground.js';
import CreateTitleLabel from './utils/CreateTitleLabel.js';
import CreateInputField from './CreateInputField.js';

var CreateInputRow = function (scene, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    // Background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // InputField
    var inputField = CreateInputField.call(this, scene, config, style);
    if (!inputField) {
        // Can't create inputField
        return null;
    }

    // Title
    var inputTitle;
    if ((config.title) !== false && (config.title !== null)) {
        var titleStyle = style.title || {};
        inputTitle = CreateTitleLabel(scene, config, titleStyle);
    }

    // Background
    var border = CreateBackground(scene, (config.border || {}), (style.border || {}));

    var inputRow = new InputRow(scene, {
        ...style,
        ...config,  // config can overwrite style

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