import TextAreaInput from '../gameobjects/inputfield/TextAreaInput.js';

var CreateTextAreaInput = function (scene, config, style) {
    var gameObject = new TextAreaInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateTextAreaInput;