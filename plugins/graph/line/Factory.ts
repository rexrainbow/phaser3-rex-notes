import Line from './Line';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('line', function(points?: any, lineWidth?: any, color?: any, alpha?: any, lineType?: any) {
    var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Graph.Line', Line);

export default Line;