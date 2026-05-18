import ExpBar from './ExpBar';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('expBar', function(config?: any) {
    var gameObject = new ExpBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ExpBar', ExpBar);

export default ExpBar;