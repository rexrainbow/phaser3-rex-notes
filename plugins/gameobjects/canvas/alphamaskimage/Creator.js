import AlphaMaskImage from './AlphaMaskImage.js';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const GetAdvancedValue = PhaserUtils.Objects.GetAdvancedValue;
const BuildGameObject = PhaserGameObjects.BuildGameObject;

export default function (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }
    var key = GetAdvancedValue(config, 'key', undefined);
    var frame = GetAdvancedValue(config, 'frame', undefined);
    var gameObject = new AlphaMaskImage(this.scene, 0, 0, key, frame, config);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
};