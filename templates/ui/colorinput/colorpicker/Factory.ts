import ColorPicker from './ColorPicker';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../../plugins/utils/object/SetValue';

ObjectFactory.register('colorPicker', function(config?: any) {
    var gameObject = new ColorPicker(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorPicker', ColorPicker);

export default ColorPicker;