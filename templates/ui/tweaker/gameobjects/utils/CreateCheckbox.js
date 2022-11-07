import CheckboxBase from '../../../checkbox/Checkbox.js';

var CreateButtons = function (scene, config) {
    var gameObject = new Checkbox(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

class Checkbox extends CheckboxBase {
    setSize(width, height) {
        var size = Math.min(width, height);
        super.setSize(size, size);
        return this;
    }
}

export default CreateButtons;