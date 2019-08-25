import CircleMaskImage from './CircleMaskImage.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    var key = GetAdvancedValue(config, 'key', undefined);
    var frame = GetAdvancedValue(config, 'frame', undefined);

    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var gameObject = new CircleMaskImage(this.scene, 0, 0, key, frame, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};