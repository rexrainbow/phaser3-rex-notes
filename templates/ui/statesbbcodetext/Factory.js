import StatesBBCodeText from './StatesBBCodeText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesBBCodeText', function (config) {
    var gameObject = new StatesBBCodeText(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesBBCodeText', StatesBBCodeText);

export default StatesBBCodeText;