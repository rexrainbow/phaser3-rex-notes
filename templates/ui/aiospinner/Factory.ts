import AIOSpinner from './AIOSpinner';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('aioSpinner', function(config?: any) {
    var gameObject = new AIOSpinner(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.AIOSpinner', AIOSpinner);

export default AIOSpinner;