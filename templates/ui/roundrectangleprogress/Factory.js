import RoundRectangleProgress from './RoundRectangleProgress.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('roundRectanleProgress', function (x, y, width, height, radiusConfig, barColor, value, config) {
    var gameObject = new RoundRectangleProgress(this.scene, x, y, width, height, radiusConfig, barColor, value, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.RoundRectangleProgress', RoundRectangleProgress);

export default RoundRectangleProgress;