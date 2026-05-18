import CustomShapes from './CustomShapes';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('customShapes', function(x?: any, y?: any, width?: any, height?: any, config?: any) {
    var gameObject = new CustomShapes(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CustomShapes', CustomShapes);

export default CustomShapes;