import DynamicCanvasText from './DynamicCanvasText.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', 1);
    var height = GetAdvancedValue(config, 'height', 1);
    var gameObject = new DynamicCanvasText(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};