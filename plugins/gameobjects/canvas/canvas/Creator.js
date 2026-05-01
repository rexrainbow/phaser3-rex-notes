import Canvas from './Canvas.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

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