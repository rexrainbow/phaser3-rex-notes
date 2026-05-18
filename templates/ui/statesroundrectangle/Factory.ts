import StatesRoundRectangle from './StatesRoundRectangle';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesRoundRectangle', function(config?: any) {
    var gameObject = new StatesRoundRectangle(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesRoundRectangle', StatesRoundRectangle);

export default StatesRoundRectangle;