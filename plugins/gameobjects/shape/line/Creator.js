import Line from './Line.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const GetValue = PhaserUtils.Objects.GetValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var points = GetValue(config, 'points', undefined);
    var lineWidth = GetAdvancedValue(config, 'lineWidth', 2);
    var color = GetAdvancedValue(config, 'color', 0xffffff);
    var alpha = GetAdvancedValue(config, 'alpha', 1);
    var lineType = GetAdvancedValue(config, 'lineType', 0);
    var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);

    BuildGameObject(this.scene, gameObject, config);

    return gameObject;
}