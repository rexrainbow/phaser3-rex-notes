import VideoCanvas from './VideoCanvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new VideoCanvas(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
}