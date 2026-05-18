import RoundRectangleCanvas from './RoundRectangleCanvas';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('roundRectangleCanvas', function(x?: any, y?: any, width?: any, height?: any, radius?: any, fillStyle?: any, strokeStyle?: any, lineWidth?: any, fillColor2?: any, isHorizontalGradient?: any) {
    var gameObject = new RoundRectangleCanvas(this.scene, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.RoundRectangleCanvas', RoundRectangleCanvas);

export default RoundRectangleCanvas;