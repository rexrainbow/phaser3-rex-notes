import CheckLabel from './CheckLabel.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('checkbox', function (config) {
    var gameObject = new CheckLabel(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CheckLabel', CheckLabel);

export default CheckLabel;