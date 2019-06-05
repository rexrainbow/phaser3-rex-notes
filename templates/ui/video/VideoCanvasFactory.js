import VideoCanvas from './VideoCanvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('videoCanvas', function (x, y, width, height, config) {
    var gameObject = new VideoCanvas(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.VideoCanvas', VideoCanvas);

export default VideoCanvas;