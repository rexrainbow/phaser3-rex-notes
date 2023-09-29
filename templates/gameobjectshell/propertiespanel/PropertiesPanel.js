import Tweaker from '../../ui/tweaker/Tweaker.js';
import DefaultConfig from './DefaultConfig.js';
import DeepClone from '../../../plugins/utils/object/DeepClone.js';
import AddProperties from './methods/AddProperties.js';

class PropertiesPanel extends Tweaker {
    constructor(scene, config, extraProperties) {
        if (config === undefined) {
            config = DeepClone(DefaultConfig);
        }
        super(scene, config);

        AddProperties.call(this, extraProperties);

        this.setVisible(false);
    }

    setBindingTarget(target) {
        this.setVisible(!!target);
        super.setBindingTarget(target);
        return this;
    }
}

export default PropertiesPanel;