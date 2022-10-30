import NumberInput from '../gameobjects/inputfield/NumberInput.js';

var CreateNumberInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new NumberInput(scene, style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateNumberInput;