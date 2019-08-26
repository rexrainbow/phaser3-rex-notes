import YoutubePlayer from './YoutubePlayer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('youtubePlayer', function (x, y, width, height, config) {
    var gameObject = new YoutubePlayer(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.YoutubePlayer', YoutubePlayer);

export default YoutubePlayer;