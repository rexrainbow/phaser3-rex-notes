import Orbit from './Orbit';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('orbit', function(config?: any) {
    var gameObject = new Orbit(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Orbit', Orbit);

export default Orbit;