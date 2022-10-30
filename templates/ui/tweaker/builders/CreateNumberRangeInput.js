import RangeInput from '../gameobjects/inputfield/RangeInput.js';

var CreateNumberRangeInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new RangeInput(scene, style);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateNumberRangeInput;