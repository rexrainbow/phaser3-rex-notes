import BuildDisplayLabelConfig from './BuildDisplayLabelConfig.js';
import Label from '../../label/Label.js';

var CreateDisplayLabel = function (scene, config) {
    config = BuildDisplayLabelConfig(scene, config);
    var gameObject = new Label(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateDisplayLabel;