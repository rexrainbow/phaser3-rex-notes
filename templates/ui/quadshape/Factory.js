import QuadShape from './QuadShape.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('QuadShape', function (x, y, width, height, fillColor, fillAlpha) {
    var gameObject = new QuadShape(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.QuadShape', QuadShape);

export default QuadShape;