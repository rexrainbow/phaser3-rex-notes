import Line from './Line.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('line', function (points, lineWidth, color, alpha, lineType) {
    return new Line(this.scene, points, lineWidth, color, alpha, lineType);
});

SetValue(window, 'RexPlugins.Graph.Line', Line);

export default Line;