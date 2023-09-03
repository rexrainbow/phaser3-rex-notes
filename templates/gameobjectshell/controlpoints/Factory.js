import ControlPoints from './ControlPoints.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('controlPoints', function (config) {
    var gameObject = new ControlPoints(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.ControlPoints', ControlPoints);

export default ControlPoints;