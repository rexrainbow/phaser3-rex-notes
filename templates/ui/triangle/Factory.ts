import Triangle from './Triangle';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('triangle', function(x?: any, y?: any, width?: any, height?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new Triangle(this.scene, x, y, width, height, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Triangle', Triangle);

export default Triangle;