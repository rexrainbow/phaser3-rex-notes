import CircularProgress from './CircularProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('circularProgress', function (x, y, radius, color, value, config) {
    var gameObject = new CircularProgress(this.scene, x, y, radius, color, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircularProgress', CircularProgress);

export default CircularProgress;