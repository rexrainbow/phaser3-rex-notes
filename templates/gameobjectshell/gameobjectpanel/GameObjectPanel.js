import Tweaker from '../../ui/tweaker/Tweaker.js';
import MergeConfig from './methods/MergeConfig.js';
import AddProperties from './methods/AddProperties.js';

class PropertiesPanel extends Tweaker {
    constructor(scene, config, extraProperties) {
        if (config === undefined) {
            config = {};
        }
        super(scene, MergeConfig(config));

        AddProperties.call(this, extraProperties);

        this.setVisible(false);
    }
}

export default PropertiesPanel;