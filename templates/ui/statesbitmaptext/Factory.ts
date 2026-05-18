import StatesBitmapText from './StatesBitmapText';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesBitmapText', function(config?: any) {
    var gameObject = new StatesBitmapText(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesBitmapText', StatesBitmapText);

export default StatesBitmapText;