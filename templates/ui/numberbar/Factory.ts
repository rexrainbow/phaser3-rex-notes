import NumberBar from './NumberBar';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('numberBar', function(config?: any) {
    var gameObject = new NumberBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NumberBar', NumberBar);

export default NumberBar;