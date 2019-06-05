import VideoDOM from './gameobjects/video/videodom/VideoDOM.js';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexVideo', function (x, y, width, height, config) {
    var gameObject = new VideoDOM(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});
Phaser.GameObjects.GameObjectCreator.register('rexVideo', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new VideoDOM(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
});

Phaser.GameObjects.GameObjectFactory.register('rexVideoCanvas', function (x, y, width, height, config) {
    var gameObject = new VideoCanvas(this.scene, x, y, width, height, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});
Phaser.GameObjects.GameObjectCreator.register('rexVideoCanvas', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new VideoCanvas(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
});

export { VideoDOM, VideoCanvas };