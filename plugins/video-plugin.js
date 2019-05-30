import Video from './gameobjects/video/Video.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class VideoPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexVideo', this.addVideo, this.makeVideo);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addVideo(x, y, width, height, config) {
        var video = new Video(this.scene, x, y, width, height, config);
        this.displayList.add(video);
        return video;
    }

    makeVideo(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var video = new Video(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, video, config);
        return video;
    }
}

SetValue(window, 'RexPlugins.GameObjects.Video', Video);

export default VideoPlugin;