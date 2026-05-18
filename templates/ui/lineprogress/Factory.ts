import LineProgress from './LineProgress';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('lineProgress', function(x?: any, y?: any, width?: any, height?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new LineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.LineProgress', LineProgress);

export default LineProgress;