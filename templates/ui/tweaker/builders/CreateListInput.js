import ListInput from '../gameobjects/inputfield/ListInput.js';

var CreateDropDownListInput = function (scene, config, style, gameObject) {
    if (!gameObject) {
        gameObject = new ListInput(scene, style);
        scene.add.existing(gameObject);
    }

    gameObject.setOptions(config.options);

    return gameObject;
}

export default CreateDropDownListInput;