import QuadShape from './QuadShape';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('quadShape', function(x?: any, y?: any, width?: any, height?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new QuadShape(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.QuadShape', QuadShape);

export default QuadShape;