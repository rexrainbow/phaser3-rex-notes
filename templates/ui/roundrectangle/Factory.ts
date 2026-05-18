import RoundRectangle from './RoundRectangle';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('roundRectangle', function(x?: any, y?: any, width?: any, height?: any, radiusConfig?: any, fillColor?: any, fillAlpha?: any) {
    var gameObject = new RoundRectangle(this.scene, x, y, width, height, radiusConfig, fillColor, fillAlpha);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.RoundRectangle', RoundRectangle);

export default RoundRectangle;