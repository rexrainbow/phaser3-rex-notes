import Video from './Video.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('video', function (x, y, width, height, config) {
    var video = new Video(this.scene, x, y, width, height, config);
    this.scene.sys.displayList.add(video);
    return video;
});

SetValue(window, 'RexPlugins.UI.Video', Video);

export default Video;