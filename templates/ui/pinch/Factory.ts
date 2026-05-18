import Pinch from './Pinch';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('pinch', function(config?: any) {
    return new Pinch(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Pinch', Pinch);

export default Pinch;