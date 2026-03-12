import CreateBackground from './utils/CreateBackground.js';
import CreateTitleLabel from './utils/CreateTitleLabel.js';
import CreateLabel from '../../utils/build/CreateLabel.js';
import CreateButtonsSizer from '../gameobjects/utils/CreateButtons.js';
import InputRow from '../gameobjects/inputrow/InputRow.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateButtons = function (scene, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    // Background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // Title
    var title;
    if ((config.title) !== false && (config.title !== null)) {
        var titleStyle = style.title || {};
        title = CreateTitleLabel(scene, config, titleStyle);
    }

    // Buttons
    var buttonsConfig = config.buttons;
    var buttonStyle = GetValue(style, 'button') || {};
    var buttons = [];
    for (var i = 0, cnt = buttonsConfig.length; i < cnt; i++) {
        var button = CreateLabel(scene, buttonStyle);
        buttons.push(button);

        var buttonConfig = buttonsConfig[i];
        button.resetDisplayContent(buttonConfig.label);
        button.callback = buttonConfig.callback;
    }

    var buttonsSizer = CreateButtonsSizer(scene, {
        buttons: buttons,
        expand: true,
        wrap: GetValue(config, 'wrap', false)
    });
    buttonsSizer.defaultProportion = 1;

    // ButtonsSizer does not have setReadOnly method
    buttonsSizer.setReadOnly = function (readOnly) {
        if (readOnly === undefined) {
            readOnly = true;
        }

        buttonsSizer.setButtonEnable(!readOnly);
        return this;
    }

    // Border
    var border = CreateBackground(scene, (config.border || {}), (style.border || {}));

    // InputRow
    var inputRow = new InputRow(scene, {
        ...style,

        inputTitle: title,
        inputField: buttonsSizer,
        background: background,
        border: border,
    })
    scene.add.existing(inputRow);

    inputRow.setTitle(config);

    buttonsSizer
        .on('button.click', function (button) {
            button.callback(inputRow.bindingTarget);
        })

    return inputRow;
}

export default CreateButtons;