import Tweaker from '../../ui/tweaker/Tweaker.js';
import MergeConfig from './methods/MergeConfig.js';
import AddProperties from './methods/AddProperties.js';

class PropertiesPanel extends Tweaker {
    constructor(scene, config, extraProperties) {
        if (config === undefined) {
            config = {};
        }
        super(scene, MergeConfig(config));

        var propertiesPanel;
        if (config.hasOwnProperty('height')) {
            propertiesPanel = this.addScrollable();
        } else {
            propertiesPanel = this;
        }

        AddProperties.call(propertiesPanel, extraProperties);

        this.setVisible(false);
    }
}

export default PropertiesPanel;