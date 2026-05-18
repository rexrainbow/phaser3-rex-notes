import ControlPoints from './ControlPoints';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('controlPoints', function(config?: any) {
    var gameObject = new ControlPoints(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.ControlPoints', ControlPoints);

export default ControlPoints;