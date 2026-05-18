import ColorInputBase from './ColorInputBase';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../../plugins/utils/object/SetValue';

ObjectFactory.register('colorInputLite', function(config?: any) {
    var gameObject = new ColorInputBase(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorInputBase', ColorInputBase);

export default ColorInputBase;