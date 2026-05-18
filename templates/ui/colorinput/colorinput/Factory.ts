import ColorInput from './ColorInput';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../../plugins/utils/object/SetValue';

ObjectFactory.register('colorInput', function(config?: any) {
    var gameObject = new ColorInput(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorInput', ColorInput);

export default ColorInput;