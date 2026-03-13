import GenerateInputFieldClass from '../gameobjects/inputfield/GenerateInputFieldClass.js';

var CreateInputField = function (tweaker, config, inputRowStyle, styles) {
    var scene = tweaker.scene;
    var inputField;
    var inputHandlers = tweaker.inputHandlers;
    for (var i = 0, cnt = inputHandlers.length; i < cnt; i++) {
        var handler = inputHandlers[i];
        if (handler.accept(config)) {
            var InputFieldClass = GenerateInputFieldClass(handler.baseClass);
            inputField = new InputFieldClass(scene);
            scene.add.existing(inputField);

            // Decorate instance via installing callbacks
            inputField
                .setTweaker(tweaker)
                .setSetupCallback(handler.setup)
                .setFilterValueCallback(handler.filterValue)
                .setDisplayValueCallback(handler.displayValue)
                .setOnBindTargetCallback(handler.onBindTarget)
                .setSetReadOnlyCallback(handler.setReadOnly)

            handler.build(inputField, config, inputRowStyle, styles);

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