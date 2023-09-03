import PropertiesPanel from './PropertiesPanel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('propertiesPanel', function (config) {
    var gameObject = new PropertiesPanel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.PropertiesPanel', PropertiesPanel);

export default PropertiesPanel;