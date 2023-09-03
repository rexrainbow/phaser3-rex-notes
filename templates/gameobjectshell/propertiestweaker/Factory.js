import PropertiesTweaker from './PropertiesTweaker.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('propertiesTweaker', function (config) {
    var gameObject = new PropertiesTweaker(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.PropertiesTweaker', PropertiesTweaker);

export default PropertiesTweaker;