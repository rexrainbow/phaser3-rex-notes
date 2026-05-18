import Tweaker from '../../ui/tweaker/Tweaker';
import MergeConfig from './methods/MergeConfig';
import AddProperties from './methods/AddProperties';

class PropertiesPanel extends Tweaker {
    addScrollable: any;
    setVisible: any;

    constructor(scene?: any, config?: any, extraProperties?: any) {
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