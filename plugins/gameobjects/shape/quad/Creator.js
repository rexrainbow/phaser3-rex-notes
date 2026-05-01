import Quad from './Quad.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', width);
    var fillColor = GetAdvancedValue(config, 'fillColor', undefined);
    var fillAlpha = GetAdvancedValue(config, 'fillAlpha', undefined);
    var gameObject = new Quad(this.scene, 0, 0, width, height, fillColor, fillAlpha);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}