import LineProgressCanvas from './LineProgressCanvas';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('lineProgressCanvas', function(x?: any, y?: any, width?: any, height?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new LineProgressCanvas(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LineProgressCanvas', LineProgressCanvas);

export default LineProgressCanvas;