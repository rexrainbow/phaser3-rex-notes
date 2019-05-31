import YoutubePlayer from './gameobjects/youtubeplayer/YoutubePlayer.js';
import SetValue from './utils/object/SetValue.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

class YoutubePlayerPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexYoutubePlayer', this.addYoutubePlayer, this.makeYoutubePlayer);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    addYoutubePlayer(x, y, width, height, config) {
        var youtubePlayer = new YoutubePlayer(this.scene, x, y, width, height, config);
        this.displayList.add(youtubePlayer);
        return youtubePlayer;
    }

    makeYoutubePlayer(config, addToScene) {
        var width = GetAdvancedValue(config, 'width', 256);
        var height = GetAdvancedValue(config, 'height', width);
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var youtubePlayer = new YoutubePlayer(this.scene, 0, 0, width, height, config);
        BuildGameObject(this.scene, youtubePlayer, config);
        return youtubePlayer;
    }
}

SetValue(window, 'RexPlugins.GameObjects.YoutubePlayer', YoutubePlayer);

export default YoutubePlayerPlugin;