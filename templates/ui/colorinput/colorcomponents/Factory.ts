import ColorComponents from './ColorComponents';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../../plugins/utils/object/SetValue';

ObjectFactory.register('colorComponents', function(config?: any) {
    var gameObject = new ColorComponents(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ColorComponents', ColorComponents);

export default ColorComponents;