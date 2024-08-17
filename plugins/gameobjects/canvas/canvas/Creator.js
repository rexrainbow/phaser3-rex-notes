import Canvas from './Canvas.js';

const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', 256);
    var height = GetAdvancedValue(config, 'height', width);
    var resolution = GetAdvancedValue(config, 'resolution', 1);
    var gameObject = new Canvas(this.scene, 0, 0, width, height, resolution);
    BuildGameObject(this.scene, gameObject, config);
    var fillColor = GetAdvancedValue(config, 'fill', null);
    gameObject.fill(fillColor);
    return gameObject;
};