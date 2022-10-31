import RangeInput from '../gameobjects/inputfield/RangeInput.js';

var CreateRangeInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new RangeInput(scene, style);
        scene.add.existing(gameObject);
    }

    gameObject.setRange(config.min, config.max, config.step);

    return gameObject;
}

export default CreateRangeInput;