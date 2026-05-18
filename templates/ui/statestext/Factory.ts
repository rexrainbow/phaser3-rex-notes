import StatesText from './StatesText';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesText', function(config?: any) {
    var gameObject = new StatesText(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesText', StatesText);

export default StatesText;