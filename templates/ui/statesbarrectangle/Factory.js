import StatesBarRectangle from './StatesBarRectangle.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('statesBarRectangle', function (config) {
    var gameObject = new StatesBarRectangle(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.StatesBarRectangle', StatesBarRectangle);

export default StatesBarRectangle;