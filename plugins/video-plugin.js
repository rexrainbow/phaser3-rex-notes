import VideoDOM from './gameobjects/video/videodom/VideoDOM.js';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class VideoPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexVideo', this.addVideo, this.makeVideo);
        pluginManager.registerGameObject('rexVideoCanvas', this.addVideoCanvas, this.makeVideoCanvas);        
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addVideo(x, y, width, height, config) {
        var gameObject = new VideoDOM(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    makeVideo(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new VideoDOM(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }
    
    addVideoCanvas(x, y, width, height, config) {
        var gameObject = new VideoCanvas(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    makeVideoCanvas(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new VideoCanvas(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }
}

SetValue(window, 'RexPlugins.GameObjects.Video', VideoDOM);
SetValue(window, 'RexPlugins.GameObjects.VideoCanvas', VideoCanvas);

export default VideoPlugin;