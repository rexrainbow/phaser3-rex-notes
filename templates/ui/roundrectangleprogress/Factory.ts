import RoundRectangleProgress from './RoundRectangleProgress';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('roundRectangleProgress', function(x?: any, y?: any, width?: any, height?: any, radiusConfig?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new RoundRectangleProgress(this.scene, x, y, width, height, radiusConfig, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.RoundRectangleProgress', RoundRectangleProgress);

export default RoundRectangleProgress;