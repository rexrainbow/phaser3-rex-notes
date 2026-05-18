import Checkbox from '../../../checkbox/Checkbox';

var CreateCheckbox = function(scene?: any, config?: any) {
    var gameObject = new Checkbox(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateCheckbox;