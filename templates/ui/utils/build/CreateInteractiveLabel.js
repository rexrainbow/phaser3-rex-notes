import BuildInteractiveLabelConfig from './BuildInteractiveLabelConfig.js';
import LabelBase from '../../label/Label.js';

var CreateInteractiveLabel = function (scene, config) {
    config = BuildInteractiveLabelConfig(scene, config);
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

export default CreateInteractiveLabel;