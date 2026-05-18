import Canvas from './Canvas';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('canvas', function(x?: any, y?: any, width?: any, height?: any) {
    var gameObject = new Canvas(this.scene, x, y, width, height);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Canvas', Canvas);

export default Canvas;