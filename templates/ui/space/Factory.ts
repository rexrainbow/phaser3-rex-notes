import Space from './Space';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('space', function() {
    var gameObject = new Space(this.scene);
    // Don't add Zone into scene
    // this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Space', Space);

export default Space;