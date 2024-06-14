import AIOSpinner from './AIOSpinner.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('aioSpinner', function (config) {
    var gameObject = new AIOSpinner(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.AIOSpinner', AIOSpinner);

export default AIOSpinner;