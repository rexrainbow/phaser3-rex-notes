import InputFiledBase from '../gameobjects/inputfield/InputFieldBase.js';

var CreateInputField = function (scene, config, style) {
    var value = undefined;
    var bindingTarget = config.bindingTarget;
    if (bindingTarget && (typeof (bindingTarget) === 'object')) {
        value = bindingTarget[config.bindingKey];
    }

    var inputField;
    var inputHandlers = this.inputHandlers;
    for (var i = 0, cnt = inputHandlers.length; i < cnt; i++) {
        var handler = inputHandlers[i];
        if (!handler.hasOwnProperty('accept')) {
            continue;
        }
        if (!handler.hasOwnProperty('build')) {
            continue;
        }

        if (handler.accept(config, value)) {
            inputField = new InputFiledBase(scene);
            scene.add.existing(inputField);

            inputField
                .setSetupCallback(handler.setup)
                .setDisplayValueCallback(handler.displayValue);

            handler.build(inputField, style);

            break;
        }

    }

    // Setup by config
    inputField.setup(config);

    return inputField;
}

export default CreateInputField;