import Line from './Line.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('line', function (points, lineWidth, color, alpha, lineType) {
    var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.Graph.Line', Line);

export default Line;