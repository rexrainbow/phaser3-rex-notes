import Space from './Space.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('space', function (x, y) {
    var gameObject = new Space(this.scene, x, y);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Space', Space);

export default Space;