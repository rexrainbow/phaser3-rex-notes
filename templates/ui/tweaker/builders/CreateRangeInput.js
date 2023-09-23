import RangeInput from '../gameobjects/inputfield/RangeInput.js';

var CreateRangeInput = function (scene, config, style) {
    var gameObject = new RangeInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateRangeInput;