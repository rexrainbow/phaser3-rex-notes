import ExpBar from './ExpBar.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('expBar', function (config) {
    var gameObject = new ExpBar(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ExpBar', ExpBar);

export default ExpBar;