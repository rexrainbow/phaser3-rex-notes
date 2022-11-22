import CheckboxInput from '../gameobjects/inputfield/CheckboxInput.js';

var CreateCheckboxInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new CheckboxInput(scene, style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateCheckboxInput;