import ButtonsInput from '../gameobjects/inputfield/ButtonsInput.js';

var CreateButtonsInput = function (scene, config, style) {
    var gameObject = new ButtonsInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateButtonsInput;