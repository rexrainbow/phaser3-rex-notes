import RepeatImage from './RepeatImage.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var key = GetAdvancedValue(config, 'key', undefined);
    var frame = GetAdvancedValue(config, 'frame', undefined);
    var gameObject = new RepeatImage(this.scene, 0, 0, width, height, key, frame);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};