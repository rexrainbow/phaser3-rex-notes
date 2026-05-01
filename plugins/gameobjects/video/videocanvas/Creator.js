import VideoCanvas from './VideoCanvas.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }

    var width = GetAdvancedValue(config, 'width', undefined);
    var height = GetAdvancedValue(config, 'height', undefined);
    var gameObject = new VideoCanvas(this.scene, 0, 0, width, height, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
}