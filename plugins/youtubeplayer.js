import YoutubePlayer from './gameobjects/youtubeplayer/YoutubePlayer.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexYoutubePlayer', function (x, y, width, height, config) {
    var youtubePlayer = new YoutubePlayer(this.scene, x, y, width, height, config);
    this.displayList.add(youtubePlayer);
    return youtubePlayer;
});
Phaser.GameObjects.GameObjectCreator.register('rexYoutubePlayer', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var youtubePlayer = new YoutubePlayer(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, youtubePlayer, config);
    return youtubePlayer;
});

export default YoutubePlayer;