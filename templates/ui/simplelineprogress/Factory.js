import SimpleLineProgress from './SimpleLineProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleLineProgress', function (x, y, width, height, barColor, value, config) {
    var gameObject = new SimpleLineProgress(this.scene, x, y, width, height, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleLineProgress', SimpleLineProgress);

export default SimpleLineProgress;