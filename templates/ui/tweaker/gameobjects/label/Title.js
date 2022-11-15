import Label from '../../../label/Label.js';
import BuildLabelConfig from '../../../utils/build/BuildDisplayLabelConfig.js';
import SetLabelData from '../../../utils/build/SetLabelData.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

class Title extends Label {
    constructor(scene, config) {
        config = BuildLabelConfig(scene, config);
        super(scene, config);
        this.type = 'rexTweaker.Title';
    }

    setTitle(config) {
        if (config === undefined) {
            config = {};
        }
        config = DeepClone(config);
        config.text = config.text || config.title || '';

        SetLabelData(this, config);

        return this;
    }
}

export default Title;