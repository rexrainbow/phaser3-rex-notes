import SimpleLabel from './SimpleLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleLabel', function (config) {
    var gameObject = new SimpleLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleLabel', SimpleLabel);

export default SimpleLabel;