import Spinner from './Spinner';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('spinner', function(config?: any) {
    var gameObject = new Spinner(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Spinner.Spinner', Spinner);

export default Spinner;