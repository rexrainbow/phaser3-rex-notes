import CircularProgress from './CircularProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('circularProgress', function (config) {
    var gameObject = new CircularProgress(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.CircularProgress', CircularProgress);

export default CircularProgress;