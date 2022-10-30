import TextInput from '../gameobjects/inputfield/TextInput.js';

var CreateTextInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new TextInput(scene, style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateTextInput;