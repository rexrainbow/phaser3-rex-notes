import FullWindowZone from './FullWindowZone';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('fullWindowZone', function() {
    var gameObject = new FullWindowZone(this.scene);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FullWindowZone', FullWindowZone);

export default FullWindowZone;