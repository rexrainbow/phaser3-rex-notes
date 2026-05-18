import Hearts from './Hearts';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('hearts', function(config?: any) {
    var gameObject = new Hearts(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Hearts', Hearts);

export default Hearts;