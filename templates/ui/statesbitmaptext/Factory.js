import StatesBitmapText from './StatesBitmapText.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesBitmapText', function (config) {
    var gameObject = new StatesBitmapText(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesBitmapText', StatesBitmapText);

export default StatesBitmapText;