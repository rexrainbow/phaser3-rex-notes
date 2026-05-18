import StatesBarRectangle from './StatesBarRectangle';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('statesBarRectangle', function(config?: any) {
    var gameObject = new StatesBarRectangle(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesBarRectangle', StatesBarRectangle);

export default StatesBarRectangle;