import CircularProgressCanvas from './CircularProgressCanvas';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('circularProgressCanvas', function(x?: any, y?: any, radius?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new CircularProgressCanvas(this.scene, x, y, radius, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircularProgressCanvas', CircularProgressCanvas);

export default CircularProgressCanvas;