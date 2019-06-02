import VideoCanvas from './VideoCanvas.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('videoCanvas', function (x, y, width, height, config) {
    var video = new VideoCanvas(this.scene, x, y, width, height, config);
    this.scene.sys.displayList.add(video);
    return video;
});

SetValue(window, 'RexPlugins.UI.VideoCanvas', VideoCanvas);

export default VideoCanvas;