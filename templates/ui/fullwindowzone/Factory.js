import FullWindowZone from './FullWindowZone.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fullWindowZone', function () {
    var gameObject = new FullWindowZone(this.scene);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.FullWindowZone', FullWindowZone);

export default FullWindowZone;