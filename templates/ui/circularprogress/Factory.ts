import CircularProgress from './CircularProgress';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('circularProgress', function(x?: any, y?: any, radius?: any, barColor?: any, value?: any, config?: any) {
    var gameObject = new CircularProgress(this.scene, x, y, radius, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircularProgress', CircularProgress);

export default CircularProgress;