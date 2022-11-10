import Checkbox from '../../../checkbox/Checkbox.js';

var CreateButtons = function (scene, config) {
    var gameObject = new Checkbox(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateButtons;