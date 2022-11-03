import BuildLabelConfig from './BuildLabelConfig.js';
import LabelBase from '../../../label/Label.js';

var CreateLabel = function (scene, config) {
    config = BuildLabelConfig(scene, config);
    var gameObject = new Label(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

class Label extends LabelBase {
    setActiveState(enable) {
        this.childrenMap.background.setActiveState(enable);
        return this;
    }
}

export default CreateLabel;