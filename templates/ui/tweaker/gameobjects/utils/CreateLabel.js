import BuildLabelConfig from './BuildLabelConfig.js';
import Label from '../../../label/Label.js';

var CreateLabel = function (scene, config) {
    config = BuildLabelConfig(scene, config);
    var gameObject = new Label(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateLabel;