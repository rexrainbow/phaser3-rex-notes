import MouseWheelToUpDown from './MouseWheelToUpDown.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('mouseWheelToUpDown', function (config) {
    var mouseWheelToUpDown = new MouseWheelToUpDown(this.scene, config);
    // mouseWheelToUpDown is not a gameObject
    return mouseWheelToUpDown;
});

SetValue(window, 'RexPlugins.GameObjectShell.MouseWheelToUpDown', MouseWheelToUpDown);

export default MouseWheelToUpDown;