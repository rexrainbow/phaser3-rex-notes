import VideoDOM from './gameobjects/video/videodom/VideoDOM.js';
import VideoCanvas from './gameobjects/video/videocanvas/VideoCanvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

Phaser.GameObjects.GameObjectFactory.register('rexVideo', function (x, y, width, height, config) {
    var video = new VideoDOM(this.scene, x, y, width, height, config);
    this.displayList.add(video);
    return video;
});
Phaser.GameObjects.GameObjectCreator.register('rexVideo', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var video = new VideoDOM(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, video, config);
    return video;
});

Phaser.GameObjects.GameObjectFactory.register('rexVideoCanvas', function (x, y, width, height, config) {
    var video = new VideoCanvas(this.scene, x, y, width, height, config);
    this.displayList.add(video);
    return video;
});
Phaser.GameObjects.GameObjectCreator.register('rexVideoCanvas', function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var video = new VideoCanvas(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, video, config);
    return video;
});

export { VideoDOM, VideoCanvas };