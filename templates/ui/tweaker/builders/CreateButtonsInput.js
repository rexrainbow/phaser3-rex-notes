import ButtonsInput from '../gameobjects/inputfield/ButtonsInput.js';

var CreateButtonsInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new ButtonsInput(scene, style);
        scene.add.existing(gameObject);
    }

    gameObject.setOptions(config.options);

    return gameObject;
}

export default CreateButtonsInput;