import GenerateInputFieldClass from '../gameobjects/inputfield/GenerateInputFieldClass.js';

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
        if (handler.accept(config, value)) {
            var InputFieldClass = GenerateInputFieldClass(handler.baseClass);
            inputField = new InputFieldClass(scene);
            scene.add.existing(inputField);

            inputField
                .setSetupCallback(handler.setup)
                .setDisplayValueCallback(handler.displayValue);

            handler.build(inputField, style);

            break;
        }

    }

    // Setup by config
    inputField.setup(config, true);

    return inputField;
}

export default CreateInputField;