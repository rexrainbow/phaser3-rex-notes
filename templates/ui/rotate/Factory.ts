import Rotate from './Rotate';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('rotate', function(config?: any) {
    return new Rotate(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Rotate', Rotate);

export default Rotate;