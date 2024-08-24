import GenerateInputFieldClass from '../gameobjects/inputfield/GenerateInputFieldClass.js';

var CreateInputField = function (scene, config, style) {
    var inputField;
    var inputHandlers = this.inputHandlers;
    for (var i = 0, cnt = inputHandlers.length; i < cnt; i++) {
        var handler = inputHandlers[i];
        if (handler.accept(config)) {
            var InputFieldClass = GenerateInputFieldClass(handler.baseClass);
            inputField = new InputFieldClass(scene);
            scene.add.existing(inputField);

            inputField
                .setSetupCallback(handler.setup)
                .setFilterValueCallback(handler.filterValue)
                .setDisplayValueCallback(handler.displayValue)
                .setOnBindTargetCallback(handler.onBindTarget)

            handler.build(inputField, style);

            break;
        }

    }

    if (inputField) {
        // Setup by config
        inputField.setup(config, true);
    } else {
        // Can't create inputField
    }

    return inputField;
}

export default CreateInputField;